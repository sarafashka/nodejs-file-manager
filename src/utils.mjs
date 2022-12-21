import { error } from 'console';
import { INVALID_INPUT } from './constans.mjs';
import path from 'path';
import { access } from 'fs/promises';

export const printCurrentDirectory = (currentDirectory) => {
  console.log(`You are currently in ${currentDirectory}`);
};

export const sayGreeting = (username) => `Welcome to the File Manager, ${username}!`; 

export const sayGoodbye = (username) => `\nThank you for using File Manager, ${username}, goodbye!`;

export const checkAccess = async(path) => {
  let isAccess;
  try {
    await access(path)
    isAccess = true;
  } catch (error) {
    isAccess = false;
  }
  return isAccess;
};

export const getPathesFromCommand = (command, directory) => {
  const pathes = command.slice(command.indexOf(' ')).trim();
  const countOfSpaces = [...pathes].filter((item)  => item === ' ').length;
  if (countOfSpaces > 1 && !(pathes.startsWith('"') || pathes.startsWith('\''))) {
    console.log(INVALID_INPUT, "You should enter path with quotes");
    return error;
  } else {
    let pathesSeparated;
    let quotes;
    if (command.includes(' \'')) {
      pathesSeparated = pathes.split(` \'`);
      quotes = '\'';
    } else if (command.includes(' "')) {
      pathesSeparated = pathes.split(` "`);
      quotes = '"';
    } else {
      pathesSeparated = pathes.split(` `);
    }

    const pathesFormatted = pathesSeparated.map((pathToFile) => {
      if (pathToFile.startsWith('\'') || (pathToFile.startsWith('"'))) {
        pathToFile = pathToFile.trim().slice(1);
      };
      if (pathToFile.endsWith('\'') || (pathToFile.endsWith('"'))) {
        pathToFile = pathToFile.trim().slice(0, -1);
      }
      pathToFile = path.resolve(directory, path.normalize(pathToFile));
      return pathToFile;
    });
    return pathesFormatted;
  }
};
