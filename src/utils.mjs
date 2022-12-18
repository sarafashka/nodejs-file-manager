import { error } from 'console';
import path from 'path';
import { INVALID_INPUT } from './constans.mjs';

export const printCurrentDirectory = (currentDirecory) => {
  console.log(`You are currently in ${currentDirecory}`);
};

// export const getPathFromCommand = (command) => {
//   let pathToFile = command.slice(command.indexOf(' ')).trim();
//   if (pathToFile.startsWith('\'') || (pathToFile.startsWith('"'))) {
//     pathToFile = pathToFile.slice(1);
//   };
//   if (pathToFile.endsWith('\'') || (pathToFile.endsWith('"'))) {
//     pathToFile = pathToFile.slice(0, -1);
//   }
//  return pathToFile;
// };

export const getPathesFromCommand = (command) => {
  const pathes = command.slice(command.indexOf(' ')).trim();
  const countOfSpaces = [...pathes].filter((item)  => item === ' ').length;
  if (countOfSpaces > 1) {
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
        pathToFile = pathToFile.slice(1);
      };
      if (pathToFile.endsWith('\'') || (pathToFile.endsWith('"'))) {
        pathToFile = pathToFile.slice(0, -1);
      }
     return pathToFile;
    });
    return pathesFormatted;
  }
};