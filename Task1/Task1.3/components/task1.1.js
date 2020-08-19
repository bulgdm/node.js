const readline = require('readline');

export const read = () => readline
  .createInterface({
    input: process.stdin,
    output: process.stdout
  })
  .on('line', (line) => {
    console.log(line.split('').reverse().join(''));
    console.log();
  })
  .on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
  })