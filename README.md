    ██████╗ ██╗     ██╗███████╗███████╗ ██████╗██╗     ███████╗
    ██╔══██╗██║     ██║╚══███╔╝╚══███╔╝██╔════╝██║     ██╔════╝
    ██████╔╝██║     ██║  ███╔╝   ███╔╝ ██║     ██║     █████╗  
    ██╔══██╗██║     ██║ ███╔╝   ███╔╝  ██║     ██║     ██╔══╝  
    ██████╔╝███████╗██║███████╗███████╗╚██████╗███████╗███████╗
    ╚═════╝ ╚══════╝╚═╝╚══════╝╚══════╝ ╚═════╝╚══════╝╚══════╝

A fully, sophisticated, elegent, clean way to access ❄Blizzard Entertainment❄ articles.

# Prerequisite

- Nodejs `(>=8)`

- Active Internet connection

# Installation

This package is under npm, just use the command below to install it:

 >npm install --save blizzcle

Or install withour dev dependencies:

 >npm install --save --production blizzcle 

There is also a global command package as well, install it via:

 >npm install -g blizzcle

# API Documentation 

The interface for blizzcle is using promise-then architecture:

    const Blizzcle = require('blizzcle')
    const blizzcle = new Blizzcle({...options})

## Options

| Key name | Type  | Default Value  | Descrption |
|---|---|---|---|
| `filename`  |   |   |   |
| `game`  |   |   |   |
| `langage`  |   |   |   |
| `maxCount`  |   |   |   |

    this.verbose = typeof options.verbose === 'undefined' ? false : options.verbose;
    this.maxCount = typeof options.maxCount === 'undefined' ? 0 : parseInt(options.maxCount);
    this.filename = typeof options.filename === 'undefined' ? 'blizz' : options.filename;
    this.game = typeof options.game === 'undefined' ? 'heroes-of-the-storm' : options.game.toLowerCase();
    this.language = typeof options.language === 'undefined' ? 'en-us' : options.language.toLowerCase();
  