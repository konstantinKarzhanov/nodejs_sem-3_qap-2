const EventEmitter = require("node:events");
const chalk = require("chalk");

class LogEmitter extends EventEmitter {
  logConsole(method, url, code, msg) {
    const chMethod = chalk.cyan(method);
    const chUrl = chalk.green(url);
    const chCode = chalk.magenta(code);
    const chMsg = chalk.yellow(msg);

    this.emit("logConsole", chMethod, chUrl, chCode, chMsg);
  }

  saveLog() {
    this.emit("saveLog");
  }
}

const logEE = new LogEmitter();

logEE.on("logConsole", (method, url, code, msg) => {
  console.log(
    `method: ${method}, requested url: ${url}, status code: ${code}, status message: ${msg}`
  );
});

module.exports = logEE;
