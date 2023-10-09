const { readFile } = require("node:fs/promises");
const { join, sep } = require("node:path");

const logEE = require("./emitter");
const { errorMessage } = require("./logEvent");

exports.fetchFile = async (...args) => {
  const path = args.join(sep);

  try {
    const data = await readFile(join(__dirname, path));
    logEE.logFile("fetchFile", "sysInfo", "File fetched successfully");
    return data;
  } catch ({ name, message }) {
    logEE.logFile("fetchFile", "error", `${name}: ${message}`);
    console.log(errorMessage(name, message));
  }
};
