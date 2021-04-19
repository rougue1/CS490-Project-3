# CS490-Project-3
## Expense Tracker

### Description

Expense tracker is a basic web app that allows users to keep track of their incomes and expenses in one place. 
This app will allow users to login, and create a personal expense profile. Users will be able to add new incomes or expenses, and also access the ones added on the website.

#### Team Members:
 * Abishek Vasudevan
 * Aman Hirpara
 * Mihir Rana
 * Raj Patel
 
## Technologies we used

In this project, we used the Flask framework, as our web server and the React library for client side functionality. In addtion,
we have used Google Authentication for ease of login and React-Bootstrap to streamline our html and css visuals.


## Flask and create-react-app

## Requirements

1. `npm install`
2. `pip install -r requirements.txt`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. Add following to .env file:
   + REACT_APP_GOOGLE_CLIENT_ID = "Your_OAuth_client_ID"
   + DATABASE_URL = "Your_database_url"

<details>
  <summary><b>How to get an OAuth 2.0 client ID</b></summary>
  
  1. Go to the Google [Developers Console](https://console.cloud.google.com/apis/dashboard).
  2. Navigate to the tab "Credentials".
  3. Create a new project.
  4. Navigate to the tab “OAuth consent screen”.
  5. Enter the Application name, Authorized domains, and click the button **Save**.
  6. Click on **Create Credentials** and from the dropdown list select *OAuth client ID*.
  7. From the drop-down menu, select the Web application and click on **Creat**.
  8. Copy your Client ID.
</details>



## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
