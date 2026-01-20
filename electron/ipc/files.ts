import { ipcMain, dialog } from 'electron';
import fs from 'fs';
import path from 'path';

const POLISH_MONTHS = [
  'Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpien', 'Wrzesien', 'Pazdziernik', 'Listopad', 'Grudzien'
];

export function registerFilesHandlers() {
  ipcMain.handle('files:selectFolder', async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory', 'createDirectory'],
        title: 'Datenordner wählen',
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
      console.error('Error selecting folder:', error);
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('files:save', async (event, fileData) => {
    try {
      const { category, filename, data, dataPath } = fileData;
      
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const monthName = POLISH_MONTHS[now.getMonth()];
      
      const folderPath = path.join(
        dataPath,
        String(year),
        `${month}-${monthName}`,
        category
      );
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      
      const fullFilename = `DoringConsulting_${year}_${month}-${monthName}_${category}_${filename}`;
      const filePath = path.join(folderPath, fullFilename);
      
      if (Buffer.isBuffer(data)) {
        fs.writeFileSync(filePath, data);
      } else if (typeof data === 'string') {
        fs.writeFileSync(filePath, data, 'utf8');
      } else {
        // If it's an array buffer (from frontend)
        fs.writeFileSync(filePath, Buffer.from(data));
      }
      
      return { success: true, data: filePath };
    } catch (error: any) {
      console.error('Error saving file:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('files:read', async (event, filePath) => {
    try {
      if (!fs.existsSync(filePath)) {
        return { success: false, error: 'File not found' };
      }
      const data = fs.readFileSync(filePath);
      return { success: true, data };
    } catch (error: any) {
      console.error('Error reading file:', error);
      return { success: false, error: error.message };
    }
  });
}
