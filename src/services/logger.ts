type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private formatMessage(level: LogLevel, context: any, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${context ? JSON.stringify(context) : ''}`;
  }

  info(context: any, message: string) {
    console.log(this.formatMessage('info', context, message));
  }

  warn(context: any, message: string) {
    console.warn(this.formatMessage('warn', context, message));
  }

  error(context: any, message: string) {
    console.error(this.formatMessage('error', context, message));
  }
}

const logger = new Logger();
export default logger;

