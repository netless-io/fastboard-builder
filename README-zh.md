# Fastboard Build

这是一个用于构建 `@netless/fastboard-full` 的简单工具，可以将其打包成可直接分发到浏览器环境的 JavaScript 文件。

## 功能特点

- 支持将 `@netless/fastboard-full` 打包成多种 JavaScript 格式
- 同时生成现代浏览器 IIFE 和 ES5 IIFE 产物
- 自动处理依赖关系

## 安装

```bash
pnpm install
```

## 使用方法

1. 安装依赖：
```bash
pnpm install
```

2. 运行构建命令：
```bash
pnpm build
```

构建完成后，你可以在 `dist` 目录下找到生成的 JavaScript 文件。

如果你只关心旧版浏览器兼容的 ES5 IIFE 产物，也可以运行：

```bash
bash es5iife.sh
```

这个脚本现在会复用标准构建流程，同样会生成 `dist/index.global.es5.js`。

## 构建输出

构建过程会生成以下文件：
- `dist/index.js` - cjs 格式的 JavaScript 文件
- `dist/index.mjs` - esm 格式的 JavaScript 文件
- `dist/index.global.js` - 面向现代浏览器的压缩版 iife 文件
- `dist/index.global.es5.js` - 面向 Android 4.4 WebView、iOS 9 和其他低版本浏览器的压缩版 ES5 iife 文件

## 示例代码

项目提供了示例代码，展示了如何使用构建后的文件。你可以在 `example` 目录下找到示例文件。

### 基础用法

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fastboard Example</title>
  </head>
  <body>
    <div id="fastboard" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
    <script src="../dist/index.global.js"></script>
    <script>
      // 创建白板实例
      NetlessFastboard.createFastboard({
        sdkConfig: {
          appIdentifier: "你的应用标识",
          region: "cn-hz",
        },
        joinRoom: {
          uid: "用户ID",
          uuid: "房间UUID",
          roomToken: "房间Token",
        },
        managerConfig: {
          cursor: true,
        },
      }).then((fastboard) => {
        // 创建UI界面
        const container = document.getElementById('fastboard');
        const ui = NetlessFastboard.createUI(fastboard, container);
        
        // 挂载UI
        ui.mount(container, {
          config: {
            toolbar: {
              items: ["clicker", "selector", "pencil", "text", "shapes", "eraser", "clear", "laserPointer"],
              collapsed: true,
            },
          },
        });
      });
    </script>
  </body>
</html>
```

如果目标环境是 Android 4.4 WebView、iOS 9 或其他低版本浏览器，请将：

```html
<script src="../dist/index.global.js"></script>
```

替换为：

```html
<script src="../dist/index.global.es5.js"></script>
```

### 运行示例

1. 确保已经完成构建
2. 使用本地服务器打开 `example/index.html` 文件
3. 替换示例代码中的以下参数：
   - `appIdentifier`: 你的应用标识
   - `uid`: 用户ID
   - `uuid`: 房间UUID
   - `roomToken`: 房间Token

## 添加其他 netless app

### 添加依赖
以app-slide为例，添加依赖：
```bash
pnpm add @netless/app-slide
```
### 注册到fastboard
```js
  import { register } from '@netless/fastboard-full';
  import SlideApp, { addHooks } from "@netless/app-slide";

  // 按需求集成 SlideApp
  register({
      kind: "Slide",
      appOptions: { debug: false },
      src: SlideApp,
      addHooks,
  });

```
### 在客户项目添加slide app到fastboard apps列表中

```js
  // 添加一个slide app 到 apps中
  NetlessFastboard.apps.push({
      icon: "https://api.iconify.design/mdi:file-powerpoint-box.svg?color=%237f7f7f",
      kind: "Slide",
      label: "Slide",
      onClick: (app) => {
          app.insertDocs({
              fileType: "pptx",
              scenePath: `/pptx/${taskId}`,
              taskId,
              title: "a.pptx",
              url,
          });
      },
  });
```


## 依赖说明

- `@netless/fastboard-full`: 当前 builder 使用的全打包 Fastboard 入口
- `esbuild`: 用于快速构建
- `@swc/core`: 用于将浏览器全局 bundle 降级到 ES5


## 注意事项

- 确保你的 Node.js 版本兼容项目依赖
- 构建过程可能需要一些时间，请耐心等待
- 如果遇到构建错误，请检查 Node.js 版本和依赖安装是否完整
- 使用示例代码时，请确保替换了正确的应用标识和房间信息

## License

MIT
