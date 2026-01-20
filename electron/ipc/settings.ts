import { ipcMain } from 'electron';
import { loadSettings, saveSettings, getSettingsPath, Settings } from '../filesystem/manager';
import log from '../utils/logger';

let dataPath: string = '';

export function registerSettingsHandlers(basePath: string): void {
  dataPath = basePath;

  // Get single setting
  ipcMain.handle('settings:get', async (_event, key: string) => {
    try {
      const settingsPath = getSettingsPath();
      const settings = loadSettings(settingsPath);
      
      if (key in settings) {
        return { success: true, data: settings[key] };
      }
      return { success: false, error: 'Setting not found' };
    } catch (error: any) {
      log.error('Error getting setting:', error);
      return { success: false, error: error.message };
    }
  });

  // Set single setting
  ipcMain.handle('settings:set', async (_event, key: string, value: any) => {
    try {
      const settingsPath = getSettingsPath();
      const settings = loadSettings(settingsPath);
      settings[key] = value;
      saveSettings(settingsPath, settings);
      
      log.info('Setting updated:', { key });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error setting value:', error);
      return { success: false, error: error.message };
    }
  });

  // Get all settings
  ipcMain.handle('settings:getAll', async () => {
    try {
      const settingsPath = getSettingsPath();
      const settings = loadSettings(settingsPath);
      return { success: true, data: settings };
    } catch (error: any) {
      log.error('Error getting all settings:', error);
      return { success: false, error: error.message };
    }
  });

  // Get data path
  ipcMain.handle('settings:getDataPath', async () => {
    try {
      return { success: true, data: dataPath };
    } catch (error: any) {
      log.error('Error getting data path:', error);
      return { success: false, error: error.message };
    }
  });

  // Set data path (requires app restart)
  ipcMain.handle('settings:setDataPath', async (_event, newPath: string) => {
    try {
      const settingsPath = getSettingsPath();
      const settings = loadSettings(settingsPath);
      settings.dataPath = newPath;
      saveSettings(settingsPath, settings);
      
      log.info('Data path updated:', { newPath });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error setting data path:', error);
      return { success: false, error: error.message };
    }
  });
}
