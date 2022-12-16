
import { open, rm, rename, access } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { OPERATION_ERROR } from './constans.mjs';
import { getPathesFromCommand } from './utils.mjs';

const addFile = async (command, directory) => {
  const fileName = getPathesFromCommand(command)[0];
  const pathToFile = path.join(directory, fileName);
  try {
      await open(pathToFile, 'wx');
      console.log('File created');
  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const readFile = async (command) => {
  const pathToFile = getPathesFromCommand(command)[0];
  try {
    const input = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
    const output = process.stdout;
    await pipeline(input, output);

    //console.log('you are')
   // await new Promise(stream.pipe(process.stdout));
   //stream.exit();

  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const renameFile = async (command) => {
  const pathes = getPathesFromCommand(command);
  const [pathToFile, newName] = pathes;
  const newPathToFile = path.join(path.dirname(pathToFile), newName);
  if (await checkAccessFile(newPathToFile)) {
    try {
      await rename(pathToFile, newPathToFile);
      console.log('File renamed');
    } catch (error) {
      console.log(OPERATION_ERROR, error.message);
    }
  } else console.log('File exists. Enter another name');
};

const copyFile = async (command) => {
  const pathes = getPathesFromCommand(command);
  const [pathToFile, pathToNewDirectory] = pathes;
  const pathToNewFile = path.join(pathToNewDirectory, path.basename(pathToFile));
    try {
        const input = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
        const output= fs.createWriteStream(pathToNewFile);
        await pipeline(input, output);
        console.log('File copied');
      } catch (error) {
          console.log(OPERATION_ERROR, error.message)
      };
};

const moveFile = async (command) => {
 await copyFile(command);
 await deleteFile(command);
};

const deleteFile = async (command) => {
  const pathToFile = getPathesFromCommand(command)[0];
  try {
    await rm(pathToFile);
    console.log('File deleted');
  } catch (error) {
    console.log(OPERATION_ERROR, error.message)
  };
};

const checkAccessFile = async(path) => {
  let isAccess;
  try {
    await access(path)
    isAccess = false;
  } catch (error) {
    isAccess = true;
  }
  return isAccess;
};

export {
  addFile,
  renameFile,
  readFile,
  copyFile,
  moveFile,
  deleteFile }