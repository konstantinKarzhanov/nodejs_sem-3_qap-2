const { readFile } = require("node:fs/promises");
const { join, sep, basename } = require("node:path");

const logEE = require("./log-emitter");
const {
  logTitle,
  logFilePortURL,
  logError,
  borderLine,
} = require("./log-utils");

exports.fetchFile = async (...args) => {
  const path = args.join(sep);

  try {
    const data = await readFile(join(__dirname, path));
    console.log(
      `${logTitle("fetchFile:")} [File "${logFilePortURL(
        basename(path)
      )}" fetched successfully]`
    );
    console.log(borderLine);

    logEE.logFile(
      "fetchFile",
      "sysInfo",
      `File "${basename(path)}" fetched successfully`
    );

    return data;
  } catch ({ name, message }) {
    console.log(logError(name, message));
    console.log(borderLine);

    logEE.logFile("fetchFile", "error", `${name}: ${message}`);
  }
};
