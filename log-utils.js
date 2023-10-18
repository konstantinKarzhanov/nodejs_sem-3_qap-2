// Import required built-in modules
const { existsSync } = require("node:fs");
const { appendFile, mkdir } = require("node:fs/promises");
const { join } = require("node:path");

// Import external packages
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
const chalk = require("chalk");

// Export functions and constants for log formatting
exports.logTitle = chalk.dim;
exports.logReqMethod = chalk.cyan;
exports.logResCode = chalk.magenta;
exports.logMessage = chalk.yellow;
exports.logFilePortURL = chalk.green;
exports.logError = chalk.red;
exports.borderLine = "-".repeat(60);

// Create a log entry
exports.createLog = (event, level, message) => {
  return `${format(
    new Date(),
    "dd/MM/yyyy HH:mm:ss"
  )}\t[${event} - "${level.toUpperCase()}"]\t${uuidv4()}\t[${message}]\n`;
};

// Save a log entry to a specified log file and directory
exports.saveLog = async (logRootDir, logData) => {
  const currentDate = new Date();
  const logRoot = join(__dirname, logRootDir);
  const logDir = join(logRoot, format(currentDate, "MM-yyyy"));
  const logFile = join(logDir, format(currentDate, "dd-MM-yyyy") + ".log");

  try {
    // Create the log root directory if it doesn't exist
    !existsSync(logRoot) && (await mkdir(logRoot));

    // Create the log directory for the current month if it doesn't exist
    !existsSync(logDir) && (await mkdir(logDir, { recursive: true }));

    // Append/create and append the log data to the file
    await appendFile(logFile, logData);
  } catch ({ name, message }) {
    // Log an error if there's an issue with creating directories or appending data
    console.log(logError(name, message));
  }
};
