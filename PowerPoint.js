const PptxGenJS = require("pptxgenjs");

async function createPresentation() {
    let pres = new PptxGenJS();

    let slide = pres.addSlide();
    slide.background = { color: "000000" };
    slide.addText('Hello', {
        x: 1,
        y: 1,
        w: 8.5,
        h: 2,
        fontSize: 24,
        color: "ffffff",
        fontFace: "Arial"
    });

    slide.addText('Hello', {
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