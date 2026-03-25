---
title: Markdown 语法
published: 2026-03-25T12:00:00
description: '本项目支持的常用 Markdown 语法'
image: ''
tags: [Markdown, 语法]
category: 'note'
draft: false
pinned: false
lang: ''
---

这是一篇给本项目使用的手写语法速查模板。复制下面的示例即可。

## Markdown 基础语法

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>

### 强调

```markdown
这是**加粗**，这是*斜体*，这是~~删除线~~。
```

这是**加粗**，这是*斜体*，这是~~删除线~~。

### 列表

```markdown
- 无序项 A
- 无序项 B

1. 有序项 1
2. 有序项 2
```

- 无序项 A
- 无序项 B

1. 有序项 1
2. 有序项 2

### 引用

```markdown
> 这是一段普通引用。
```

> 这是一段普通引用。

### 分隔线

```markdown
---
```

---

### 链接与图片

```markdown
[项目主页](https://github.com/suichyan/fuwari)

![示例图片](../../assets/images/banner-nacho.png)
```

[项目主页](https://github.com/suichyan/fuwari)

![示例图片](../../assets/images/banner-nacho.png)

## 代码与结构

### 行内代码

```markdown
使用 `pnpm dev` 启动开发服务器。
```

使用 `pnpm dev` 启动开发服务器。

### 围栏代码

````markdown
```bash
pnpm install
pnpm dev
```

```nix
{ config, pkgs, ... }:
{
	services.openssh.enable = true;
}
```
````

```bash
pnpm install
pnpm dev
```

```nix
{ config, pkgs, ... }:
{
	services.openssh.enable = true;
}
```

### 代码块标题

````markdown
```ts title="src/utils/math.ts"
export function add(a: number, b: number) {
	return a + b;
}
```
````

```ts title="src/utils/math.ts"
export function add(a: number, b: number) {
	return a + b;
}
```

### 代码块单行高亮

````markdown
```ts {2}
export function add(a: number, b: number) {
	return a + b;
}
```
````

```ts {2}
export function add(a: number, b: number) {
	return a + b;
}
```

### 代码块单行加减标记

````markdown
```ts del={2} ins={3}
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```
````

```ts del={2} ins={3}
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```

### 代码块多行与区间高亮

````markdown
```ts {1,3-4}
const a = 1;
const b = 2;
const c = a + b;
console.log(c);
```
````

```ts {1,3-4}
const a = 1;
const b = 2;
const c = a + b;
console.log(c);
```

### 代码块行内文本高亮

````markdown
```ts "newValue"
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```
````

```ts "newValue"
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```

### 代码块行内文本加减标记

````markdown
```ts ins="newValue" del="oldValue"
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```
````

```ts ins="newValue" del="oldValue"
const oldValue = 1;
const newValue = 2;
console.log(newValue);
```

### 代码块行号控制

````markdown
```ts showLineNumbers startLineNumber=20
const a = 1;
const b = 2;
console.log(a + b);
```

```ts showLineNumbers=false
const hideLineNumber = true;
console.log(hideLineNumber);
```
````

```ts showLineNumbers startLineNumber=20
const a = 1;
const b = 2;
console.log(a + b);
```

```ts showLineNumbers=false
const hideLineNumber = true;
console.log(hideLineNumber);
```

### 代码块折叠区段

````markdown
```ts collapse={1-3} collapseStyle="collapsible-start"
import { readFileSync } from "node:fs";
import { join } from "node:path";
const fileContent = readFileSync(join(process.cwd(), "README.md"), "utf-8");

console.log(fileContent.length);
```
````

```ts collapse={1-3} collapseStyle="collapsible-start"
import { readFileSync } from "node:fs";
import { join } from "node:path";
const fileContent = readFileSync(join(process.cwd(), "README.md"), "utf-8");

console.log(fileContent.length);
```

### 代码块框架样式覆盖

````markdown
```bash frame="none"
pnpm build
```
````

```bash frame="none"
pnpm build
```

### 代码块文件名注释标题（自动提取）

````markdown title="Markdown"
```ts
// src/lib/calc.ts
export const sum = (a: number, b: number) => a + b;
```
````

```ts
// src/lib/calc.ts
export const sum = (a: number, b: number) => a + b;
```

### 终端代码块标题

````markdown
```powershell title="终端标题示例"
Write-Output "这个终端窗口带标题"
```
````

```powershell title="终端标题示例"
Write-Output "这个终端窗口带标题"
```

### ANSI 转义序列渲染

支持通过 ANSI 转义序列在代码块中渲染彩色文本与格式。将其语言设置为 `ansi` 即可。

#### 基础颜色

支持展示标准的 ANSI 8 色及其加粗、变暗变体：

````markdown
```ansi
ANSI 基础颜色:
- 正常: [31m红色[0m [32m绿色[0m [33m黄色[0m [34m蓝色[0m [35m洋红[0m [36m青色[0m
- 加粗: [1;31m红色[0m [1;32m绿色[0m [1;33m黄色[0m [1;34m蓝色[0m [1;35m洋红[0m [1;36m青色[0m
- 变暗: [2;31m红色[0m [2;32m绿色[0m [2;33m黄色[0m [2;34m蓝色[0m [2;35m洋红[0m [2;36m青色[0m
```
````

```ansi
ANSI 基础颜色:
- 正常: [31m红色[0m [32m绿色[0m [33m黄色[0m [34m蓝色[0m [35m洋红[0m [36m青色[0m
- 加粗: [1;31m红色[0m [1;32m绿色[0m [1;33m黄色[0m [1;34m蓝色[0m [1;35m洋红[0m [1;36m青色[0m
- 变暗: [2;31m红色[0m [2;32m绿色[0m [2;33m黄色[0m [2;34m蓝色[0m [2;35m洋红[0m [2;36m青色[0m
```

#### 256 色调色盘

可以使用 256 色模式渲染，这里以 160 到 177 取值为例：

````markdown
```ansi
256 色 (展示 160-177):
[38;5;160m160[0m [38;5;161m161[0m [38;5;162m162[0m [38;5;163m163[0m [38;5;164m164[0m [38;5;165m165[0m
[38;5;166m166[0m [38;5;167m167[0m [38;5;168m168[0m [38;5;169m169[0m [38;5;170m170[0m [38;5;171m171[0m
[38;5;172m172[0m [38;5;173m173[0m [38;5;174m174[0m [38;5;175m175[0m [38;5;176m176[0m [38;5;177m177[0m
```
````

```ansi
256 色 (展示 160-177):
[38;5;160m160[0m [38;5;161m161[0m [38;5;162m162[0m [38;5;163m163[0m [38;5;164m164[0m [38;5;165m165[0m
[38;5;166m166[0m [38;5;167m167[0m [38;5;168m168[0m [38;5;169m169[0m [38;5;170m170[0m [38;5;171m171[0m
[38;5;172m172[0m [38;5;173m173[0m [38;5;174m174[0m [38;5;175m175[0m [38;5;176m176[0m [38;5;177m177[0m
```

#### 全真 RGB 颜色与文本格式化

支持按照自定义 RGB 值渲染，以及设置文本格式，例如斜体、下划线：

````markdown
```ansi
全真 RGB 颜色:
[38;2;34;139;34m森林绿 - RGB(34, 139, 34)[0m

文本格式化: [1m加粗[0m [2m变暗[0m [3m斜体[0m [4m下划线[0m
```
````

```ansi
全真 RGB 颜色:
[38;2;34;139;34m森林绿 - RGB(34, 139, 34)[0m

文本格式化: [1m加粗[0m [2m变暗[0m [3m斜体[0m [4m下划线[0m
```

### diff 风格加减写法

````markdown
```diff
+ 这行会被标记为新增
- 这行会被标记为删除
	这是一行普通内容
```
````

```diff
+ 这行会被标记为新增
- 这行会被标记为删除
	这是一行普通内容
```

### diff 写法结合语法高亮

````markdown
```diff lang="js"
 function thisIsJavaScript() {
	 // 保持 JS 高亮，同时支持差异标记
-  console.log('旧代码将被移除')
+  console.log('新代码已添加')
 }
```
````

```diff lang="js"
 function thisIsJavaScript() {
	 // 保持 JS 高亮，同时支持差异标记
-  console.log('旧代码将被移除')
+  console.log('新代码已添加')
 }
```

### 行标记标签

````markdown
```ts {"A":2} del={"B":3} ins={"C":4}
const keep = true;
const removeMe = false;
const addMe = true;
```
````

```ts {"A":2} del={"B":3} ins={"C":4}
const keep = true;
const removeMe = false;
const addMe = true;
```

### 行内文本正则标记

````markdown
```ts /已[启停]用/
console.log('关键词“已启用”和“已停止”会被标记。');
```
````

```ts /已[启停]用/
console.log('关键词“已启用”和“已停用”会被标记。');
```

### 正则中转义斜杠

````markdown
```sh /\/home\//
echo "测试" > /home/test.txt
```
````

```sh /\/home\//
echo "测试" > /home/test.txt
```

### 按代码块控制自动换行

````markdown
```ts wrap=false
function 获取超长文本() {
	return '这是一段很长很长的文本，在容器宽度不足时更容易观察到自动换行的差异效果';
}
```
````

```ts wrap=false
function 获取超长文本() {
	return '这是一段很长很长的文本，在容器宽度不足时更容易观察到自动换行的差异效果';
}
```

### 控制换行后缩进对齐

````markdown
```ts preserveIndent=false
function 获取超长文本() {
	return '这是一段很长很长的文本，在容器宽度不足时更容易观察到自动换行的差异效果';
}
```
````

```ts preserveIndent=false
function 获取超长文本() {
	return '这是一段很长很长的文本，在容器宽度不足时更容易观察到自动换行的差异效果';
}
```

### 表格

```markdown
| 命令       | 说明           |
| ---------- | -------------- |
| pnpm dev   | 启动开发服务器 |
| pnpm build | 构建生产版本   |
```

| 命令       | 说明           |
| ---------- | -------------- |
| pnpm dev   | 启动开发服务器 |
| pnpm build | 构建生产版本   |

### 任务列表

```markdown
- [x] 已完成项
- [ ] 待办项
```

- [x] 已完成项
- [ ] 待办项

### HTML 写法（Markdown 中可直接使用）

```markdown
<details>
	<summary>点击展开</summary>
	这里是折叠内容。
</details>
```

<details>
	<summary>点击展开</summary>
	这里是折叠内容。
</details>

## Markdown 进阶（通用扩展）

### 数学公式（KaTeX）

### 行内公式

```markdown
勾股定理：$a^2 + b^2 = c^2$。
```

勾股定理：$a^2 + b^2 = c^2$。

### 块级公式

```markdown
$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

## Markdown 扩展功能

### GitHub 仓库卡片

可以通过 `::github{repo="<owner>/<repo>"}` 在文章中插入动态 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

::github{repo="saicaca/fuwari"}

### 提示块

支持的类型：`note`、`tip`、`important`、`warning`、`caution`。

#### 基础写法

```markdown
:::note
即使快速浏览，也建议留意这条信息。
:::

:::tip
这是可选建议，能帮助你更顺利完成操作。
:::

:::important
这是关键说明，通常和正确使用方式有关。
:::

:::warning
这是风险提示，请优先确认后再执行。
:::

:::caution
该操作可能带来负面后果，请谨慎处理。
:::
```

:::note
即使快速浏览，也建议留意这条信息。
:::

:::tip
这是可选建议，能帮助你更顺利完成操作。
:::

:::important
这是关键说明，通常和正确使用方式有关。
:::

:::warning
这是风险提示，请优先确认后再执行。
:::

:::caution
该操作可能带来负面后果，请谨慎处理。
:::

#### 自定义标题

```markdown
:::note[自定义标题]
这是一条带自定义标题的提示块。
:::
```

:::note[自定义标题]
这是一条带自定义标题的提示块。
:::

#### GitHub 风格写法

```markdown
> [!NOTE]
> 也支持 GitHub 风格的提示写法。

> [!TIP]
> 也支持 GitHub 风格的提示写法。
```

> [!NOTE]
> 也支持 GitHub 风格的提示写法。

> [!TIP]
> 也支持 GitHub 风格的提示写法。

## 指令语法扩展（remark-directive）

### 行内指令

```markdown
水的化学式是 H:sub[2]O，平方写作 x:sup[2]。
```

水的化学式是 H:sub[2]O，平方写作 x:sup[2]。
