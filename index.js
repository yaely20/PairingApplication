const path = require('path');
const { createPDFsForPairs } = require('./pdf/pdfCreator');
const { readExcelFile, writeExcelFile } = require('./data/excelHandler');
const { pairParticipants } = require('./data/pairingLogic');

// הגדרת נתיבים
const fontPath = path.resolve(__dirname, './fonts/static/Assistant-Regular.ttf'); // נתיב לפונט
const imagePath = path.resolve(__dirname, './images/logo.png'); // נתיב לתמונה
const outputDir = path.resolve(__dirname, './output/files'); // נתיב לקבצי הפלט
const dataPath = path.resolve(__dirname, './example.xlsx'); // נתיב לקובץ הנתונים

// קריאת הנתונים מקובץ Excel
const data = readExcelFile(dataPath);

// אימות נתונים
const expectedHeaders = ["name", "age", "family"];
if (!expectedHeaders.every(header => Object.keys(data[0]).includes(header))) {
    console.error("שגיאה: כותרות אינן תואמות.");
    process.exit();
}

// שידוך זוגות
const maxAgeDifference = 15;
const { pairs, unpaired } = pairParticipants(data, maxAgeDifference);

// שמירת תוצאות ל-Excel
writeExcelFile(`${outputDir}/friends.xlsx`, pairs.map(([p1, p2]) => ({
    זוג_1_שם: p1.name, זוג_1_גיל: p1.age, זוג_1_משפחה: p1.family,
    זוג_2_שם: p2.name, זוג_2_גיל: p2.age, זוג_2_משפחה: p2.family
})));

// יצירת PDF
createPDFsForPairs(pairs, imagePath, fontPath, outputDir);

console.log("התהליך הסתיים בהצלחה!");
