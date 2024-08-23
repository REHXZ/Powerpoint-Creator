const fs = require('fs');
const PptxGenJS = require("pptxgenjs");

let Tamil; // Global variable for the first JSON
let English; // Global variable for the second JSON

// Function to load JSON files and create the presentation
function LoadFiles(callback) {
    // Load and parse the first JSON file (Tamil)
    fs.readFile('TamilBible.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the first file:", err);
            return;
        }

        Tamil = JSON.parse(data); // Assign the parsed data to Tamil
        console.log("First JSON loaded:", Tamil);

        // Load and parse the second JSON file (English)
        fs.readFile('EnglishBible.json', 'utf8', (err, data) => { 
            if (err) {
                console.error("Error reading the second file:", err);
                return;
            }

            English = JSON.parse(data); // Assign the parsed data to English
            console.log("Second JSON loaded:", English);

            // Call the callback function to create the presentation
            callback();
        });
    });
}

// Function to create a PowerPoint presentation
async function createPresentation() {
    let pres = new PptxGenJS();

    for (let i = 0; i < Tamil.verses.length; i++) {  // Loop through each verse in the Tamil array
        // Find the corresponding English verse with the same book_name, chapter, and verse
        let matchingEnglishVerse = English.verses.find(engVerse => 
            engVerse.book === Tamil.verses[i].book &&
            engVerse.chapter === Tamil.verses[i].chapter &&
            engVerse.verse === Tamil.verses[i].verse
        );

        // If a matching verse is found, create a slide with both Tamil and English text
        if (matchingEnglishVerse) {
            let slide = pres.addSlide();
            slide.background = { color: "000000" };

            slide.addText(`${Tamil.verses[i].book_name} / ${matchingEnglishVerse.book_name} ${Tamil.verses[i].chapter}:${Tamil.verses[i].verse} `, {
                x: 3.5,
                y: 0.10,
                w: 8.5,
                h: 0.5,
                fontSize: 15,
                color: "ffffff",
                fontFace: "Arial"
            });

            // Add the Tamil verse
            slide.addText(Tamil.verses[i].verse + '. ' + Tamil.verses[i].text, {
                x: 1,
                y: 1,
                w: 8,
                h: 2,
                fontSize: 20,
                color: "ffffff",
                fontFace: "Arial"
            });

            // Add the English verse
            slide.addText(Tamil.verses[i].verse + '. ' + matchingEnglishVerse.text, {
                x: 1,
                y: 3,
                w: 8,
                h: 2,
                fontSize: 18,
                color: "ffffff",
                fontFace: "Arial"
            });
        }
    }

    const outputFileName = "BibleVerses.pptx";
    await pres.writeFile({ fileName: outputFileName });

    console.log(`Presentation saved as ${outputFileName}`);
}

// Load the JSON files and then create the presentation
LoadFiles(createPresentation);