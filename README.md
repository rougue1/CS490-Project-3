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
  - `no-restricted-globals`
  - `control-has-associated-label`
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
  - `E1101`:
  - `C0413`:
  - `R0903`:
  - `W0603`:
  - `W1508`:
  - `E1136`:
  - `R0913`:
