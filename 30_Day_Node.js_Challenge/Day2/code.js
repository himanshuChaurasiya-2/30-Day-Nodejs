const fs = require('fs').promises;

async function writeToFile(filePath, content) {

    try {

        await fs.writeFile(filePath, content,"utf-8");
        console.log(`\nData written to ${filePath}\n`);

    } catch (err) {

        if (err.code === 'ENOENT') {
            console.error(`\nError writing to file: ${err.code} - ${err.message}\n`);
        } else {
            console.error(`\nUnexpected error occured : ${err.message}\n`);
        }

    }

}

const path1 = 'test-files/output1.txt';
const path2 = 'test-files/nonexistent-folder/output.txt';

(async () => {
    await writeToFile(path1, 'Sample content.');

    await writeToFile(path2, 'Content in a non-existent folder.');
})();
