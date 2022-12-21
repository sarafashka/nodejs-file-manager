
import { open, rm, rename, access } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { OPERATION_ERROR } from './constans.mjs';
import { checkAccess, getPathesFromCommand, printCurrentDirectory } from './utils.mjs';

const addFile = async (command, directory) => {
  try {
    const fileName = getPathesFromCommand(command)[0];
    const pathToFile = path.join(directory, fileName);

    await open(pathToFile, 'wx');
    console.log('File created');

  } catch (error) {
    console.log(OPERATION_ERROR, error.message)
  };
};

const readFile = async (command, directory) => {
  try {
    const pathToFile = getPathesFromCommand(command, directory)[0];
    if (await checkAccess(pathToFile)) {
      let data = '';
      const input = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
      //await pipeline(input, process.stdout);
    
      input.on('data', (chunk) => { data += chunk});
      input.on('end', () => { 
        console.log(data);
        printCurrentDirectory(directory);
      });
    } else throw new Error(error);
   
  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const renameFile = async (command, directory) => {
  try {
    const pathes = getPathesFromCommand(command, directory);
    const [pathToFile, newName] = pathes;
    const newPathToFile = path.join(path.dirname(pathToFile), newName);
    if (await checkAccess(newPathToFile)) {
      console.log('File exists. Enter another name'); 
    } else {
      await rename(pathToFile, newPathToFile);
      console.log('File renamed');
    }
  } catch (error) {
      console.log(OPERATION_ERROR, error.message);
  }
};

const copyFile = async (command, directory) => {
  try {
      const pathes = getPathesFromCommand(command, directory);
      const [pathToFile, pathToNewDirectory] = pathes;
      const pathToNewFile = path.join(pathToNewDirectory, path.basename(pathToFile));

      const input = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
      const output= fs.createWriteStream(pathToNewFile);
      await pipeline(input, output);
      console.log('File copied');
  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const moveFile = async (command, directory) => {
 await copyFile(command, directory);
 await deleteFile(command, directory);
};

const deleteFile = async (command, directory) => {
  try {
    const pathToFile = getPathesFromCommand(command, directory)[0];
    await rm(pathToFile);
    console.log('File deleted');
  } catch (error) {
    console.log(OPERATION_ERROR, error.message)
  };
};

export {
  addFile,
  renameFile,
  readFile,
  copyFile,
  moveFile,
  deleteFile }