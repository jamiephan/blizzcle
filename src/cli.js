#!/usr/bin/env node

const program = require('commander');
const Blizzcle = require('./index');

program
  .version(require('../package.json').version)
  .name('blizzcle')
  .description('A command line interface tool to gather articles from Blizzard! (either -s or - )')
  .option('-v, --verbose', 'Show verbose (debug) message')
  .option('-d, --detail', 'Get the details for all articles (requires more HTTP request).', false)
  .option('-c, --count [n]', 'The maximun count for the articles to be parsed. 0 to be all.', parseInt, 20)
  .option('-g, --game [game]', 'Name of the game. (All for invalid name)', 'heroes-of-the-storm')
  .option('-o, --output <file>', 'Set the output file path to be saved to. (Detect .json/.html)')
  .option('-t, --type <type>', 'Override the output data type from -o. [json | html]')
  .option('--language [lang]', 'The language of the articles.', 'en-us')
  .option('--rawdata', 'Save the un-parsed data to JSON object (must have -d switch)', false)
  .option('--eval <code>', 'Eval a JS code, "data" as result variable.', 'console.log(data)')
  .parse(process.argv);

const blizzcle = new Blizzcle({
  verbose: program.verbose,
  count: program.count,
  filename: program.output,
  game: program.game,
  filetype: program.type,
  language: program.language,
  detail: program.detail,
  rawdata: program.rawdata,
});

if (program.output) {
  blizzcle
    .save({
      filename: program.output,
      type: program.type,
    })
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      // eslint-disable-next-line no-eval
      eval(program.eval);
    })
    .catch(console.error);
} else {
  blizzcle
    .get()
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      // eslint-disable-next-line no-eval
      eval(program.eval);
    })
    .catch(console.error);
}
