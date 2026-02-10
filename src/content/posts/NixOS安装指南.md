---
title: NixOS安装指南
published: 2026-02-06T23:33:00
description: '折腾完arch就想来玩玩nixos，简直是梦中情os'
image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NJ1kWalHS7V0FP_hudH64w.jpeg'
tags: [NixOS, Linux]
category: 'Linux相关'
draft: false
pinned: false
lang: ''
---

## Windows安装前准备
---

### 调整时间设置

> Linux把主板时间改成标准UTC时间，然后根据系统设置的时区对UTC时间进行加减后显示出来。Windows直接读取主板时间显示出来，所以此时你Windows显示的时间就变成了UTC时间，表面上看就像是windows时间错乱了。

PowerShell **管理员**权限运行：

```sh
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

## 进入Live CD
---

默认无密码自动登录，使用命令切换到root用户：

```sh
sudo -i
```

### 连接网络

安装过程**几乎肯定**需要有效的网络连接。 无网络的安装是可行的, 但是可用的软件包集合是受限的。 

#### 有线网络

使用网线连接电脑，亦或是使用USB共享网络  
使用命令确认网络连接：

```sh
ip a #查看网络连接信息
ping bilibili.com -c 4 # 确认网络正常
ping 119.29.29.29 -c 4  # 腾讯 DNSPod，不通请检查网络连接
```

#### WiFi连接

NixOS 默认使用`wpa_supplicant`作为无线守护程序。  
使用命令进入：

```sh
sudo systemctl start wpa_supplicant  # 启动服务
sudo wpa_cli  # 进入 wpa 命令行交互模式
```

接着进入交互模式：

```sh
> add_network
0
> set_network 0 ssid "你家 WIFI 的 SSID"
OK
> set_network 0 psk "WIFI 密码"
OK
> set_network 0 key_mgmt WPA-PSK
OK
> enable_network 0
OK
```

如果你成功连接，执行完如上的命令后你将得到类似下面的一条message：

```sh
<3>CTRL-EVENT-CONNECTED - Connection to 32:85:ab:ef:24:5c completed [id=0 id_str=]
```

这个时候你就可以通过`quit`命令来退出`wpa_cli`。  
再次检测网络连接：

```sh
ip a #查看网络连接信息
ping bilibili.com -c 4 # 确认网络正常
ping 119.29.29.29 -c 4  # 腾讯 DNSPod，不通请检查网络连接
```

### 更换频道

>由于flake使用git仓库url作为inputs，无法使用channel镜像，所以在国内环境安装时先不使用flake，以免代理麻烦。

> ⚠️**警告：** 在订阅系统版本时请指定系统版本，一般指定当前的最新稳定版。

```sh
nix-channel --add https://mirrors.ustc.edu.cn/nix-channels/nixos-25.11 nixos
nix-channel --update  # 更新并解包频道
```

### 分区与格式化

NixOS 安装程序附带多种分区工具。  
以下示例使用`cfdisk`，但也提供`fdisk`、`gdisk`、`parted`和`cgdisk`。

首先，我们使用`lsblk`命令查看分区情况：

```sh
lsblk -pf  #查看当前分区情况
fdisk -l /dev/想要查询详细情况的硬盘  #小写字母l，查看详细分区信息
cfdisk /dev/nvme0n1 #选择自己要使用的硬盘进行分区
```

#### 格式化分区

1. 再次查看分区情况

```sh
lsblk -pf #查看分区情况
fdisk -l /dev/想要查询详细情况的硬盘  #小写字母l，查看详细分区信息
```

2. 格式化efi分区

```sh
mkfs.fat -F 32 /dev/nvme0n1p1（EFI分区名）
```

3. 格式化btrfs根分区

```sh
mkfs.btrfs /dev/nvme0n1p2（根分区名）
#加上-f参数可以强制格式化
```

#### 创建btrfs子卷

**子卷**是btrfs的一个特性，跟快照有关。通常至少要创建root子卷（存放系统文件）和home子卷（存放用户文件），根据命名规范取名为@和@home。由于这两者是平级关系，所以创建@快照时不会包含@home。这样就可以只恢复系统文件，不影响用户数据。

- 挂载

```sh
mount -t btrfs /dev/nvme0n1p2（根分区名） /mnt
```

- 创建子卷

```sh
btrfs subvolume create /mnt/@root
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@nix
```

- 可选：确认

```sh
btrfs subvolume list -p /mnt
```

- 取消挂载，因为我们要重新挂载子卷：

```sh
umount /mnt
```

#### 正式挂载

1. 挂载root子卷

```sh
mount -o subvol=@root,compress-force=zstd /dev/nvme0n1p2 /mnt
```

> 使用 compress-force 而不是 compress，是因为前者会让 Zstd 算法自己判断是否可压缩，这比内核自带的快速启发式检查（compress）压缩率更高。如果您的磁盘空间非常有限，可以指定一个更高的压缩等级，例如 compress-force=zstd:7。Zstd 可选的等级范围是 -15 (快) 到 15 (慢，高压缩率)，默认是 3。

2. 挂载home子卷

```sh
mount --mkdir -o subvol=@home,compress-force=zstd /dev/nvme0n1p2 /mnt/home
```

3. 挂载nix子卷

```sh
mount --mkdir -o subvol=@nix,noatime,compress-force=zstd /dev/nvme0n1p2 /mnt/nix
```

4. 挂载efi分区（ESP）

```sh
mount --mkdir /dev/nvme0n1p1 /mnt/efi
```

5. 复查挂载情况

```sh
df -h
```

### 编辑系统配置

使用以下命令生成基础配置：

```sh
nixos-generate-config --root /mnt
```

为添加用户做准备
```sh
mkpasswd -m sha-512
```

然后编辑配置：
```sh
nano /mnt/etc/nixos/configuration.nix
```

```nix
{ config, lib, pkgs, ...}:
{
    imports = [ ./hardware-configuration.nix ];
    boot.loader = {
        grub = {
            enable = true; #启用GRUB
            default = "saved";
            device = "nodev"; # `nodev`表示将生成一个 GRUB 引导菜单，但不会实际安装 GRUB。
            efiSupport = true; #启用EFI支持
            useOSProber = true; # 使用OSprober搜索其他系统
            extraConfig = ''
                GRUB_SAVEDEFAULT=true
            '';
        };
        efi = {
            canTouchEfiVariables = true;
            efiSysMountPoint = "/efi";
        };
    };
    networking = {
        hostName = "NixOS";
        networkmanager.enable = true;
    };

    time.timeZone = "Asia/Shanghai";
    i18n.defaultLocale = "en_US.UTF-8";

    # ==== Display Manager ====
    services.greetd.enable = true;
    services.greetd.settings = {
        default_session = {
            command = "${pkgs.greetd.tuigreet}/bin/tuigreet --cmd niri";
            user = "greeter";
        };
    };

    # ==== Window Manager ====
    programs.niri.enable = true;

    # ==== Audio ====
    services.pipewire = {
        enable = true;
        alsa.enable = true;
        alsa.support32Bit = true;  # 需要 32 位音频支持可保留
        pulse.enable = true;       # 兼容 PulseAudio
        jack.enable = true;        # 需要 JACK 可保留，不需要可删
    };

    # ==== User ====
    users.mutableUsers = false; # 让用户完全由配置控制
    users.users.sui = {
        isNormalUser = true;
        hashedPassword = "$6$F1JgV....$kK1R3z....";
        extraGroups = [ "wheel" "networkmanager" ];
    };

    environment.systemPackages = with pkgs; [
        neovim
    ];

    nix.settings.substituters = [ "https://mirrors.ustc.edu.cn/nix-channels/store" ];
    system.stateVersion = "25.11";  # 不要改动
}
```

对于`hardware-configuration.nix`不需要太多改动。

1. 先获取分区`uuid`

```sh
blkid
```

2. 填入各子卷的挂载参数以及uuid修改/boot为/efi

```sh
# 省略其余配置
fileSystem = {
            "/" = {
                device = "...";
                fsType = "btrfs";
                options = [ "subvol=@root" "compress-force=zstd" ];
            };
            "/home" = {
                device = "...";
                fsType = "btrfs";
                options = [ "subvol=@home" "compress-force=zstd" ];
            };
            "/nix" = {
                device = "...";
                fsType = "btrfs";
                options = [ "subvol=@nix" "noatime" "compress-force=zstd" ];
            };
            "/efi" = {
                device = "...";
                fsType = "vfat";
            };
        };
    };
# 省略其余配置
```

### 部署系统

```sh
sudo nixos-install --option substituters https://mirrors.ustc.edu.cn/nix-channels/store
```

最后只要重启电脑，祈求它能正常进入系统