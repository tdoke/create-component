const arg = require("arg");
const { createComponent } = require("./main");

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--cc": Boolean,
      "--fc": Boolean,
      "--cntfc": Boolean,
      "--cntcc": Boolean,
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    classComponent: args["--cc"] || false,
    functionalComponent: args["--fc"] || false,
    containerFunctionalComponent: args["--cntfc"] || false,
    containerClassComponent: args["--cntcc"] || false,
    componentName: args._[0]
  };
}
 
async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await createComponent(options);
}

module.exports = { cli };
