# unfurl.run website

The `unfurl` folder contains an unfurl project with an ensemble that will deploy a local copy of the site. 

To update /docs directory, in your unfurl development directory,
rebuild all docs with `tox -e docs -- -E -a` then copy the docs files: ```cp -R .tox/docs/html/* /path/to/unfurl_site/docs```

## Release

JEKYLL_ENV=production bundle exec jekyll build -d _release

## Notes on the console examples

1. Install [TermRecord](https://github.com/theonewolf/TermRecord), eg. `pip install TermRecord` and `ttyrec` if missing (e.g. `brew install ttyrec`)

2. `PROMPT_COMMAND= ttyrec -a session.ttyrec`

3. use the forked version of TermRecord's main script found at `unfurl/TermRecord.py`
`python unfurl/TermRecord.py --js -s session.ttyrec -o /tmp/example-session.js`
