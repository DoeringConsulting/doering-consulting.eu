import fs from 'fs';
import path from 'path';
import { app } from 'electron';

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: any;
}

class Logger {
  private logPath: string;
  private errorLogPath: string;
  private isDevelopment: boolean;

  constructor() {
    // Use app.getPath only after app is ready, fallback to current directory
    const logDir = app?.isReady() 
      ? path.join(app.getPath('userData'), 'logs')
      : path.join(process.cwd(), 'logs');
    
    this.ensureLogDirectory(logDir);
    
    const date = new Date().toISOString().split('T')[0];
    this.logPath = path.join(logDir, `app-${date}.log`);
    this.errorLogPath = path.join(logDir, 'errors.log');
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private ensureLogDirectory(logDir: string): void {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = {
      timestamp,
      level,
      message,
      ...(meta && { meta })
    };
    return JSON.stringify(entry);
  }

  private writeToFile(filePath: string, content: string): void {
    try {
      fs.appendFileSync(filePath, content + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private log(level: LogLevel, message: string, meta?: any): void {
    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Write to file
    this.writeToFile(this.logPath, formattedMessage);
    
    // Also write errors to separate file
    if (level === 'ERROR') {
      this.writeToFile(this.errorLogPath, formattedMessage);
    }
    
    // Console output
    const timestamp = new Date().toISOString();
    const consoleMessage = `[${timestamp}] [${level}] ${message}`;
    
    switch (level) {
      case 'ERROR':
        console.error(consoleMessage, meta || '');
        break;
      case 'WARN':
        console.warn(consoleMessage, meta || '');
        break;
      case 'INFO':
        console.log(consoleMessage, meta || '');
        break;
      case 'DEBUG':
        if (this.isDevelopment) {
          console.debug(consoleMessage, meta || '');
        }
        break;
    }
  }

  error(message: string, meta?: any): void {
    this.log('ERROR', message, meta);
  }

  warn(message: string, meta?: any): void {
    this.log('WARN', message, meta);
  }

  info(message: string, meta?: any): void {
    this.log('INFO', message, meta);
  }

  debug(message: string, meta?: any): void {
    this.log('DEBUG', message, meta);
  }

  // Get log file paths
  getLogPaths(): { main: string; errors: string } {
    return {
      main: this.logPath,
      errors: this.errorLogPath
    };
  }

  // Read recent logs
  getRecentLogs(lines: number = 100): string[] {
    try {
      if (!fs.existsSync(this.logPath)) {
        return [];
      }
      const content = fs.readFileSync(this.logPath, 'utf-8');
      const allLines = content.split('\n').filter(line => line.trim());
      return allLines.slice(-lines);
    } catch (error) {
      console.error('Failed to read logs:', error);
      return [];
    }
  }
}

// Singleton instance
const log = new Logger();

export default log;
