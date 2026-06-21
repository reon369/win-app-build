const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

function createWindow(htmlFile, title) {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: title,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(htmlFile);
}

function setupMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
    }] : []),
    {
      label: 'ファイル',
      submenu: [
        {
          label: '1階シフト表を開く',
          click: () => createWindow('index_1f.html', 'シフト自動生成【1階】'),
        },
        {
          label: '2階シフト表を開く',
          click: () => createWindow('index_2f.html', 'シフト自動生成【2階】'),
        },
        { type: 'separator' },
        { role: 'quit', label: '終了' },
      ],
    },
    {
      label: '表示',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  setupMenu();
  // 起動時は選択画面(1階をデフォルトで開く)
  createWindow('index_1f.html', 'シフト自動生成【1階】');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('index_1f.html', 'シフト自動生成【1階】');
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
