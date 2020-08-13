function countWords() {                
  var body = DocumentApp.getActiveDocument().getBody();
  var para = body.getParagraphs();
  var levels = para.map(function(p) {
    return [DocumentApp.ParagraphHeading.TITLE, 
            DocumentApp.ParagraphHeading.SUBTITLE, 
            DocumentApp.ParagraphHeading.HEADING1,
            DocumentApp.ParagraphHeading.HEADING2,
            DocumentApp.ParagraphHeading.HEADING3,
            DocumentApp.ParagraphHeading.HEADING4,
            DocumentApp.ParagraphHeading.HEADING5,
            DocumentApp.ParagraphHeading.HEADING6,
            DocumentApp.ParagraphHeading.NORMAL].indexOf(p.getHeading());
  });
  var paraCounts = para.map(function (p) {
    return p.getText().replace(/ \([\s\S]*?\)/g, '').trim().split(/\s+/).length ;
  });

  var counts = [];
  for (var i = 0; i < para.length; i++) {
    var count = 0;
    for (var j = i+1; j < para.length; j++) {
      if (levels[j] <= levels[i]) {
        break;
      }
      if (levels[j] == 8) {
        count += paraCounts[j];
      }
    }
    counts.push(count);
  }
  
  body.appendParagraph('Word counts')

  for (var i = 0; i < para.length; i++) {
    if (levels[i] < 8) {
      var p = para[i].copy()
      p.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      body.appendParagraph(p).appendText(" (" + counts[i] + " words)");
    }
  }
}
