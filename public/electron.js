import { app, BrowserWindow, Tray, nativeImage, Menu } from "electron";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = { startInSystemTray: false, developerMode: true };
const iconPath = path.join(__dirname, "/favicon.ico");

async function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !app.isPackaged || config.developerMode,
    },
    frame: true,
    icon: iconPath,
    show:
      config.startInSystemTray !== undefined
        ? !config.startInSystemTray
        : false,
    titleBarStyle: "default",
    autoHideMenuBar: false,
  });

  try {
    if (app.isPackaged)
      await fs.mkdir(path.join(app.getPath("userData"), "/storage"));
  } catch (e) {}

  if (app.isPackaged)
    await win.loadURL(path.resolve(__dirname, "./index.html"));
  else await win.loadURL("http://localhost:3000");

  app.setAppUserModelId("Linux-GG");

  return win;
}

function showAndFocusWindow() {
  if (BrowserWindow.getAllWindows().length !== 0) {
    let browserWindow = BrowserWindow.getAllWindows()[0];
    browserWindow.show();
    browserWindow.focus();
  } else {
    createWindow(true);
  }
}

var tray = null;
var win = null;
var contextMenu = null;

app.on("ready", async () => {
  win = await createWindow();
  tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.setTitle("Linux-GG");
  tray.setToolTip("Linux-GG");
  contextMenu = Menu.buildFromTemplate([
    { label: "Close", click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", (ev) => {
    showAndFocusWindow();
  });

  win.setTitle("Linux-GG");
});
