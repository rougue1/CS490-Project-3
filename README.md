# CS490-Project-3

# Flask and create-react-app

## Requirements

1. `npm install`
2. `npm audit fix` (if necessary)
3. `pip install -r requirements.txt`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

## Formatting/Linting

### JS

- Formatted using prettier (check .prettierrc.json). Linted using ESLint, following Airbnb style (linter options: fix problems and enforce codestyle) (check .eslintrc.js).
- Linter ignores:
  - `react/no-unused-prop-types`: Error happened in `src/App.js`, prop setLoginStatus was used in a different file so had to add to ignore.
  - `import/no-extraneous-dependencies`: Weird error when importing bootstrap.
  - `react/jsx-filename-extension`: Weird error when writing html code in a return statement.
  - `no-restricted-globals`: Couldn't use event variable in addview.js
  - `control-has-associated-label`: Couldn't just have a tag without the "label" tag along with it.
  - Miscellaneous errors which couldn't be fixed (couldn't find any working solutions - even online):  
    - `no-noninteractive-element-interactions`
    - `click-events-have-key-events`
    - `no-static-element-interactions`
    - `anchor-is-valid`
    - `jsx-a11y/control-has-associated-label`
    - `jsx-a11y/no-noninteractive-element-interactions`
    - `jsx-a11y/click-events-have-key-events`
    - `jsx-a11y/no-static-element-interactions`
    - `jsx-a11y/anchor-is-valid`

### Python

- Formatted using yapf formatter (yapf -i). Checkout `yapf_formatter.py`. Linted using pylint (ignores added to individual files).
- Linter ignores:
  - `global-statement`: Unable to avoid using global variable to set the current user in app.py
  - `cyclic-import`: Not sure how to import DB variable from app and while also importing db_api within app.
  - `invalid-envvar-default`: Not sure why this was an error. Using normal convention of geting env vars (within app.py).
  - `unsubscriptable-object`: Miscellaneous error when specifying return type of function for ease.
  - `too-many-arguments`: Unavoidable since we _need_ to pass those many variables into the editTransaction function.
  - `wildcard-import`: Some weird error in C9.
