import fs from "fs";
import path from "path";
import ncp from "ncp";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const rename = promisify(fs.rename);
const copy = promisify(ncp);
const replaceInFiles = require("replace-in-files");

async function copyTemplateFiles(srcDirectory, destDirectory) {
  return await copy(srcDirectory, destDirectory, {
    clobber: false
  });
}

export async function createComponent(options) {
  const currentDirectory = process.cwd();
  const componentPath = `${currentDirectory}/${options.componentName}`;
  await mkdir(componentPath);

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates"
  );

  const componentType = options.classComponent
    ? ["classComponent"]
    : options.functionalComponent
    ? ["functionalComponent"]
    : options.containerClassComponent
    ? ["classComponent", "containerComponent"]
    : options.containerFunctionalComponent
    ? ["functionalComponent", "containerComponent"]
    : [];

  try {
    await access(templateDir, fs.constants.R_OK);
    const promises = componentType.map(
      async cType =>
        await copyTemplateFiles(`${templateDir}/${cType}`, componentPath)
    );
    await Promise.all(promises);

    await rename(
      `${componentPath}/componentname.component.js`,
      `${componentPath}/${options.componentName}.component.js`
    );
    await rename(
      `${componentPath}/componentname.scss`,
      `${componentPath}/${options.componentName}.scss`
    );
    await replaceInFiles({
      files: componentPath,
      from: /componentname/g,
      to: options.componentName
    }).pipe({
      from: /componentcssclass/g,
      to: options.componentName.toLowerCase()
    });
  } catch (err) {
    console.error("%s Error creating component", err);
    process.exit(1);
  }
}
