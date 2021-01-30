# Zwallet App Api

This API is for Zwallet App where online payment application that is convenient, safe, and easy.

## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)

## Installation

Clone this repository and then use the package manager npm to install dependencies.


```bash
npm install
```

## Setup .env example

Create .env file in your root project folder.

```env

PORT= 5000
BASE_URL= http://localhost:5000

DB_HOST= localhost
DB_USER= root
DB_PASS= 
DB_NAME= db_zwallet

SECRET_KEY= @!#fjsfn1kej01en1230129kdsf
REFRESH_KEY= sdlkfj34900sd9fu01insjd!@12e

EMAIL_USERNAME= email@gmail.com
EMAIL_PASSWORD= email1234#

```

## Run the app

Development mode

```bash
npm run dev
```

Deploy mode

```bash
npm start
```

## REST API

You can view my Postman collection [here](https://www.getpostman.com/collections/65e37e55e8c3d1a69d55) </br>
or </br>
[![run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/65e37e55e8c3d1a69d55)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
