/* Write a program which reads a string from the standard input stdin, reverses it and then writes it to
the standard output stdout. */

const readline = require('readline');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

read
  .on('line', (line) => {
    console.log(line.split('').reverse().join(''));
    console.log();
  })
  .on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
  })