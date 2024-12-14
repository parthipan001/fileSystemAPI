const fs = require('fs');
const path = require('path');

// Function to create a file
function createFile(fileName, content) {
    const filePath = path.join(__dirname, fileName);
    
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log(`File created: ${fileName}`);
        }
    });
}



// Function to read multiple files
function readFiles(fileNames, callback) {
    let filesData = [];
    let filesRead = 0;
    
    // Iterate over all the file names and read each one
    fileNames.forEach((fileName, index) => {
        readFiles(fileName, (err, data) => {
            if (err) {
                filesData.push({ fileName, error: 'Failed to read file' });
            } else {
                filesData.push({ fileName, content: data });
            }
            filesRead++;
            
            // Once all files are read, execute the callback
            if (filesRead === fileNames.length) {
                callback(filesData); // Return an array of results
            }
        });
    });
}

// Export the functions
module.exports = { createFile, readFiles };