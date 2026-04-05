function doGet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const contacts = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) {
      contacts.push({
        Name: data[i][0] || '',
        Phone: data[i][1] || '',
        Phone1: data[i][2] || '',
        Address: data[i][3] || '',
        Address1: data[i][4] || ''
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    contacts: contacts
  })).setMimeType(ContentService.MimeType.JSON);
}
