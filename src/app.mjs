import { greeting } from './greeting.mjs';
import runOperation from './operations.mjs';

const app = async () => {
  greeting();
  process.stdin.on('data', (data) => runOperation (data.toString()));
  process.on('exit', () => process.stdout.write(`${goodbye} \n`));
}
export default app;