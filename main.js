const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 670,
    height: 500,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.loadFile("index.html");

  // إعداد شريط القوائم
  const menu = Menu.buildFromTemplate([
    {
      label: "حول",
      submenu: [
        {
          label: "حول البرنامج",
          click: () => {
            // يمكنك تخصيص نافذة أو صندوق حوار هنا إذا رغبت في عرض معلومات حول البرنامج
            const { dialog } = require("electron");
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "حول البرنامج",
              message: `انتظروني بتحديث جديد واضافات جديده للبرنامج\nنسخة البرنامج: 1.0.0\n\nارجو الدعاء لوالدي بالرحمه والمغفرة`,
              buttons: ["موافق"],
            });
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  // معالجة فتح الروابط الخارجية
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
