const csv = require('csvtojson');
const fs = require('fs');

const HOME = './Task1.2';
const readFilePath = HOME + '/csv/example.csv';
const writeFilePath = HOME + '/txt/example.txt';

// clear the output file
fs.writeFileSync(writeFilePath, '');

csv()
  .fromFile(readFilePath)
  .subscribe((data) => {
    fs.appendFileSync(writeFilePath, JSON.stringify(data) + "\n", 'utf8');
    // console.log(JSON.stringify(data));
  })
  .on('error', (err) => {
    console.log(err)
  })
