const { exec } = require("child_process");

async function executeCommand(command) {
  try {
    await exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`\n Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`\n stderr: ${stderr}`);
        return;
      }

      console.log(stdout);
    });
  } catch (err) {}
}

async function execute() {
  await executeCommand("ls -la");
  await executeCommand('echo "Hello, Node.js!"');
}

execute();
