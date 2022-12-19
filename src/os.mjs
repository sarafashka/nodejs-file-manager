import { cpus, homedir, EOL, userInfo, arch } from 'os';
import { CPUS, HOMEDIR, EOL_SYMBOL, USERNAME, ARCHITECTURE, INVALID_INPUT } from './constans.mjs';

const getOsInfo = (command) => {
  const commandWithoutPrefix = command.slice(5);
  switch(commandWithoutPrefix) {
    case HOMEDIR: getHomedir();
    break;
    case CPUS: getCpus();
    break;
    case EOL_SYMBOL: getEOLSymbol();
    break;
    case USERNAME: getUsername();
    break;
    case ARCHITECTURE: getArch();
    break;
    default: console.log(INVALID_INPUT);
  };
};

const getHomedir = () => {
  console.log(`Your homedir is: ${homedir()}`);
};

const getCpus= () => {
  const cpusInfo = cpus();
  const countOfCpus = cpusInfo.length;
  const cpusInfoFormatted = cpusInfo.map((item) => { 
    return {
      Model: item.model,
      Clock_rate: `${item.speed / 1000} GHz`,
    };
  });
  console.log(`CPUs count: ${countOfCpus}`);
  console.table(cpusInfoFormatted);
};

const getEOLSymbol = () => {
  console.log(`Your symbol end of line is: ${JSON.stringify(EOL)}`);
} ;

const getUsername = () => {
  console.log(`Your username is: ${userInfo().username}`);
};

const getArch = () => {
  console.log(`Your architecture is: ${ arch() }`);
};

export { getOsInfo };