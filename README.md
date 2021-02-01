# netflix meets csfd

the goal: explore netflix titles augmented with csfd rating

## install

1. `npm install`
2. add `API_KEY` to your `.env`

## run

`npm start` runs the API `/csfd/search?term=xxx&api_key=xyz` and the bookmarklet script under
`/csfd/js?api_key=xyz`. use the `misc/bookmarklet.txt` snippet as a bookmarklet in your browser.

## deploy

deploy to heroku

1. `heroku login -i`
2. `heroku create`
3. add your `API_KEY` to the heroku app ENV
4. `git push heroku master`

