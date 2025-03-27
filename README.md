# Fastboard Build

这是一个用于构建 `@netless/fastboard` 的简单工具，可以将 `@netless/fastboard` 打包成可直接使用的 JavaScript 文件。

## 功能特点

- 支持将 `@netless/fastboard` 打包成 相应的类型的 js 文件
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

## 构建输出

构建过程会生成以下文件：
- `dist/index.js` - cjs 格式的 JavaScript 文件
- `dist/index.mjs` - esm 格式的 JavaScript 文件
- `dist/index.global.js` - iife 格式的 JavaScript 文件

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

### 运行示例

1. 确保已经完成构建
2. 使用本地服务器打开 `example/index.html` 文件
3. 替换示例代码中的以下参数：
   - `appIdentifier`: 你的应用标识
   - `uid`: 用户ID
   - `uuid`: 房间UUID
   - `roomToken`: 房间Token

## 依赖说明

- `@netless/fastboard`: 具体相应API调用参考 [`@netless/fastboard`](https://github.com/netless-io/fastboard/blob/main/README-zh.md)
- `esbuild`: 用于快速构建
- `@babel/cli`: 用于 ES5 转换
- `rollup`: 用于打包


## 注意事项

- 确保你的 Node.js 版本兼容项目依赖
- 构建过程可能需要一些时间，请耐心等待
- 如果遇到构建错误，请检查 Node.js 版本和依赖安装是否完整
- 使用示例代码时，请确保替换了正确的应用标识和房间信息

## License

MIT