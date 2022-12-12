import { OPERATION_ERROR } from "./constans.mjs";
import { getPathFromCommand } from "./navigation.mjs";
//import from 
const getHash = (command) => {
  const pathToFile = getPathFromCommand(command);
  const { createHash } = await import('crypto');
  try {

    console.log('command', command);

  } catch (error) {
    console.log(OPERATION_ERROR, error);
  }
}

export default getHash;