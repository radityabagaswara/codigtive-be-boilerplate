import { Injectable, LoggerService as Logger } from '@nestjs/common';

@Injectable()
export class LoggerService implements Logger {
  private formatMessage(
    level: string,
    message: any,
    optionalParams: any[],
  ): string {
    const timestamp = new Date().toISOString();
    const color = this.getColor(level);
    const paddedMessage = message.padEnd(100); // Ensure the message is 50 characters wide
    const lightGray = '\x1b[37m'; // Light gray color
    return `[${timestamp}] ${color}[${level}]\x1b[0m ${paddedMessage} ${optionalParams.length ? `${lightGray}${optionalParams.join('\n')}\x1b[0m` : ''}`;
  }

  private getColor(level: string): string {
    switch (level) {
      case 'LOG':
        return '\x1b[32m'; // Green
      case 'FATAL':
        return '\x1b[41m'; // Red background
      case 'ERROR':
        return '\x1b[31m'; // Red
      case 'WARN':
        return '\x1b[33m'; // Yellow
      case 'DEBUG':
        return '\x1b[34m'; // Blue
      case 'VERBOSE':
        return '\x1b[35m'; // Magenta
      default:
        return '\x1b[0m'; // Reset
    }
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('LOG', message, optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('FATAL', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('ERROR', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('WARN', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('DEBUG', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('VERBOSE', message, optionalParams));
  }
}
