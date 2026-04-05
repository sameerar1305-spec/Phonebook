function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet(); // or use ss.getSheetByName("Sheet1")
    
    var range = sheet.getDataRange();
    var rows = range.getValues();
    
    // Debug: check how many rows found
    if (rows.length === 0) {
      return respond({ success: false, error: "Sheet is empty", rows: 0 });
    }
    
    if (rows.length === 1) {
      return respond({ success: false, error: "Only header row found, no data rows", rows: 1 });
    }

    // Get headers from first row, force lowercase + trim
    var headers = rows[0].map(function(h) {
      return String(h).toLowerCase().trim();
    });

    // Build contacts array from remaining rows
    var contacts = [];
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      
      // Skip completely empty rows
      var isEmpty = row.every(function(cell) { return String(cell).trim() === ''; });
      if (isEmpty) continue;

      var obj = {};
      headers.forEach(function(header, j) {
        obj[header] = String(row[j] || '').trim();
      });
      contacts.push(obj);
    }

    return respond({ 
      success: true, 
      contacts: contacts,
      debug: {
        totalRows: rows.length,
        headers: headers,
        contactCount: contacts.length,
        sheetName: sheet.getName()
      }
    });

  } catch(err) {
    return respond({ success: false, error: err.message });
  }
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
