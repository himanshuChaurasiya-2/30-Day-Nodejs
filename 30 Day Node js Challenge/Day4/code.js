const path = require("path");

function resolvePath(relativePath) {
  const absPath = path.resolve(__dirname, relativePath);

  console.log(`\nResolved Path: \t ${absPath}\n`);
}

resolvePath("../project/folder/file.txt");
resolvePath("nonexistent-folder/file.txt");
