const { app, BrowserWindow } = require('electron');

let currentWindow;

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (currentWindow == null) {
    createWindow();
  }
});

function createWindow() {
  if (currentWindow) {
    throw new Error('A window is already open');
  }

  currentWindow = new BrowserWindow({
    autoHideMenuBar: true,
    title: 'Operation Chronos',
    width: 270,
    height: 295
  });

  currentWindow.loadURL(`file://${__dirname}/html/index.html`);
  currentWindow.on('closed', () => {
    currentWindow = null;
  });
}
