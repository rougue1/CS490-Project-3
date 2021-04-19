# CS490-Project-3: Income/Expense Tracker

This repository consists of python, javascript, html and css files which would allow users to sign in to the app via google login
to manage their income or expenses. Each user can see their total income or expense and their current balance. Furthermore, users
can sort by week, month, year!

## Technologies we used

In this project, we used the Flask framework, as our web server and the React library for client side functionality. In addtion,
we have used react-bootstrap to streamline our html and css visuals.

## Requirements

1. `npm install`
2. `pip install -r requirements.txt`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku

_Don't do the Heroku step for assignments, you only need to deploy for Project 2_

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
