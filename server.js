const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);

    // Send a message to the client
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );    
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,        
        id: uuid(),
      };
  
      // Convert the data to a string so we can save it
      //const noteString = JSON.stringify(newNote);
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
});

// GET route that returns any specific term
app.delete('/api/notes/:id', (req, res) => {
    // Log that a DELETE request was received
    console.info(`${req.method} request received to delete a note`);

    if(req.params.id){
        readFromFile('./db/db.json').then((data) => {
   
            const noteData = JSON.parse(data);
    
            // Iterate through the terms name to check if it matches `req.params.id`
            for (let i = 0; i < noteData.length; i++) {
                if (req.params.id === noteData[i].id) {                     
                    //console.log('Match Found');
                    noteData.splice(i, 1);           
                }
            }

            writeToFile('./db/db.json', noteData);
    
            const response = {
                status: 'success',
                body: noteData,
            };
          
            console.log(response);
            res.status(201).json(response);
            
        });
    } else {
        res.status(500).json('Error in deleting note');
    }

});

// Wildcard route to direct users to a index page
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);