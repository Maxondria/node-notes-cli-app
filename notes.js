const fs = require("fs");
const chalk = require("chalk");

const getNotes = function() {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
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

module.exports = { getNotes, addNote, removeNote };
