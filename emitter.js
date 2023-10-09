const EventEmitter = require("node:events");
const chalk = require("chalk");

const { createLog, saveLog } = require("./logEvent");

class LogEmitter extends EventEmitter {
  logConsole(method, url, code, msg) {
    const chMethod = chalk.cyan(method);
    const chUrl = chalk.green(url);
    const chCode = chalk.magenta(code);
    const chMsg = chalk.yellow(msg);

    this.emit("logConsole", chMethod, chUrl, chCode, chMsg);
  }

  logFile(event, level, message) {
    this.emit("logFile", event, level, message);
  }
}

exports.logEE = new LogEmitter();

logEE.on("logConsole", (method, url, code, msg) => {
  console.log(
    `method: ${method}, requested url: ${url}, status code: ${code}, status message: ${msg}`
  );
});

logEE.on("logFile", (event, level, message) => {
  const logRootDir = "logs";
  const log = createLog(event, level, message);

  saveLog(logRootDir, log);
});
