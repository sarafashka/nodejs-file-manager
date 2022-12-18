import path from 'path';

const url= '"/Users/natalyastepanova/new file.txt"';
const path0 = path.join(url);
const path1 = path.resolve(url);
console.log(path0);
console.log(path1);