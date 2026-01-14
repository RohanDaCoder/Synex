import type { LogType } from '../types';
import colors, { bold, gray, whiteBright } from 'yoctocolors';
import { config } from '../config/index';

interface LogOptions {
  timestamp?: boolean;
  colors?: boolean;
}

interface LogContext {
  command?: string;
  guild?: string;
  user?: string;
  context?: string;
}

class Logger {
  private options: LogOptions;

  constructor(options: LogOptions = {}) {
    this.options = {
      timestamp: options.timestamp ?? true,
      colors: options.colors ?? true,
    };
  }

  private getColorForType(type: LogType): (text: string) => string {
    switch (type) {
      case 'INFO':
        return colors.bgCyan;
      case 'ERROR':
        return colors.bgRed;
      case 'WARN':
        return colors.bgYellow;
      case 'TODO':
        return colors.bgMagenta;
      case 'DEBUG':
        return colors.bgBlue;
      case 'SUCCESS':
        return colors.bgGreen;
      default:
        throw new TypeError(`Invalid log type: ${type}`);
    }
  }

  private formatTimestamp(): string {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  private formatMessage(type: LogType, message: string): string {
    const paddedType = ` ${type} `;
    const timestamp = this.options.timestamp ? gray(this.formatTimestamp()) + ' | ' : '';
    const coloredType = this.options.colors
      ? this.getColorForType(type)(paddedType)
      : paddedType;
    const formattedMessage = `${coloredType} ${timestamp}${message}`;

    return bold(whiteBright(formattedMessage));
  }

  log(type: LogType, message: string, _context?: LogContext): void {
    // eslint-disable-next-line no-console
    console.log(this.formatMessage(type, message));
  }

  info(message: string, context?: LogContext): void {
    this.log('INFO', message, context);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log('ERROR', message, context);

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  warn(message: string, context?: LogContext): void {
    this.log('WARN', message, context);
  }

  todo(message: string, context?: LogContext): void {
    this.log('TODO', message, context);
  }

  debug(message: string, _context?: LogContext): void {
    if (!config.debug) return;
    this.log('DEBUG', message, _context);
  }

  success(message: string, context?: LogContext): void {
    this.log('SUCCESS', message, context);
  }
}

export const logger = new Logger();
export default logger;
