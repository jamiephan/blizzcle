#!/usr/bin/env node
const Blizzcle = require('./index');
const program = require('commander');

program
  .version(require('../package.json').version)
  .name('blizzcle')
  .description('A command line interface tool to gather articles from Blizzard! (either -s or - )')
  .option('-v, --verbose', 'Show Verbose message')
  .option('-s, --stdout', 'Output the result to STDOUT instead. (Will ignore -o.)')
  .option('-l, --language [lang]', 'The language of the articles.', 'en-us')
  .option('-d, --detail', 'Get the details for each article (Requires more resource).', false)
  .option('-c, --count [n]', 'The Maximun count for the articles to be parsed. 0 to be all.', parseInt, 0)
  .option('-g, --game [game]', 'Name of the game. (All for invalid name)', 'heroes-of-the-storm')
  .option('-o, --output <file>', 'Set the output file path to be saved to.')
  .option('-t, --type [type]', 'Set the type of the output file', 'json')
  .parse(process.argv);

if (!program.output && !program.stdout) {
  program.help();
}

const blizzcle = new Blizzcle({
  verbose: program.verbose,
  count: program.count,
  filename: program.output,
  game: program.game,
  language: program.language,
  detail: program.detail,
});

if (!program.stdout) {
  blizzcle
    .save({
      filename: program.output,
      type: program.type,
    })
    .then(console.log)
    .catch(console.error);
} else {
  blizzcle
    .get()
    .then(console.log)
    .catch(console.error);
}
