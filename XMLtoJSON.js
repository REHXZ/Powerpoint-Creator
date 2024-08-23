// const fs = require('fs');
// const { DOMParser } = require('xmldom');

// function convertXmlToJson(xmlString) {
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(xmlString, "text/xml");

//   const result = [];
//   const biblebooks = xmlDoc.getElementsByTagName("BIBLEBOOK");

//   for (let b = 0; b < biblebooks.length; b++) {
//     const biblebook = biblebooks[b];
//     const bookName = biblebook.getAttribute("bname");
//     const bookNumber = parseInt(biblebook.getAttribute("bnumber"));

//     const chapters = biblebook.getElementsByTagName("CHAPTER");
//     for (let i = 0; i < chapters.length; i++) {
//       const chapter = chapters[i];
//       const chapterNumber = parseInt(chapter.getAttribute("cnumber"));

//       const verses = chapter.getElementsByTagName("VERS");
//       for (let j = 0; j < verses.length; j++) {
//         const verse = verses[j];
//         const verseNumber = parseInt(verse.getAttribute("vnumber"));
//         const text = verse.textContent;

//         result.push({
//           book_name: bookName,
//           book: bookNumber,
//           chapter: chapterNumber,
//           verse: verseNumber,
//           text: text
//         });
//       }
//     }
//   }

//   return result;
// }

// // Read the XML file
// const xmlString = fs.readFileSync('SF_2015-08-17_TAM_TAMBSI_(TAMIL (BSI)).xml', 'utf-8');

// // Convert XML to JSON
// const jsonResult = convertXmlToJson(xmlString);

// // Write the JSON to a file
// fs.writeFileSync('TamilBible.json', JSON.stringify(jsonResult, null, 2), 'utf-8');

// console.log('JSON file has been created successfully.');
const fs = require('fs');


fs.readFile('TamilBible.json', 'utf8', (err, data) => { 
    if (err) {
        console.error("Error reading the second file:", err);
        return;
    }

    English = JSON.parse(data); // Assign the parsed data to English
    console.log(English.length);
});
