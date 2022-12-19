import { ARG_PREFIX } from './constans.mjs';
import { greeting } from './greeting.mjs';
import runOperation from './operations.mjs';
import { sayGoodbye } from './utils.mjs';

const app = async () => {
  const receivedArg = process.argv.slice(2)[0];
  const userName = receivedArg.startsWith(ARG_PREFIX) ? receivedArg.slice(ARG_PREFIX.length): null;

  greeting(userName);
  process.stdin.on('data', (data) => runOperation (data.toString()));
  process.on('SIGINT', () => process.exit());
  process.on('exit', () => process.stdout.write(`${sayGoodbye(userName)} \n`));
}
export default app;