const fs = require('fs');

// Load and parse the JSON file
fs.readFile('TA-தமிழ்/ta_irv.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    // Parse the JSON data
    const parsedJson = JSON.parse(data);

    // Accessing and decoding the "name" field
    const tamilName = parsedJson;

    console.log(tamilName);
});
