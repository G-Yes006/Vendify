import { Request, Response, NextFunction } from 'express';

const RESET = '\x1b[0m';

enum Color {
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  BLUE = '\x1b[34m',
  MAGENTA = '\x1b[35m',
  CYAN = '\x1b[36m',
  WHITE = '\x1b[37m',
}

enum Style {
  BOLD = '\x1b[1m',
  UNDERLINE = '\x1b[4m',
}

// Helper function to format log messages with color and style
const formatLog = (text: string, color: string, style: string = ''): string => {
  return `${style}${color}${text}${RESET}`;
};

// Helper function to get status color based on status code
const getStatusColor = (status: number): string => {
  return status >= 400 ? Color.RED : Color.GREEN;
};

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const method = req.method;
  const url = req.url;

  // Log incoming request
  console.log(
    `${formatLog(`[${new Date().toISOString()}]`, Color.CYAN)} ${formatLog(method, Color.BLUE, Style.BOLD)} ${formatLog(url, Color.GREEN, Style.BOLD)}`
  );

  // Log response details after it's finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    console.log(
      `${formatLog(`[${new Date().toISOString()}]`, Color.CYAN)} ${formatLog(method, Color.BLUE, Style.BOLD)} ${formatLog(url, Color.GREEN, Style.BOLD)} ${formatLog(`${statusCode}`, getStatusColor(statusCode))} - ${formatLog(`${duration}ms`, Color.YELLOW)}`
    );
  });

  next();
};
