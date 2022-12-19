import {  EOL, homedir } from 'os';
import { INVALID_INPUT, LS, OS, HASH, COMPRESS, DECOMPRESS, UP, CD, RM, ADD, CAT, RN, CP, MV, EXIT } from './constans.mjs';
import { readFilesFromDirectory, goToUp, goToFolder } from './navigation.mjs';
import { getOsInfo } from './os.mjs';
import getHash from './hash.mjs';
import { compress, decompress } from './compress.mjs';
import { addFile, renameFile, moveFile, deleteFile, readFile, copyFile} from './filesOperations.js';
import { printCurrentDirectory } from './utils.mjs';

let userDirectory = homedir();

const runOperation = async (inputData) => {
  const command = inputData.endsWith(EOL) ? inputData.slice(0, -1).trim() : inputData.trim();

  switch (true) {
    case command === EXIT: process.exit();
    break;

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

    case command.startsWith(CP): await copyFile(command);
    break;

    case command.startsWith(MV): await moveFile(command);
    break;

    case command.startsWith(ADD): await addFile(command, userDirectory);
    break;

    case command.startsWith(RN): await renameFile(command);
    break;

    default: console.log(INVALID_INPUT);
    break;
  } 

  printCurrentDirectory(userDirectory);

}

export default runOperation;