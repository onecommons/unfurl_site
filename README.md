# unfurl.run website

The `.unfurl` folder contains an Unfurl project with an ensemble that will deploy a local copy of the site. 

## Release

1. Make sure the repository is clean.
2. rm -rf _release
3. JEKYLL_ENV=production bundle exec jekyll build -d _release
4. unfurl deploy --force --instance website_bucket

## Notes on the console examples

1. Install [TermRecord](https://github.com/theonewolf/TermRecord), eg. `pip install TermRecord` and `ttyrec` if missing (e.g. `brew install ttyrec`)

2. `PROMPT_COMMAND= ttyrec -a session.ttyrec`

3. use the forked version of TermRecord's main script found at `unfurl/TermRecord.py`
`python unfurl/TermRecord.py --js -s session.ttyrec -o /tmp/example-session.js`
