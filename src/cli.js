import arg from "arg";
import { createComponent } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--cc": Boolean,
      "--fc": Boolean,
      "--cntc": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    classComponent: args["--cc"] || false,
    functionalComponent: args["--fc"] || false,
    containerComponent: args["--cntc"] || false,
    componentName: args._[0]
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await createComponent(options);
}
