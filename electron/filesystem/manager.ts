import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import log from '../utils/logger';

// Polish month names
export const POLISH_MONTHS = [
  'Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpien', 'Wrzesien', 'Pazdziernik', 'Listopad', 'Grudzien'
];

// File categories (Polish names)
export const FILE_CATEGORIES = {
  invoices: 'Faktury',
  reports: 'Raporty',
  travelCosts: 'Koszty_podrozy',
  documents: 'Dokumenty',
  transferConfirmations: 'Potwierdzenia_przelewow',
  backups: 'Kopie_zapasowe'
} as const;

export type FileCategory = keyof typeof FILE_CATEGORIES;

export interface Settings {
  dataPath?: string;
  windowBounds?: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
  language?: string;
  theme?: string;
  lastBackup?: string;
  [key: string]: any;
}

/**
 * Get the path to the settings file
 */
export function getSettingsPath(): string {
  const userDataPath = app?.getPath('userData') || process.env.APPDATA || '.';
  return path.join(userDataPath, 'settings.json');
}

/**
 * Load settings from file
 */
export function loadSettings(settingsPath: string): Settings {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    log.error('Error loading settings:', error);
  }
  return {};
}

/**
 * Save settings to file
 */
export function saveSettings(settingsPath: string, settings: Settings): void {
  try {
    const dir = path.dirname(settingsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    log.info('Settings saved');
  } catch (error) {
    log.error('Error saving settings:', error);
  }
}

/**
 * Get the month folder name in Polish format
 */
export function getMonthFolderName(month: number): string {
  const monthStr = String(month).padStart(2, '0');
  const monthName = POLISH_MONTHS[month - 1];
  return `${monthStr}-${monthName}`;
}

/**
 * Get the full path for a year/month combination
 */
export function getMonthPath(basePath: string, year: number, month: number): string {
  const monthFolder = getMonthFolderName(month);
  return path.join(basePath, String(year), monthFolder);
}

/**
 * Ensure the complete directory structure exists for a given year/month
 */
export async function ensureDirectoryStructure(basePath: string, year: number, month: number): Promise<string> {
  const monthPath = getMonthPath(basePath, year, month);

  // Create all category folders
  for (const category of Object.values(FILE_CATEGORIES)) {
    const categoryPath = path.join(monthPath, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
      log.info(`Created directory: ${categoryPath}`);
    }
  }

  // Also ensure database folder exists
  const dbPath = path.join(basePath, 'database');
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  // And backups folder in database
  const backupsPath = path.join(dbPath, 'backups');
  if (!fs.existsSync(backupsPath)) {
    fs.mkdirSync(backupsPath, { recursive: true });
  }

  return monthPath;
}

/**
 * Generate a structured filename
 */
export function generateStructuredFilename(
  baseFilename: string,
  category: FileCategory,
  year: number,
  month: number
): string {
  const monthFolder = getMonthFolderName(month);
  const categoryName = FILE_CATEGORIES[category];
  
  // Format: DoringConsulting_[Jahr]_[Monat]-[MonatName]_[Kategorie]_[Beschreibung].[Erweiterung]
  const cleanFilename = baseFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `DoringConsulting_${year}_${monthFolder}_${categoryName}_${cleanFilename}`;
}

/**
 * Get the full file path for saving a file
 */
export function getFilePath(
  basePath: string,
  category: FileCategory,
  filename: string,
  year: number,
  month: number
): string {
  const monthPath = getMonthPath(basePath, year, month);
  const categoryName = FILE_CATEGORIES[category];
  const structuredFilename = generateStructuredFilename(filename, category, year, month);
  return path.join(monthPath, categoryName, structuredFilename);
}

/**
 * Save a file to the structured directory
 */
export async function saveFile(
  basePath: string,
  category: FileCategory,
  filename: string,
  data: Buffer | string,
  year: number,
  month: number
): Promise<string> {
  // Ensure directory structure exists
  await ensureDirectoryStructure(basePath, year, month);

  // Get the full file path
  const filePath = getFilePath(basePath, category, filename, year, month);

  // Write the file
  if (Buffer.isBuffer(data)) {
    fs.writeFileSync(filePath, data);
  } else {
    fs.writeFileSync(filePath, data, 'utf8');
  }

  log.info(`File saved: ${filePath}`);
  return filePath;
}

/**
 * Read a file from the structured directory
 */
export function readFile(filePath: string): Buffer {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return fs.readFileSync(filePath);
}

/**
 * Check if a file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * List files in a category folder
 */
export function listFiles(
  basePath: string,
  category: FileCategory,
  year: number,
  month: number
): string[] {
  const monthPath = getMonthPath(basePath, year, month);
  const categoryName = FILE_CATEGORIES[category];
  const categoryPath = path.join(monthPath, categoryName);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs.readdirSync(categoryPath);
}

/**
 * Delete a file
 */
export function deleteFile(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log.info(`File deleted: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    log.error(`Error deleting file: ${filePath}`, error);
    return false;
  }
}

/**
 * Get all years that have data
 */
export function getYearsWithData(basePath: string): number[] {
  try {
    const entries = fs.readdirSync(basePath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && /^\d{4}$/.test(entry.name))
      .map(entry => parseInt(entry.name))
      .sort((a, b) => b - a); // Descending order
  } catch {
    return [];
  }
}

/**
 * Get all months that have data for a given year
 */
export function getMonthsWithData(basePath: string, year: number): number[] {
  try {
    const yearPath = path.join(basePath, String(year));
    if (!fs.existsSync(yearPath)) {
      return [];
    }

    const entries = fs.readdirSync(yearPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && /^\d{2}-\w+$/.test(entry.name))
      .map(entry => parseInt(entry.name.split('-')[0]))
      .sort((a, b) => a - b); // Ascending order
  } catch {
    return [];
  }
}
