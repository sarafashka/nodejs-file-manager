import path from 'path';
import fs from 'fs/promises';

const readFilesFromDirectory = async (directory) => {
  const files = await fs.readdir(directory);
  const filesInDirectory = await Promise.all(files.map(async (file) => {
    const name = path.basename(file);
    const stats = await fs.stat(path.join(directory, file));
    const type = stats.isFile() ? 'file' : 'directory';

    return {
      name: name,
      type: type,
    }
  }));
  console.table(sortFilesDisplay(filesInDirectory));

}

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

const printCurrentDirectory = (currentDirecory) => {
  console.log(`You are currently in ${currentDirecory}`);
};

const getPathFromCommand = (command) => command.slice(command.indexOf(' ')).trim();

export { 
  readFilesFromDirectory,
  printCurrentDirectory,
  getPathFromCommand,
};