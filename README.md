# Fastboard Build

This is a simple tool for building `@netless/fastboard`, which can package `@netless/fastboard` into ready-to-use JavaScript files.

## Features

- Supports packaging `@netless/fastboard` into corresponding types of JS files
- Automatically handles dependencies

## Installation

```bash
pnpm install
```

## Usage

1. Install dependencies:
```bash
pnpm install
```

2. Run the build command:
```bash
pnpm build
```

After the build is complete, you can find the generated JavaScript files in the `dist` directory.

## Build Output

The build process will generate the following files:
- `dist/index.js` - JavaScript file in CJS format
- `dist/index.mjs` - JavaScript file in ESM format
- `dist/index.global.js` - JavaScript file in IIFE format

## Example Code

The project provides example code demonstrating how to use the built files. You can find example files in the `example` directory.

### Basic Usage

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
      // Create a whiteboard instance
      NetlessFastboard.createFastboard({
        sdkConfig: {
          appIdentifier: "Your App Identifier",
          region: "cn-hz",
        },
        joinRoom: {
          uid: "User ID",
          uuid: "Room UUID",
          roomToken: "Room Token",
        },
        managerConfig: {
          cursor: true,
        },
      }).then((fastboard) => {
        // Create UI interface
        const container = document.getElementById('fastboard');
        const ui = NetlessFastboard.createUI(fastboard, container);
        
        // Mount UI
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

### Running the Example

1. Make sure the build is complete
2. Open the `example/index.html` file using a local server
3. Replace the following parameters in the example code:
   - `appIdentifier`: Your app identifier
   - `uid`: User ID
   - `uuid`: Room UUID
   - `roomToken`: Room Token

## Adding Other Netless Apps

### Adding Dependencies
Taking app-slide as an example, add the dependency:
```bash
pnpm add @netless/app-slide
```
### Registering to Fastboard
```js
  import { register } from '@netless/fastboard/full';
  import SlideApp, { addHooks } from "@netless/app-slide";

  // Integrate SlideApp as needed
  register({
      kind: "Slide",
      appOptions: { debug: false },
      src: SlideApp,
      addHooks,
  });

```
### Adding Slide App to Fastboard Apps List in Client Project

```js
  // Add a slide app to the apps list
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


## Dependencies

- `@netless/fastboard`: For specific API calls, refer to [`@netless/fastboard`](https://github.com/netless-io/fastboard/blob/main/README-zh.md)
- `esbuild`: Used for fast builds
- `@babel/cli`: Used for ES5 conversion
- `rollup`: Used for bundling


## Notes

- Ensure your Node.js version is compatible with the project dependencies
- The build process may take some time, please be patient
- If you encounter build errors, please check if the Node.js version and dependency installation are complete
- When using the example code, make sure to replace the correct app identifier and room information

## License

MIT