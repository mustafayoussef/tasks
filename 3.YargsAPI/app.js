const yargs = require("yargs");
const api = require("./functions");
yargs.command({
  command: "api",
  describe: "Call API",
  builder: {
    search: { demandOption: true, type: "string" },
  },
  handler: function (argv) {
    api.getApi(argv.search, (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
  },
});
yargs.argv;
