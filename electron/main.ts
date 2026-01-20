import { app, BrowserWindow, ipcMain, dialog, Menu, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import { initDatabase, closeDatabase } from './database/connection';
import { registerCustomersHandlers } from './ipc/customers';
import { registerTimeEntriesHandlers } from './ipc/timeEntries';
import { registerExpensesHandlers } from './ipc/expenses';
import { registerFixedCostsHandlers } from './ipc/fixedCosts';
import { registerExchangeRatesHandlers } from './ipc/exchangeRates';
import { registerTaxSettingsHandlers } from './ipc/taxSettings';
import { registerReportsHandlers } from './ipc/reports';
import { registerFilesHandlers } from './ipc/files';
import { registerSettingsHandlers } from './ipc/settings';
import { registerBackupHandlers } from './ipc/backup';
import { registerInvoiceNumbersHandlers } from './ipc/invoiceNumbers';
import { ensureDirectoryStructure, getSettingsPath, loadSettings, saveSettings } from './filesystem/manager';
import log from './utils/logger';

let mainWindow: BrowserWindow | null = null;
let dataPath: string = '';

function createWindow() {
  // Get saved window bounds
  const settingsPath = getSettingsPath();
  const settings = loadSettings(settingsPath);
  const windowBounds = settings.windowBounds || { width: 1400, height: 900 };

  mainWindow = new BrowserWindow({
    width: windowBounds.width,
    height: windowBounds.height,
    x: windowBounds.x,
    y: windowBounds.y,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    icon: path.join(__dirname, '../build-resources/icon.ico'),
    title: 'Döring Consulting - Projekt & Abrechnungsmanagement',
    show: false
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Save window bounds on close
  mainWindow.on('close', () => {
    if (mainWindow) {
      const bounds = mainWindow.getBounds();
      const settings = loadSettings(settingsPath);
      settings.windowBounds = bounds;
      saveSettings(settingsPath, settings);
    }
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createApplicationMenu();
}

function createApplicationMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Datenordner öffnen',
          click: () => {
            if (dataPath) {
              shell.openPath(dataPath);
            }
          }
        },
        {
          label: 'Datenordner ändern...',
          click: async () => {
            const result = await dialog.showOpenDialog({
              properties: ['openDirectory', 'createDirectory'],
              title: 'Neuen Datenordner wählen',
              buttonLabel: 'Ordner wählen'
            });
            
            if (!result.canceled && result.filePaths[0]) {
              dataPath = result.filePaths[0];
              const settingsPath = getSettingsPath();
              const settings = loadSettings(settingsPath);
              settings.dataPath = dataPath;
              saveSettings(settingsPath, settings);
              
              // Reinitialize database
              closeDatabase();
              await initDatabase(dataPath);
              
              // Reload window
              mainWindow?.reload();
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Beenden',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Bearbeiten',
      submenu: [
        { role: 'undo', label: 'Rückgängig' },
        { role: 'redo', label: 'Wiederholen' },
        { type: 'separator' },
        { role: 'cut', label: 'Ausschneiden' },
        { role: 'copy', label: 'Kopieren' },
        { role: 'paste', label: 'Einfügen' },
        { role: 'selectAll', label: 'Alles auswählen' }
      ]
    },
    {
      label: 'Ansicht',
      submenu: [
        { role: 'reload', label: 'Neu laden' },
        { role: 'forceReload', label: 'Neu laden (Cache leeren)' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom zurücksetzen' },
        { role: 'zoomIn', label: 'Vergrößern' },
        { role: 'zoomOut', label: 'Verkleinern' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Vollbild' }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Über',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Über Döring Consulting Billing',
              message: 'Döring Consulting - Projekt & Abrechnungsmanagement',
              detail: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nNode: ${process.versions.node}\nChromium: ${process.versions.chrome}`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

async function selectDataPath(): Promise<string | null> {
  const result = await dialog.showOpenDialog({
    title: 'Wählen Sie den Speicherort für Ihre Daten',
    message: 'Bitte wählen Sie einen Ordner, in dem alle Daten gespeichert werden sollen.\n\nEmpfohlen: OneDrive/DoringConsulting',
    properties: ['openDirectory', 'createDirectory'],
    buttonLabel: 'Ordner wählen'
  });

  if (result.canceled || !result.filePaths[0]) {
    return null;
  }

  const selectedPath = result.filePaths[0];

  // Validate write permissions
  try {
    const testFile = path.join(selectedPath, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
  } catch (error) {
    await dialog.showErrorBox(
      'Fehler',
      'Keine Schreibrechte in diesem Ordner. Bitte wählen Sie einen anderen Ordner.'
    );
    return null;
  }

  return selectedPath;
}

app.whenReady().then(async () => {
  log.info('App starting...');

  // Load saved data path or ask user
  const settingsPath = getSettingsPath();
  const settings = loadSettings(settingsPath);

  if (settings.dataPath && fs.existsSync(settings.dataPath)) {
    dataPath = settings.dataPath;
  } else {
    // No saved path, ask user
    const selectedPath = await selectDataPath();
    
    if (!selectedPath) {
      app.quit();
      return;
    }
    
    dataPath = selectedPath;
    settings.dataPath = dataPath;
    saveSettings(settingsPath, settings);
  }

  log.info(`Data path: ${dataPath}`);

  // Ensure directory structure exists
  const now = new Date();
  await ensureDirectoryStructure(dataPath, now.getFullYear(), now.getMonth() + 1);

  // Initialize database
  await initDatabase(dataPath);
  log.info('Database initialized');

  // Register IPC handlers
  registerCustomersHandlers();
  registerTimeEntriesHandlers();
  registerExpensesHandlers();
  registerFixedCostsHandlers();
  registerExchangeRatesHandlers();
  registerTaxSettingsHandlers();
  registerReportsHandlers();
  registerFilesHandlers(dataPath);
  registerSettingsHandlers(dataPath);
  registerBackupHandlers(dataPath);
  registerInvoiceNumbersHandlers();
  log.info('IPC handlers registered');

  // Create main window
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  closeDatabase();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  log.error('Uncaught exception:', error);
  dialog.showErrorBox(
    'Fehler',
    `Ein unerwarteter Fehler ist aufgetreten:\n\n${error.message}\n\nDie Anwendung wird beendet.`
  );
  app.quit();
});

process.on('unhandledRejection', (reason) => {
  log.error('Unhandled rejection:', reason);
});

// Export for IPC handlers
export function getDataPath(): string {
  return dataPath;
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}
