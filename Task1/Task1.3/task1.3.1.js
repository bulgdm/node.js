import readline from 'readline';

export const read = () => readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  .on('line', (line) => {
    const output = line.split('').reverse().join('') + "\n";
    process.stdout.write(output);
  })
  .on('close', () => {
    process.stdout.write('Goodbye!');
    process.exit(0);
  })

  read();