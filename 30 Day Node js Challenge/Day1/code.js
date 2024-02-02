const fs = require("fs").promises;

async function readFileContent(filepath) {

  try {

    const content = await fs.readFile(filepath, "utf-8");

    if (content.trim() === "") {
      console.log("\nempty string");
    } else {
      console.log("\n"+content);
    }

  } catch (error) {

    if (error.code === "ENOENT") {
      console.error("\nExpected Output: Error reading file: ENOENT: no such file or directory...\n");
    } else {
      console.error(`\nError occured : ${error.message}\n`);
    }

  }

}

const mainfile = "test-files/file1.txt";
const emptyfile = "test-files/empty-file.txt";
const nofile = "test-files/nonexistent-file.txt";

async function readFile() {

    await readFileContent(mainfile);
    await readFileContent(emptyfile);
    await readFileContent(nofile);

}
readFile();

