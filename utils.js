const { readFile } = require("node:fs/promises");
const { join, sep } = require("node:path");

const logEE = require("./emitter");
const { errorMsg } = require("./logEvent");

exports.fetchFile = async (...args) => {
  const path = args.join(sep);

  try {
    const data = await readFile(join(__dirnae, path));
    logEE.logFile("fetchFile", "sysInfo", "File fetched successfully");
    return data;
  } catch ({ name, message }) {
    logEE.logFile("fetchFile", "error", `${name}: ${message}`);
    console.log(errorMsg(name, message));
  }
};
