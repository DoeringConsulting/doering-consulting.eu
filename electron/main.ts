import { app, BrowserWindow } from 'electron';
import path from 'path';
import { initDatabase } from './database/connection';
import { registerCustomersHandlers } from './ipc/customers';
import { registerTimeEntriesHandlers } from './ipc/timeEntries';
import { registerExpensesHandlers } from './ipc/expenses';
import { registerReportsHandlers } from './ipc/reports';
import { registerFilesHandlers } from './ipc/files';
import { registerSettingsHandlers } from './ipc/settings';
import Store from 'electron-store';

const store = new Store();

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  // Settings
  registerSettingsHandlers();

  // Get Data Path
  const dataPath = store.get('dataPath', app.getPath('userData')) as string;

  // Init DB
  await initDatabase(dataPath);

  // Register Handlers
  registerCustomersHandlers();
  registerTimeEntriesHandlers();
  registerExpensesHandlers();
  registerReportsHandlers();
  registerFilesHandlers();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
