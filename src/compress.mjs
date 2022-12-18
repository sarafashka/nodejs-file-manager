import { getPathesFromCommand } from "./utils.mjs";
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { INVALID_INPUT, OPERATION_ERROR } from "./constans.mjs";

const compress = async(command) => {
  try {
    const [pathToFile, pathToDestination] = getPathesFromCommand(command);
    if (!pathToDestination.includes('.br')) {
      console.log(INVALID_INPUT, 'Path to destination should exist path to file with extension ".br"');
    } else {
      const input = fs.createReadStream(pathToFile);
      const output = fs.createWriteStream(pathToDestination);
      const brotli = zlib.createBrotliCompress();
      console.log('Start compressing...');

      await pipeline(input, brotli, output);
      console.log('Finish compressing'); 
    }
    } catch (error) {
      console.log(OPERATION_ERROR, error.message);
  
  };
};

const decompress = async(command) => {
  const [pathToFile, pathToDestination] = getPathesFromCommand(command);
  if (!pathToDestination.includes('.')) {
    console.log(INVALID_INPUT, 'Path to destination should exist path to file');
  } else {
    try {
    const input = fs.createReadStream(pathToFile);
      const output = fs.createWriteStream(pathToDestination);
      const brotli = zlib.createBrotliDecompress();
      console.log('Start decompressing...');
      await pipeline(input, brotli, output);
      console.log('Finish decompressing'); 
    } catch (error) {
      console.log(OPERATION_ERROR, error.message);
    }
  };
};

export { compress, decompress }