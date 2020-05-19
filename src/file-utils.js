const fs = require("fs");
const path = require("path");
const ncp = require("ncp");
const { promisify } = require("util");
const replaceInFiles = require("replace-in-files");

const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const rename = promisify(fs.rename);
const copy = promisify(ncp);
const fs_constants_ROK = fs.constants.R_OK;

module.exports = {
  path,
  mkdir,
  access,
  rename,
  copy,
  replaceInFiles,
  fs_constants_ROK
};
