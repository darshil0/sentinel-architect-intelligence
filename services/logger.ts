// Placeholder logger to resolve import errors.
// The real implementation should be done as part of the "add a logger" task.
const logger = {
  info: (...args: any[]) => console.log(...args),
  warn: (...args: any[]) => console.warn(...args),
  error: (...args: any[]) => console.error(...args),
};

export default logger;
