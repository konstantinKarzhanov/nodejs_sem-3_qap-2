const EventEmitter = require("node:events");

class MyEmitter extends EventEmitter {
  logInConsole(method, url, code, msg) {
    this.emit("logInConsole", method, url, code, msg);
  }

  saveLog() {
    this.emit("saveLog");
  }
}

const ee = new MyEmitter();

ee.on("logInConsole", (method, url, code, msg) => {
  console.log(
    `method: ${method}, requested url: ${url}, status code: ${code}, status message: ${msg}`
  );
});

module.exports = ee;
