    ██████╗ ██╗     ██╗███████╗███████╗ ██████╗██╗     ███████╗
    ██╔══██╗██║     ██║╚══███╔╝╚══███╔╝██╔════╝██║     ██╔════╝
    ██████╔╝██║     ██║  ███╔╝   ███╔╝ ██║     ██║     █████╗  
    ██╔══██╗██║     ██║ ███╔╝   ███╔╝  ██║     ██║     ██╔══╝  
    ██████╔╝███████╗██║███████╗███████╗╚██████╗███████╗███████╗
    ╚═════╝ ╚══════╝╚═╝╚══════╝╚══════╝ ╚═════╝╚══════╝╚══════╝

A fully, sophisticated, elegent, clean way to access ❄Blizzard Entertainment❄ articles.

# ❄Prerequisite❄

- Nodejs `(>=8)`

- Active Internet connection

# ❄Installation❄

This package is under npm, just use the command below to install it:

 >npm install --save blizzcle

Or install withour dev dependencies:

 >npm install --save --production blizzcle 

# ❄Command Line Interface❄

This package also contains a command line interface, install it via:

 >npm install -g blizzcle

 A capture of the command help menu:

```
Usage: blizzcle [options]

A command line interface tool to gather articles from Blizzard!

Options:
  -V, --version        output the version number
  -v, --verbose        Show verbose (debug) message
  -d, --detail         Get the details for all articles (requires more HTTP request).
  -c, --count [n]      The maximun count for the articles to be parsed. 0 to be all. (default: 20)
  -g, --game [game]    Name of the game. (All for invalid name) (default: "heroes-of-the-storm")
  -o, --output <file>  Set the output file path to be saved to. (Detect .json/.html)
  -t, --type <type>    Override the output data type from -o. [json | html]
  --language [lang]    The language of the articles. (default: "en-us")
  --rawdata            Save the un-parsed data to JSON object (must have -d switch)
  --eval <code>        Eval a JS code, "data" as result variable. (default: "console.log(data)")
  -h, --help           output usage information
```

# ❄API Documentation❄

The interface for blizzcle is using promise-then architecture:

    const Blizzcle = require('blizzcle')
    const blizzcle = new Blizzcle({...options})

## `{...options}`

| Key name | Type  | Default Value  | Descrption |
|---|---|---|---|
`count` | `Number` | `0` | Set the number of articles to be fetched (0 to be all) |
`detail` | `Boolean` | `false` | Set whether to fetch the details of each article, will greatly increase internet bandwidth |
`filename` | `String` | `undefined` | Set the filename to be stored |
`filetype` | `String` | `undefined` | Set the filetype to be stored (`json` or `html`), this will override the detection in `filename` |
`game` | `String` | `"heroes-of-the-storm"` | Set the articles of the game name (slug) to be fetched |
`language` | `String` | `"en-us"` | Set the language to be fetched |
`rawdata` | `Boolean` | `false` | Set whether to be also include the raw data from Blizzard article API |

## `blizzcle.get()`

This method can fetch the data and return to a `Promise`

```
const blizzcle = new Blizzcle({game: "overwatch", count: 1})
blizzcle.get()
    .then(articles => {
        console.log(articles[0].title)
    })
// Introducing Role Queue
```

## `blizzcle.save()`

This method can fetch the data and save to a file

```
const blizzcle = new Blizzcle({ game: 'world-of-warcraft', count: 2, filename: 'wow.html' });
blizzcle.save()
  .then((filename) => {
    console.log(`Created ${filename}`);
  });
// Created wow.html
```