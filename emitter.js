const EventEmitter = require("node:events");
const chalk = require("chalk");

const { createLog, saveLog } = require("./logEvent");

class LogEmitter extends EventEmitter {
  logFile(event, level, message) {
    this.emit("logFile", event, level, message);
  }
}

const logEE = new LogEmitter();

logEE.on("logFile", (event, level, message) => {
  const logRootDir = "logs";
  const log = createLog(event, level, message);

  saveLog(logRootDir, log);
});

module.exports = logEE;
