const pdfDocument = require("pdfkit");
const PdfTable = require("voilab-pdf-table");

const generateReport = (title, tableData, writeStream) => {
  var doc = new pdfDocument({
    layout: "landscape",
    margin: 50,
    size: "A4"
  });

  doc.font("Courier-Bold", 25).text(title);

  doc.font("Courier", 8);

  var table = new PdfTable(doc, {
    bottomMargin: 30
  });

  table.addColumns(tableData.columns);

  table.addBody(tableData.data);

  var stream = doc.pipe(writeStream);

  doc.end();

  stream.on("finish", () => {
    console.log("Pdf generated");
  });
};

module.exports = generateReport;
