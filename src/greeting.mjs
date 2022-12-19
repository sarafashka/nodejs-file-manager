import {  homedir } from 'os';
import { printCurrentDirectory, sayGreeting } from "./utils.mjs";

const greeting = (username) => {
  const initDirectory = homedir();
  process.stdout.write(`${sayGreeting(username)} \n`);
  printCurrentDirectory(initDirectory);
  
}



export { greeting }