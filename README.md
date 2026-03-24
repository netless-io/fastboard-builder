# Fastboard Build

This is a simple builder for `@netless/fastboard-full`, used to generate ready-to-use JavaScript bundles for browser delivery.

## Features

- Supports packaging `@netless/fastboard-full` into multiple JavaScript formats
- Generates both modern IIFE and ES5 IIFE outputs
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

If you only need the legacy ES5 IIFE compatibility flow, you can also run:

```bash
bash es5iife.sh
```

This script now reuses the standard build and will also produce `dist/index.global.es5.js`.

## Build Output

The build process will generate the following files:
- `dist/index.js` - JavaScript file in CJS format
- `dist/index.mjs` - JavaScript file in ESM format
- `dist/index.global.js` - Minified IIFE bundle for modern browsers
- `dist/index.global.es5.js` - Minified ES5 IIFE bundle for Android 4.4 WebView, iOS 9, and other legacy browsers

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

For Android 4.4 WebView, iOS 9, or other legacy browser environments, replace:

```html
<script src="../dist/index.global.js"></script>
```

with:

```html
<script src="../dist/index.global.es5.js"></script>
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
  import { register } from '@netless/fastboard-full';
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

- `@netless/fastboard-full`: The bundled Fastboard entry used by this builder
- `esbuild`: Used for fast builds
- `@swc/core`: Used to transform the browser global bundle down to ES5


## Notes

- Ensure your Node.js version is compatible with the project dependencies
- The build process may take some time, please be patient
- If you encounter build errors, please check if the Node.js version and dependency installation are complete
- When using the example code, make sure to replace the correct app identifier and room information

## License

MIT
