const xlsx = require('xlsx');

const readExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
};

const writeExcelFile = (filePath, data) => {
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, sheet, 'זוגות');
    xlsx.writeFile(workbook, filePath);
};

module.exports = { readExcelFile, writeExcelFile };
