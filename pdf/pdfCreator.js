const fs = require('fs');
const PDFDocument = require('pdfkit');

const createPDF = (person, partner, imagePath, fontPath, outputDir) => {
    const doc = new PDFDocument({ margin: 50 });

    // רישום הפונט
    doc.registerFont('Hebrew', fontPath);
    doc.font('Hebrew');

    // יצירת שם קובץ
    const fileName = `${outputDir}/${person.name.replace('###', '   ')}.pdf`;
    doc.pipe(fs.createWriteStream(fileName));

    // הוספת תמונה וכותרת
    doc.image(imagePath, doc.page.width - 450, 50, { width: 400, height: 250 });
    doc.moveDown(15);
    doc.fontSize(25).fillColor('#5E483E').text(`: ${person.name}`, { align: 'right' });
    doc.fontSize(20).fillColor('#5E483E').text(`  החברותא שלך: ${partner.name}`, { align: 'right' });

    doc.end();
};

const createPDFsForPairs = (pairs, imagePath, fontPath, outputDir) => {
    pairs.forEach(([person1, person2]) => {
        createPDF(person1, person2, imagePath, fontPath, outputDir);
        createPDF(person2, person1, imagePath, fontPath, outputDir);
    });
};

module.exports = { createPDFsForPairs };
