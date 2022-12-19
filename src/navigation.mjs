import path from 'path';
import fs from 'fs/promises';
import { INVALID_INPUT, IN_ROOT_ALERT, OPERATION_ERROR } from './constans.mjs';
import { getPathesFromCommand } from './utils.mjs';

const goToUp = (directory) => {
  const countOfSeparators = directory.split('').filter((char) => char === path.sep).length;
  const indexOfRootSeparator = directory.indexOf(path.sep);
  let newDirectory = directory;
  if (countOfSeparators > 1) {
    newDirectory = directory.slice(0, directory.lastIndexOf(path.sep));
  } else if (directory[indexOfRootSeparator + 1]) {
    newDirectory = directory.slice(0, directory.lastIndexOf(path.sep) +1);
  } else {
       console.log(IN_ROOT_ALERT);
    };
  return newDirectory;
};

const goToFolder = async (command) => {
  try {
    const pathDestination = getPathesFromCommand(command)[0];
    await fs.readdir(pathDestination);
    return pathDestination;
  } catch (error) {
    console.log(INVALID_INPUT, error.message)
  };
};

const readFilesFromDirectory = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    const filesInDirectory = await Promise.all(files.map(async (file) => {
      const name = path.basename(file);
      let type = '???';
      try {
        const stats = await fs.stat(path.join(directory, file));
        type = stats.isFile() ? 'file' : 'directory';
        } catch (error) {   
        } finally { 
          return {
            name: name,
            type: type,
          };
         };
    }));
  console.table(sortFilesDisplay(filesInDirectory));
  } catch (error) {
    console.log(OPERATION_ERROR, error.message);
  };
};

const sortFilesDisplay = (files) => {
  return files.sort((a, b) => {
    const DIR = 'directory'
    if (a.type === DIR && b.type !== DIR){
      return -1;
    }
     if (a.type !== DIR && b.type === DIR){
      return 1;
    }
     return a.name.localeCompare(b.name);
  });
};

export {
  goToUp,
  goToFolder,
  readFilesFromDirectory,
};