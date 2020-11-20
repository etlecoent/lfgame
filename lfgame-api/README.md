# NPM install
- npm install

# Create the DB
- run createdb final_project_name -O labber
- add db:reset to package.json in the scripts section
- run node ./db/reset.js

# NPM install dev dependencies

## Install Nodemon

- run npm install nodemon --save-dev
- add 'dev' script to start nodemon with npm run dev

## Create a .env file
- run npm i -D dotenv
- create .env file with the following
  DB_HOST = localhost
  DB_USER = labber
  DB_PASS = labber
  DB_NAME = final_project
  DB_PORT = 5432

