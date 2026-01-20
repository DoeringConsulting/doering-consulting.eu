import { ipcMain, dialog, shell } from 'electron';
import fs from 'fs';
import path from 'path';
import { 
  ensureDirectoryStructure, 
  saveFile as saveFileToFS, 
  readFile, 
  fileExists, 
  listFiles as listFilesFromFS,
  FILE_CATEGORIES,
  FileCategory,
  getMonthPath
} from '../filesystem/manager';
import log from '../utils/logger';

let dataPath: string = '';

export function registerFilesHandlers(basePath: string): void {
  dataPath = basePath;

  // Select folder dialog
  ipcMain.handle('files:selectFolder', async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory', 'createDirectory'],
        title: 'Ordner wählen',
        buttonLabel: 'Ordner wählen'
      });

      if (result.canceled) {
        return { success: false, error: 'Cancelled' };
      }

      const selectedPath = result.filePaths[0];

      // Validate write permissions
      try {
        const testFile = path.join(selectedPath, '.write-test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
      } catch (error) {
        return { success: false, error: 'Keine Schreibrechte in diesem Ordner' };
      }

      return { success: true, data: selectedPath };
    } catch (error: any) {
      log.error('Error selecting folder:', error);
      return { success: false, error: error.message };
    }
  });

  // Save file
  ipcMain.handle('files:save', async (_event, fileData: {
    category: string;
    filename: string;
    data: ArrayBuffer;
    year: number;
    month: number;
  }) => {
    try {
      const { category, filename, data, year, month } = fileData;
      
      // Validate category
      if (!Object.keys(FILE_CATEGORIES).includes(category)) {
        return { success: false, error: 'Invalid category' };
      }

      const buffer = Buffer.from(data);
      const filePath = await saveFileToFS(
        dataPath, 
        category as FileCategory, 
        filename, 
        buffer, 
        year, 
        month
      );

      return { success: true, data: filePath };
    } catch (error: any) {
      log.error('Error saving file:', error);
      return { success: false, error: error.message };
    }
  });

  // Read file
  ipcMain.handle('files:read', async (_event, filePath: string) => {
    try {
      // Handle both absolute and relative paths
      const fullPath = path.isAbsolute(filePath) ? filePath : path.join(dataPath, filePath);
      
      if (!fileExists(fullPath)) {
        return { success: false, error: 'File not found' };
      }

      const data = readFile(fullPath);
      return { success: true, data: data.buffer };
    } catch (error: any) {
      log.error('Error reading file:', error);
      return { success: false, error: error.message };
    }
  });

  // Check if file exists
  ipcMain.handle('files:exists', async (_event, filePath: string) => {
    try {
      const fullPath = path.isAbsolute(filePath) ? filePath : path.join(dataPath, filePath);
      const exists = fileExists(fullPath);
      return { success: true, data: exists };
    } catch (error: any) {
      log.error('Error checking file existence:', error);
      return { success: false, error: error.message };
    }
  });

  // Create directory
  ipcMain.handle('files:createDirectory', async (_event, dirPath: string) => {
    try {
      const fullPath = path.isAbsolute(dirPath) ? dirPath : path.join(dataPath, dirPath);
      
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error creating directory:', error);
      return { success: false, error: error.message };
    }
  });

  // List files in a category
  ipcMain.handle('files:listFiles', async (_event, params: {
    year: number;
    month: number;
    category: string;
  }) => {
    try {
      const { year, month, category } = params;
      
      if (!Object.keys(FILE_CATEGORIES).includes(category)) {
        return { success: false, error: 'Invalid category' };
      }

      const files = listFilesFromFS(dataPath, category as FileCategory, year, month);
      return { success: true, data: files };
    } catch (error: any) {
      log.error('Error listing files:', error);
      return { success: false, error: error.message };
    }
  });

  // Open folder in file explorer
  ipcMain.handle('files:openFolder', async (_event, folderPath: string) => {
    try {
      const fullPath = path.isAbsolute(folderPath) ? folderPath : path.join(dataPath, folderPath);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, error: 'Folder not found' };
      }

      await shell.openPath(fullPath);
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error opening folder:', error);
      return { success: false, error: error.message };
    }
  });

  // Save receipt file
  ipcMain.handle('files:saveReceipt', async (_event, data: ArrayBuffer, filename: string) => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const buffer = Buffer.from(data);
      const filePath = await saveFileToFS(
        dataPath,
        'documents' as FileCategory,
        filename,
        buffer,
        year,
        month
      );

      return { success: true, data: filePath };
    } catch (error: any) {
      log.error('Error saving receipt:', error);
      return { success: false, error: error.message };
    }
  });
}
