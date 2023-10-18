// Import required built-in modules
const { readFile } = require("node:fs/promises");
const { join, sep, basename } = require("node:path");

// Import the emitter instance for logging events
const logEE = require("./log-emitter");

// Import log-related utility functions
const {
  logTitle,
  logFilePortURL,
  logError,
  borderLine,
} = require("./log-utils");

// Create and export the function for reading files
exports.fetchFile = async (...args) => {
  // Create path combining the provided arguments
  const path = args.join(sep);

  try {
    // Read the content of the file
    const data = await readFile(join(__dirname, path));

    // Log a success message for fetching the file to the console
    console.log(
      `${logTitle("fetchFile:")} [File "${logFilePortURL(
        basename(path)
      )}" fetched successfully]`
    );
    console.log(borderLine);

    // Log a success message for fetching the file to the file
    logEE.logFile(
      "fetchFile",
      "sysInfo",
      `File "${basename(path)}" fetched successfully`
    );

    // Return the fetched data
    return data;
  } catch ({ name, message }) {
    // Log an error message to the console if there's an error while fetching the file
    console.log(logError(name, message));
    console.log(borderLine);

    // Log an error message to the file if there's an error while fetching the file
    logEE.logFile("fetchFile", "error", `${name}: ${message}`);
  }
};
