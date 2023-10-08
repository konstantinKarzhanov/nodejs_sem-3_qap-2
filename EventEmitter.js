const EventEmitter = require("note:events");

class MyEmitter extends EventEmitter {
  logInConsole() {
    this.emit("logInConsole");
  }

  saveLog() {
    this.emit("saveLog");
  }
}

const ee = new MyEmitter();

module.exports = ee;
