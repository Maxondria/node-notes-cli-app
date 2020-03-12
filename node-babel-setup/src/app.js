import { command, version, argv } from "yargs";

version("1.0.0");

command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title", //--title = 'Some damn title',
      demandOption: true, // Force arg to be provided
      type: "string"
    }
  },
  handler(argv) {
    // Can now manipulate argv array to find 'title'
    console.log("Adding a new note indeed!", argv);
  }
});

console.log(argv);
