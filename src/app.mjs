import { homedir, EOL } from 'os';
//import path from 'path';
import { fileURLToPath } from 'url';
import { INVALID_INPUT, LS, OS, HASH, COMPRESS, DECOMPRESS, UP, CD, RM, ADD, CAT } from './constans.mjs';
import { printCurrentDirectory, readFilesFromDirectory, goToUp, goToFolder } from './navigation.mjs';
import { getOsInfo } from './os.mjs';
import getHash from './hash.mjs';
import { compress, decompress } from './compress.mjs';
import { addFile, deleteFile, readFile } from './filesOperations.js';


const ARG_PREFIX = '--username=';

const app = async () => {
  let userDirectory = homedir();

  const receivedArg = process.argv.slice(2)[0];
  const userName = receivedArg.startsWith(ARG_PREFIX) ? receivedArg.slice(ARG_PREFIX.length): null;

  const greeting = `Welcome to the File Manager, ${userName}!`;
  const goodbye = `Thank you for using File Manager, ${userName}, goodbye!`;

  process.stdout.write(`${greeting} \n`);
  process.stdin.on('data', (data) => runOperation(data.toString()));

  const runOperation = async (inputData) => {
    const command = inputData.endsWith(EOL) ? inputData.slice(0, -1).trim() : inputData.trim();

    switch (true) {
      case command === UP: userDirectory = goToUp(userDirectory);
      break;

      case command.startsWith(CD): userDirectory = await goToFolder(command) || userDirectory;
      break;

      case command === LS: await readFilesFromDirectory(userDirectory);
      break;

      case command.startsWith(`${OS} --`): getOsInfo(command);
      break;

      case command.startsWith(HASH): await getHash(command);
      break;

      case command.startsWith(COMPRESS): await compress(command);
      break;

      case command.startsWith(DECOMPRESS): await decompress(command);
      break;

      case command.startsWith(CAT): await readFile(command);
      break;
      
      case command.startsWith(RM): await deleteFile(command);
      break;

      case command.startsWith(ADD): await addFile(command, userDirectory);
      break;

      default: console.log(INVALID_INPUT);
      break;
    } 

    printCurrentDirectory(userDirectory);

  }

  

  process.on('exit', () => process.stdout.write(`${goodbye} \n`));
}
export default app;