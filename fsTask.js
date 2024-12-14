const express = require('express'); // Express module imported
const { createFile, readFiles } = require('./fileSystem.js'); // createFile and readMultipleFiles methods imported

const server = express(); // Express method invoked

server.use(express.json()); // Parsing JSON data from the body of the request

// Array to store created file names
let fileNames = [];

// POST route for creating files
server.post('/create-file', (req, res) => {
    try {
        const dateTime = new Date();
        // Generate the file name with the current date-time, replacing ':' with '-'
        const fName = dateTime.toISOString().split('.')[0].replace(/:/g, '-');

        // Create the file with the current timestamp as content
        createFile(`${fName}.txt`, Date.now().toString());

        // Store the file name to read later
        fileNames.push(`${fName}.txt`);

        // Respond that the file has been created
        res.status(200).send({
            message: `File ${fName}.txt created successfully`,
            fileName: `${fName}.txt`
        });
    } catch (err) {
        // Catch any unexpected errors
        console.error('Error creating the file:', err);
        res.status(500).send({ error: 'An error occurred while creating the file' });
    }
});

// GET route for reading files
server.get('/read-files', (req, res) => {
    if (fileNames.length === 0) {
        return res.status(404).send({ error: 'No files have been created yet.' });
    }

    // Read all files after creation
    readFiles(fileNames, (filesData) => {
        res.status(200).send({
            message: 'Files read successfully',
            files: filesData
        });
    });
});

const PORT = 4001;
server.listen(PORT, () => {
    console.log(`Server is up and running on: ${PORT}`);
});