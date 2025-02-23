const JSZip = require("jszip");
const fs = require("fs");

// Function to create a ProPresenter 7 .pro file
async function createProPresenterFile(slides, outputPath) {
    const zip = new JSZip();

    // Generate the XML content for the slides
    const xmlContent = generateProPresenterXML(slides);

    // Add the XML file to the ZIP archive
    zip.file("index.pro", xmlContent);

    // Optionally, add media files here if needed
    // Example: zip.file("media/image.jpg", imageBuffer);

    // Generate the ZIP archive and save it as a .pro file
    const content = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync(outputPath, content);

    console.log(`ProPresenter file created at: ${outputPath}`);
}

// Function to generate the XML structure for ProPresenter
function generateProPresenterXML(slides) {
    let slidesXML = "";

    // Generate XML for each slide
    slides.forEach((slide, index) => {
        slidesXML += `
            <RVSlide>
                <UUID>${generateUUID()}</UUID>
                <displayName>Slide ${index + 1}</displayName>
                <notes></notes>
                <color>
                    <red>0</red>
                    <green>0</green>
                    <blue>0</blue>
                    <alpha>1</alpha>
                </color>
                <elements>
                    <RVTextElement>
                        <text>${escapeXml(slide.text)}</text>
                        <font>
                            <name>Arial</name>
                            <size>48</size>
                            <color>
                                <red>1</red>
                                <green>1</green>
                                <blue>1</blue>
                                <alpha>1</alpha>
                            </color>
                        </font>
                    </RVTextElement>
                </elements>
            </RVSlide>
        `;
    });

    // Full XML structure
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <RVPresentationDocument version="7000">
            <presentation>
                <slides>
                    ${slidesXML}
                </slides>
            </presentation>
        </RVPresentationDocument>
    `;
}

// Helper function to escape XML special characters
function escapeXml(text) {
    return text.replace(/[<>&'"]/g, (char) => {
        switch (char) {
            case "<": return "<";
            case ">": return ">";
            case "&": return "&amp;";
            case "'": return "&apos;";
            case '"': return "&quot;";
        }
    });
}

// Helper function to generate a random UUID
function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Example usage
const slides = [
    { text: "Welcome to the Presentation!" },
    { text: "This is Slide 2." },
    { text: "Thank you for watching!" }
];

createProPresenterFile(slides, "presentation.pro");