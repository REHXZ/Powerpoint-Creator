Bible_Chapters = `ஆதியாகமம் - Genesis
யாத்திராகமம் - Exodus
லேவியராகமம் - Leviticus
எண்ணாகமம் -Numbers
உபாகமம் - Deuteronomy
யோசுவா - Joshua
நியாயாதிபதிகள் - Judges
ரூத் - Ruth
1சாமுவேல் -1Samuel
2சாமுவேல் - 2Samuel
1இராஜாக்கள் - 1Kings
2இராஜாக்கள் - 2Kings
1நாளாகமம் - 1Chronicles
2நாளாகமம் - 2Chronicles
எஸ்றா - Ezra
நெகேமியா - Nehemiah
எஸ்தர் - Esther
யோபு - Job
சங்கீதம் - Psalms
நீதிமொழிகள் - Proverbs
பிரசங்கி - Ecclesiastes
உன்னதப்பாட்டு - The Song of Solomon
ஏசாயா - Isaiah
எரேமியா - Jeremiah
புலம்பல் - Lamentations
எசேக்கியேல் - Ezekiel
தானியேல் - Daniel
ஓசியா - Hosea
யோவேல் - Joel
ஆமோஸ் - Amos
ஒபதியா - Obadiah
யோனா - Jonah
மீகா -Micah
நாகூம் - Nahum
ஆபகூக் - Habakkuk
செப்பனியா - Zephaniah
ஆகாய் - Haggai
சகரியா - Zechariah
மல்கியா - Malachi 

மத்தேயு - Matthew
மாற்கு - Mark
லூக்கா - Luke
யோவான் - John
அப்போஸ்தலருடைய நடபடிகள்
எபிரெயர் - Hebrew
யாக்கோபு
ரோமர் - Romans
1கொரிந்தியர் - 1Corinthians
2கொரிந்தியர் - 2Corinthians
கலாத்தியர் - Galatians
எபேசியர் - Ephesians
பிலிப்பியர் - Philippians
கொலோசெயர் - Colossians
1தெசலோனிக்கேயர் - 1Thessalonians
2தெசலோனிக்கேயர் - 2Thessalonians
1தீமோத்தேயு - 1Timothy
2தீமோத்தேயு - 2Timothy
தீத்து - Titus
பிலேமோன் - Philemon
1பேதுரு - 1Peter
2பேதுரு - 2Peter
1யோவான் - 1John
2யோவான் - 2John
3யோவான் - 3John
யூதா - Jude
வெளிப்படுத்தல் - Revelation`

X = Bible_Chapters.split('\n').map((x) => x.split(' - '))

Books = new Object()
for (let i = 0; i < X.length; i++) {
    Books[X[i][1]] = X[i][0]
}
console.log(Books)
const PptxGenJS = require("pptxgenjs");

async function fetchData(url) {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const response = await fetch(url);
    const data = await response.json();
    return data.text;
}

async function createPresentation() {
    const englishUrl = "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-asv/books/1samuel/chapters/1/verses/1.json";
    const tamilUrl = "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/ta-IN-otcv/books/2கொரிந்தியர்/chapters/1/verses/1.json";

    const englishText = await fetchData(englishUrl);
    const tamilText = await fetchData(tamilUrl);

    let pres = new PptxGenJS();

    let slide = pres.addSlide();
    slide.background = { color: "000000" };
    slide.addText(tamilText, {
        x: 1,
        y: 1,
        w: 8.5,
        h: 2,
        fontSize: 24,
        color: "ffffff",
        fontFace: "Arial"
    });

    slide.addText(englishText, {
        x: 1,
        y: 3,
        w: 8.5,
        h: 2,
        fontSize: 20,
        color: "ffffff",
        fontFace: "Arial"
    });

    const outputFileName = "BibleVerses.pptx";
    await pres.writeFile({ fileName: outputFileName });

    console.log(`Presentation saved as ${outputFileName}`);
}

createPresentation().catch(console.error);