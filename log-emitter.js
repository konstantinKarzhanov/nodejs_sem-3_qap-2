const EventEmitter = require("node:events");

const { createLog, saveLog } = require("./log-utils");

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