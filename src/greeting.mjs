import { ARG_PREFIX } from "./constans.mjs";
import {  homedir } from 'os';
import { printCurrentDirectory } from "./navigation.mjs";

const greeting = () => {
  let initDirectory = homedir();
  const receivedArg = process.argv.slice(2)[0];
  const userName = receivedArg.startsWith(ARG_PREFIX ) ? receivedArg.slice(ARG_PREFIX.length): null;

  const greeting = `Welcome to the File Manager, ${userName}!`;
  const goodbye = `Thank you for using File Manager, ${userName}, goodbye!`;

  process.stdout.write(`${greeting} \n`);
  printCurrentDirectory(initDirectory);
  
}



export { greeting }