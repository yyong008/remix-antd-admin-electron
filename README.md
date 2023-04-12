# Remix Antd Admin Electron

A management system based on `Remix`/`Antd`/`Echarts`/`Styled-components` that enables quick project initialization.

## project address

> Web: https://remix-antd-admin.vercel.app/

## Current Remix Version

> 1.51.0

## Motivation

Remix's design paradigm is simple and convenient - the entire application is a router that connects the front-end and back-end. The form design makes Remix's form capabilities more straightforward and convenient. In a backend management system, data display, data entry, and page switching are crucial. Remix's design seems to be a simple and apt fit. Integrating Antd UI project capabilities allows for the rapid implementation of backend management systems with beautiful and straightforward UIs.

## Core Packages

| electron package          | desc                                    |
| ------------------------- | --------------------------------------- |
| remix-electron            | Electron integration for Remix ⚛💿      |
| electron                  | core package                            |
| @remix-run/server-runtime | remix runtime                           |
| nodemon                   | restart your application in development |

## Add Desktop files

- desktop/main.js

```tsx
const { initRemix } = require("remix-electron");
const { app, BrowserWindow, dialog } = require("electron");
const { join } = require("node:path");

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
  win = new BrowserWindow({ show: false });
  await win.loadURL(url);
  win.show();

  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
}

app.on("ready", async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      await installExtension(REACT_DEVELOPER_TOOLS);
    }

    const url = await initRemix({ serverBuild: join(__dirname, "build") });
    await createWindow(url);
  } catch (error) {
    dialog.showErrorBox("Error", getErrorStack(error));
    console.error(error);
  }
});

/** @param {unknown} error */
function getErrorStack(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}
```

## Remix config files

```js
// remix.config.js
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  serverBuildPath: "desktop/build/index.js",
  // ...
};
```

## Add nodemon.json

```json
{
  "$schema": "https://json.schemastore.org/nodemon.json",
  "exec": "electron",
  "watch": ["desktop"],
  "ignore": ["desktop/build"],
  "execMap": {
    "ts": "ts-node"
  }
}
```

## add server.js in root

```js
import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";


function getLoadContext(event, context) {
  let rawAuthorizationString;
  let netlifyGraphToken;

  if (event.authlifyToken != null) {
    netlifyGraphToken = event.authlifyToken;
  }

  const authHeader = event.headers["authorization"];
  const graphSignatureHeader = event.headers["x-netlify-graph-signature"];

  if (authHeader != null && /Bearer /gi.test(authHeader)) {
    rawAuthorizationString = authHeader.split(" ")[1];
  }

  const loadContext = {
    clientNetlifyGraphAccessToken: rawAuthorizationString,
    netlifyGraphToken: netlifyGraphToken,
    netlifyGraphSignature: graphSignatureHeader,
  };

  // Remove keys with undefined values
  Object.keys(loadContext).forEach((key) => {
    if (loadContext[key] == null) {
      delete loadContext[key];
    }
  });

  return loadContext;
}

export const handler = createRequestHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV,
});
```

## Project Core Packages

| Package           | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| remix             | 1.51.0 (CorPackage)                                                    |
| antd              | 5.3.1 (Core UIPackage)                                                 |
| styled-components | CSS-in-JS solution (Core CSS solution)                                 |
| remix-utils       | Remix's common tools, such as the `<ClientOnly>` component (Core tool) |

## Chart Libraries

| Internationalization Package | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| remix-i18next                | A simple way to translate your Remix application |

### Chart Libraries

Chart selection should consider support for SSR.

| Chart Library          | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| echarts                | 5.3.9 primary charts (consider Remix's need for server-side rendering) |
| echarts-for-react      | Echarts component encapsulated by React                                |
| react-mind             | React mind                                                             |
| react-mindmap          | React mind                                                             |
| react-wordcloud        | React word cloud that supports SSR                                     |
| reactflow              | Flow chart                                                             |
| echarts-liquidfill-ssr | Water droplet chart                                                    |

### Cropping Tool

- [react-advanced-cropper](https://advanced-cropper.github.io/react-advanced-cropper/#mobile-cropper)

```sh
pnpm install react-advanced-cropper
```

## Advantages

Simple and clear routing writing paradigm, simple data retrieval and form capabilities.

- Powerful file routing paradigm
- remix loader retrieves data
- action processes form data

## npmrc config

```.npmrc
# 将pnpm变成扁平化架构
node-linker=hoisted

# 在国内使用pnpm安装electron需要配置一下electron的下载路径
electron_mirror="https://npm.taobao.org/mirrors/electron/"
```

## Usage

Use pnpm

```sh
# server
pnpm run dev # pnpm dev
# build
pnpm run build # pnpm build
```

### Formatting Tool

```sh
"scripts": {
    "prettier": "prettier --write app/ public/locales"
}
```

usage formate code

```sh
pnpm run prettier
```

## build target

- `remix-antd-admin Setup <package.json version>.exec` We can Setup This Application。

## Support

Currently in a state of continuous fundraising. If this project helps you, please consider buying the author a cup of coffee. With your support, the project will receive better maintenance and produce higher-quality code. You can also participate in this project as a contributor and provide valuable feedback to help with its maintenance and development.
