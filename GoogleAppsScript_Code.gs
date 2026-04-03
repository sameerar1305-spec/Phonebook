// ============================================================
// Google Apps Script - Contact Directory API
// Deploy as: Web App > Execute as: Me > Who has access: Anyone
// ============================================================

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Row 1 is header: Name, Phone, Email, Profession, Address
  const headers = data[0];
  const rows = data.slice(1);

  const contacts = rows
    .filter(row => row[0] !== "") // skip empty rows
    .map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header.toString().trim()] = row[i] ? row[i].toString().trim() : "";
      });
      return obj;
    });

  const json = JSON.stringify({
    success: true,
    count: contacts.length,
    contacts: contacts
  });

  // Support JSONP for cross-origin requests from mobile apps/browsers
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    const output = ContentService.createTextOutput(callback + '(' + json + ')');
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);
    return output;
  }

  const output = ContentService.createTextOutput(json);
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// Test function - run this to verify sheet connection
function testFetch() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  Logger.log("Headers: " + data[0]);
  Logger.log("Total rows: " + (data.length - 1));
}
