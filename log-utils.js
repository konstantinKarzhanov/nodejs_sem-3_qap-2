const { existsSync } = require("node:fs");
const { appendFile, mkdir } = require("node:fs/promises");
const { join } = require("node:path");

const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
const chalk = require("chalk");

exports.logTitle = chalk.dim;
exports.logReqMethod = chalk.cyan;
exports.logResCode = chalk.magenta;
exports.logMessage = chalk.yellow;
exports.logFilePortURL = chalk.green;
exports.logError = chalk.red;
exports.borderLine = "-".repeat(60);

exports.createLog = (event, level, message) => {
  return `${format(
    new Date(),
    "dd/MM/yyyy HH:mm:ss"
  )}\t[${event} - "${level.toUpperCase()}"]\t${uuidv4()}\t[${message}]\n`;
};

exports.saveLog = async (logRootDir, logData) => {
  const currentDate = new Date();
  const logRoot = join(__dirname, logRootDir);
  const logDir = join(logRoot, format(currentDate, "MM-yyyy"));
  const logFile = join(logDir, format(currentDate, "dd-MM-yyyy") + ".log");

  try {
    !existsSync(logRoot) && (await mkdir(logRoot));
    !existsSync(logDir) && (await mkdir(logDir, { recursive: true }));

    await appendFile(logFile, logData);
  } catch ({ name, message }) {
    console.log(logError(name, message));
  }
};
