const fs = require("fs");
const chalk = require("chalk");

const getNotes = function() {
  console.log(chalk.green.inverse("Your Notes..."));
  const notes = loadNotes();
  notes.forEach(note => console.log("- ", note.title));
};

const addNote = (title, body) => {
  const notes = loadNotes();

  if (!notes.find(note => note.title === title)) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note Added successfully!"));
  } else {
    console.log(chalk.red.inverse("Can't save duplicate note!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  saveNotes(notes.filter(note => note.title !== title));
  console.log(chalk.green.inverse("Note Removed successfully!"));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (!note) {
    console.log(chalk.red.inverse("Can't find note!"));
  } else {
    console.log(chalk.green.inverse("Title: "));
    console.log(" - " + note.title);
    console.log(chalk.green.inverse("Body: "));
    console.log(" - " + note.body);
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes, addNote, removeNote, readNote };
