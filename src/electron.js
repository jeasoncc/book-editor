const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
} = require("electron");
const path = require("path");
// const fetch = require("node-fetch");
// const semver = require("semver");
const ipc = require("electron").ipcMain;

let mainWindow;
let loadingScreen;

const windowHandler = {
  set(target, key, value) {
    if (key === "main" && value) {
      showMainWindow();
    }
    target[key] = value;
  },
};
const windowState = new Proxy({ main: false }, windowHandler);

console.log("App starting...");

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    frame: false,
    title: "xiaoMiquanWrite",
    show: false,
    icon: path.join(__dirname, "../build/peep-76.svg"),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // mainWindow.webContents.openDevTools({ mode: "right" });
  mainWindow.loadURL(`file://${path.join(__dirname, "../public/index.html")}`);
  mainWindow.webContents.on("did-finish-load", () => {
    if (windowState.main) {
      mainWindow.show();
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.on("context-menu", (event, params) => {
    const menu = new Menu();
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(
        new MenuItem({
          label: suggestion,
          click: () => mainWindow.webContents.replaceMisspelling(suggestion),
        })
      );
    }

    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: "Add to dictionary",
          click: () =>
            mainWindow.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            ),
        })
      );
    } else {
      return;
    }
    menu.popup();
  });
};

const showMainWindow = () => {
  console.log("Show app");
  if (loadingScreen) {
    loadingScreen.close();
  }
  mainWindow.show();
};

const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow(
    Object.assign({
      width: 300,
      height: 400,
      frame: false,
      transparent: true,
      resizable: false,
      icon: path.join(__dirname, "../build/peep-76.svg"),
    })
  );
  loadingScreen.loadURL(
    `file://${path.join(__dirname, "../public/splash/index.html")}`
  );

  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.webContents.on("did-finish-load", () => {
    console.log("Show loading screen");
    loadingScreen.show();
    // let status = false;
    // let latest = false;
    // let currentVersion = app.getVersion();
    // alert(currentVersion)
    windowState.main = true;
    // fetch(
    //   "https://api.github.com/repos/torstendittmann/omniawrite/releases/latest"
    // )
    //   .then(response => {
    //     status = response.status;
    //     return response.json();
    //   })
    //   .then(data => {
    //     latest = data;
    //   })
    //   .catch(console.log)
    //   .finally(() => {
    //     let currentVersion = app.getVersion();
    //     let fetchedVersion = latest ? latest.name : false;

    //     if (
    //       status &&
    //       status === 200 &&
    //       fetchedVersion &&
    //       semver.gt(fetchedVersion, currentVersion)
    //     ) {
    //       let options = {
    //         buttons: ["Yes", "No"],
    //         title: "Update available!",
    //         message:
    //           "There is a new Update available!\n\nWould you like to update now?",
    //         type: "info",
    //       };
    //       dialog.showMessageBox(options).then(res => {
    //         if (res.response === 0) {
    //           shell.openExternal("https://external.omniawrite.com/#/update/");
    //         }
    //         windowState.main = true;
    //       });
    //     } else {
    //       windowState.main = true;
    //     }
    //   });
  });
};
app.whenReady().then(() => {
  // 注册一个 'CommandOrControl+Y' 快捷键监听器.
  globalShortcut.register("f12", () => {
    console.log("启动了开发者模式");
    mainWindow.toggleDevTools();
    // Do stuff when Y and either Command/Control is pressed.
  });
});
app.allowRendererProcessReuse = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoadingScreen();
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on("reload", () => {
  mainWindow.reload();
});

ipc.on("minimize", () => {
  mainWindow.minimize();
});

ipc.on("maximize", () => {
  mainWindow.maximize();
});

ipc.on("restore", () => {
  mainWindow.restore();
});

ipc.on("close", () => {
  mainWindow.close();
});

ipc.on("resize", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});
