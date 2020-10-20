# unfurl.run website

The `unfurl` folder contains an unfurl project with an ensemble that will deploy a local copy of the site. 

## Notes on the console examples

1. Install [TermRecord](https://github.com/theonewolf/TermRecord), eg. `pip install TermRecord`

2. Create a simple jinj2 template that looks like:
```
var termData = {{ json }};
```

3. Record your session:

`TermRecord -o /tmp/example-session.js -m $HOME/_dev/uprojects/live/termdata.js.j2`
