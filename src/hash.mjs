import { promises as fs } from 'fs';
import { OPERATION_ERROR } from "./constans.mjs";
import { getPathFromCommand } from "./utils.mjs";
const { createHash } = await import('crypto');

const getHash = async (command) => {
  const pathToFile = getPathFromCommand(command);
  try {
    const textForHash = await fs.readFile(pathToFile);
    const hash = createHash('sha256')
      .update(textForHash)
      .digest('hex');
    console.log(hash);

  } catch (error) {
    console.log(OPERATION_ERROR, error.message);
  };
};

export default getHash;