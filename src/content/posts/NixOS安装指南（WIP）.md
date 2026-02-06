---
title: NixOS安装指南（WIP）
published: 2026-02-06T23:33:00
description: ''
image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NJ1kWalHS7V0FP_hudH64w.jpeg'
tags: [NixOS]
category: ''
draft: false
pinned: false
lang: ''
---
# 双系统安装
---
## Windows安装前准备
---
### 调整时间设置
Linux把主板时间改成标准UTC时间，然后根据系统设置的时区对UTC时间进行加减后显示出来。Windows直接读取主板时间显示出来，所以此时你Windows显示的时间就变成了UTC时间，表面上看就像是windows时间错乱了。

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
使用网线连接电脑，或是使用USB共享网络
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
添加最新的国内镜像，关于[nix channel](https://nixos.wiki/wiki/Nix_channels)，由于我们没有使用flake，channel将决定安装的系统的软件包版本。

以下命令添加`nixos-unstable`作为安装使用的默认channel，如果需要使用稳定版，可替换以下`nixos-unstable`为 `nixos-25.11`
> :warning: **警告：**
> 在订阅系统版本时请指定系统版本，一般指定当前的最新稳定版。
```sh
nix-channel --add https://mirrors.ustc.edu.cn/nix-channels/nixos-unstable nixos
nix-channel --update  # 更新并解包频道
```
### 分区与格式化
NixOS 安装程序附带多种分区工具。以下示例使用`cfdisk`，但也提供`fdisk`、`gdisk`、`parted`和`cgdisk`。

首先，我们使用`lsblk`命令查看一手分区情况：
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
子卷是btrfs的一个特性，跟快照有关。通常至少要创建root子卷（存放系统文件）和home子卷（存放用户文件），根据命名规范取名为@和@home。由于这两者是平级关系，所以创建@快照时不会包含@home。这样就可以只恢复系统文件，不影响用户数据。
- 挂载
```sh
mount -t btrfs /dev/nvme0n1p2（根分区名） /mnt
```
- 创建子卷
```sh
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@swap #不需要休眠到硬盘功能的话跳过这个
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
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvme0n1p2 /mnt

-o 指定额外的挂载参数
compress=zstd 指定透明压缩，zstd是压缩算法
```
2. 挂载home子卷
```sh
mount --mkdir -t btrfs -o subvol=/@home,compress=zstd /dev/nvme0n1p2 /mnt/home
```
3. 可选：挂载swap子卷（不需要休眠功能的话跳过这一步）
```sh
mount --mkdir -t btrfs -o subvol=/@swap,compress=zstd /dev/nvme0n1p2 /mnt/swap
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
            enable = true;
            device = "nodev"; # `nodev`表示将生成一个 GRUB 引导菜单，但不会实际安装 GRUB。
            efiSupport = true;
            useOSProber = true;
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

    environment.systemPackages = with pkgs; [
        neovim
    ];

    nix.settings.substituters = [ "https://mirror.sjtu.edu.cn/nix-channels/store" ];
    system.stateVersion = "25.11";  # 不要改动
}
```