
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
  const pathes = command.slice(command.indexOf(' ')).trim().split(` `);
  const pathesFormatted = pathes.map((pathToFile) => {
    if (pathToFile.startsWith('\'') || (pathToFile.startsWith('"'))) {
      pathToFile = pathToFile.slice(1);
    };
    if (pathToFile.endsWith('\'') || (pathToFile.endsWith('"'))) {
      pathToFile = pathToFile.slice(0, -1);
    }
   return pathToFile;
  });
  return pathesFormatted;
};