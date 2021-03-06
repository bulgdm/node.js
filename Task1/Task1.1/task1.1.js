/* Write a program which reads a string from the standard input stdin, reverses it and then writes it to
the standard output stdout. */

const readline = require('readline');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

read
  .on('line', (line) => {
    const output = line.split('').reverse().join('') + "\n";
    process.stdout.write(output);
  })
  .on('close', () => {
    process.stdout.write('Goodbye!');
    process.exit(0);
  })