import { homedir, EOL } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { INVALID_INPUT, LS, OS, HASH } from './constans.mjs';
import { printCurrentDirectory, readFilesFromDirectory } from './navigation.mjs';
import { getOsInfo } from './os.mjs';
import getHash from './hash.mjs';

// import { } from './src/fileOperations.js'

const ARG_PREFIX = '--username=';

const app = async () => {
  let userDirname = homedir();

  const receivedArg = process.argv.slice(2)[0];
  const userName = receivedArg.startsWith(ARG_PREFIX) ? receivedArg.slice(ARG_PREFIX.length): null;

  const greeting = `Welcome to the File Manager, ${userName}!`;
  const goodbye = `Thank you for using File Manager, ${userName}, goodbye!`;

  process.stdout.write(`${greeting} \n`);
  process.stdin.on('data', (data) => runOperation(data.toString()));

  const runOperation = async (inputData) => {
    const command = inputData.endsWith(EOL) ? inputData.slice(0, -1).trim() : inputData.trim();

    switch (true) {
      case command === LS: readFilesFromDirectory(userDirname);
      break;

      case command.startsWith(`${OS} --`): getOsInfo(command);
      break;

      case command.startsWith(HASH): await getHash(command);
      break;

      default: console.log(INVALID_INPUT);
      break;
    } 

    printCurrentDirectory(userDirname);

  }

  

  process.on('exit', () => process.stdout.write(`${goodbye} \n`));
}
export default app;