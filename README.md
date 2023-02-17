# Note-Taker-App

## Description

The purpose of this program is to provide a networked Note Taking application that has the capability of getting and sending notes in the form of JSON data via an API from a remote server. Users have the ability to create new notes and have them saved in a persistent JSON file located on a server, recall them, and also delete them.

This program utilizes node.js as well as the npm packages 'fs' to read and write persistent data from and to stored JSON files, and 'express' to create back-end routes for the front-end files to fetch data from persistent JSON files.

## Installation

This program was built and tested using node.js v16.19.0.

After cloning this repository into a working folder of your own, you'll need to run the following command to pull in the node packages required to run the program.

```md
npm install OR npm i
```

## Usage

After installation, you can run the program by typing:

```md
node server.js
```

This will bring up a message:

```md
App listening at http://localhost:${PORT}
```

From here you can view the application by following the address in your browser.

<br>
Here is a video demonstrating how the program should run:


## Deployment

Should you choose to host the application to a cloud host such as Heroku (which was used here), run the following commands and then follow the instructions in your terminal:

```md
heroku login
heroku create
git push heroku master
```
