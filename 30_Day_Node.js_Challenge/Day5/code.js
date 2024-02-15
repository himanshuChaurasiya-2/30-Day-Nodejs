const fs = require("fs");
const path = require("path");

function checkFileExtension(filePath, expectedExtension) {
  if (!fs.existsSync(filePath)) {
    console.log("File does not exist.\n");
    return;
  }

  const actualExtension = path.extname(filePath);

  if (actualExtension === expectedExtension) {
    console.log(`\nFile has the expected extension: ${expectedExtension} \n`);
  } else {
    console.log(
      `File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension} \n`
    );
  }
}

checkFileExtension("test-files/file1.txt", ".txt");

checkFileExtension("test-files/image.png", ".jpg");

checkFileExtension("nonexistent-file.txt", ".txt");
