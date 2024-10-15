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

/**
 * Utility function to log styled messages.
 * @param {string} colorCode - The color code or style code for the message.
 * @param {string} message - The message to log.
 */
function logMessage(colorCode: string, message: string) {
    console.log(`${colorCode}%s${RESET}`, message);
}

// Log success messages in green
export function logSuccess(message: string) {
    logMessage(Color.GREEN, message);
}

// Log error messages in red
export function logError(message: string) {
    logMessage(Color.RED, message);
}

// Log warning messages in yellow
export function logWarn(message: string) {
    logMessage(Color.YELLOW, message);
}

// Log info messages in blue
export function logInfo(message: string) {
    logMessage(Color.BLUE, message);
}

// Log bold messages
export function logBold(message: string) {
    logMessage(Style.BOLD, message);
}

// Log underlined messages
export function logUnderline(message: string) {
    logMessage(Style.UNDERLINE, message);
}

// Log messages with a specific color and style
export function customLog(color: keyof typeof Color, style: keyof typeof Style, message: string) {
    const colorCode = Color[color.toUpperCase()] || '';
    const styleCode = Style[style.toUpperCase()] || '';
    logMessage(`${colorCode}${styleCode}`, message);
}
