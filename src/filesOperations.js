
import { open, rm } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { ppid, stdout } from 'process';
import { pipeline } from 'stream/promises';
import { OPERATION_ERROR } from './constans.mjs';
import { getPathFromCommand } from './navigation.mjs';
  // copy() {}
  // move() {}
const addFile = async (command, directory) => {
  const fileName = getPathFromCommand(command);
  const pathToFile = path.join(directory, fileName);
  try {
      await open(pathToFile, 'wx');
      console.log('File created');
  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const readFile = async (command) => {
  const pathToFile = getPathFromCommand(command);
  try {
    const stream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
    await pipeline(stream, process.stdout).closed;
    //console.log('you are')
   // await new Promise(stream.pipe(process.stdout));
   //stream.exit();

  } catch (error) {
      console.log(OPERATION_ERROR, error.message)
  };
};

const renameFile = (command) => {

}

 const deleteFile = async (command) => {
  const pathToFile = getPathFromCommand(command);
  try {
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
  deleteFile }