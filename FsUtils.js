const { readFile, writeFile } = require("node:fs/promises");
const { join, sep } = require("node:path");

const chalk = require("chalk");

const openFile = async (...args) => {
  const path = args.join(sep);

  try {
    return await readFile(join(__dirname, path));
  } catch ({ name, message }) {
    console.log(chalk.red(name, message));
  }
};

module.exports = {
  openFile,
};
