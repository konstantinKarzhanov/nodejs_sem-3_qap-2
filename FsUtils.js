const { readFile, writeFile } = require("node:fs/promises");
const { join, sep } = require("node:path");

const openFile = async (...args) => {
  const path = args.join(sep);

  try {
    return await readFile(join(__dirname, path));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  openFile,
};
