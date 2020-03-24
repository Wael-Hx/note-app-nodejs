const fs = require("fs");

let note = { title: process.argv[3], body: process.argv[4] };
let list = [];
let command = process.argv[2];
command ? command= command.toString() : command ;

if (command === "add") {
  if (!process.argv[4]) {
    console.log('note cannot be empty , type "node app.js help"');
  } else {
    list = [...list, note];
    list = [...list, ...JSON.parse(fs.readFileSync("notes.json"))];
    fs.writeFileSync("notes.json", JSON.stringify(list));
    console.log("note added");
  }
} else if (command === "list") {
  let noteList = JSON.parse(fs.readFileSync("notes.json"));
  if (noteList.length === 0) {
    console.log("your note list is empty :(");
  } else {
    noteList.forEach((e, i) => {
      console.log(i + 1 + " " + e.title + ":" + " " + e.body, "\n");
    });
  }
} else if (command === "reset") {
  list = [];
  fs.writeFileSync("notes.json", JSON.stringify(list));
  console.log("note list cleared");
} else if (command === "remove") {
  const index = Number(process.argv[3]);
  if (!process.argv[3] || !Number(process.argv[3].toString())) {
    console.log("you must provide the note index after the command");
  } else {
    let noteList = JSON.parse(fs.readFileSync("notes.json"));
    noteList = noteList.filter((note, i) => {
      return i !== index - 1;
    });
    console.log("note number: " + index + " was removed");
    fs.writeFileSync("notes.json", JSON.stringify(noteList));
  }
} else if (command === "help") {
  console.log(
    "\n",
    'to add a note type: "node app.js add "TITLE" "BODY" ',
    "\n",
    "---------------------------------------------",
    "\n",
    'to show your notes type: "node app.js list"',
    "\n",
    "---------------------------------------------",
    "\n",
    'to remove a note type: "node app.js remove [IndexOfNote]"',
    "\n",
    "---------------------------------------------",
    "\n",
    'to clear all notes type: "node app.js reset"',
    "\n"
  );
}else if (command==undefined)  {
  console.log('to get the command list type: node app.js help '); 


}else {
  console.log('unkonwn command please type "node app.js help "');
}
