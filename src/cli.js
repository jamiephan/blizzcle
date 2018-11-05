#!/usr/bin/env node
const BlizzBlog = require('./index');
const program = require('commander');

program
  .version(require('../package.json').version)
  .name('blizzblog')
  .description('A command line interface tool to gather articles from Blizzard!')
  .option('-v, --verbose', 'Show Verbose message')
  .option('-s, --stdout', 'Output the result to STDOUT instead. (Will ignore -o.)')
  .option('-l, --language [lang]', 'The language of the articles.', 'en-us')
  .option('-c, --max-count [n]', 'The Maximun count for the articles to be parsed. 0 to be all.', Math.floor, 0)
  .option(
    `-g, --game [game]', 'The game's name. All invalid game name will be act as "All" news.`,
    'heroes-of-the-storm'
  )
  .option('-o, --output <file>', 'Set the output file path to be saved to.')
  .parse(process.argv);

if (!program.output && !program.stdout) {
  program.help();
}

const Blog = new blogAPI({
  verbose: program.verbose,
  maxCount: program.maxCount,
  filename: program.output,
  game: program.game,
  language: program.language,
});

if (!program.stdout) {
  Blog.saveJSON()
    .then(console.log)
    .catch(console.error);
} else {
  Blog.get()
    .then(console.log)
    .catch(console.error);
}
