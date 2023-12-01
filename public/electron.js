const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = true;

function createWindow() {
  // Configuración de la ventana...
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Viviendator',
        webPreferences: {
        // Estas opciones son para que funcione React
        nodeIntegration: true,
        contextIsolation: false,
        //icon: path.join(__dirname, 'icon.png'),
        },
    });

    // Cargar la página de React
    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    // Abrir las herramientas de desarrollo
    if (isDev) {
        //win.webContents.openDevTools({ mode: 'detach' });
        win.webContents.openDevTools();
    }
}

// app.on("ready", () => {
//     require("./DB/utils/StructureDBToJSON");
//   });

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
