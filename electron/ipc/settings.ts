import { ipcMain, app } from 'electron';
import Store from 'electron-store';

const store = new Store();

export function registerSettingsHandlers() {
  ipcMain.handle('settings:getDataPath', () => {
      return store.get('dataPath', app.getPath('userData'));
  });

  ipcMain.handle('settings:setDataPath', (event, path) => {
      store.set('dataPath', path);
      return true;
  });
  
  ipcMain.handle('settings:get', (event, key) => {
      return store.get(key);
  });
  
  ipcMain.handle('settings:set', (event, key, value) => {
      store.set(key, value);
      return true;
  });
}
