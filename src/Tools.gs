function test() {
  getInfo("1ePy9EyMVtMJby1oz1UJBR-vJ9bN70--yKpY-Bz_AOc4")
}

function getInfo(id) {
  const doc = DocumentApp.openById(id)
  const header = doc.getHeader()
  const body = doc.getBody()
  const footer = doc.getFooter()
  const foot_notes = doc.getFootnotes()

  Logger.log("FOOTNOTE LENGTH")
  Logger.log(foot_notes.length)

  const fields = []

  addFields(header, fields)
  addFields(body, fields)
  addFields(footer, fields)

  for (let foot_note of foot_notes) {
    addFields(foot_note.getFootnoteContents(), fields)
  }

  return fields
}


function addFields(elt, fields) {
  const text = elt.editAsText().getText()
  const regexp = /[$][{][A-Z_0-9]*[}]/gi

  const matchs = text.match(regexp)

  if (matchs != null) {
    for (match of matchs) {
      field = match.substring(2, match.length - 1).toUpperCase()
      if (!fields.includes(field)) {
        fields.push(field)
      }
    }
  }

  return fields
}

function copyFromTemplate(name, id, folder_id, fields) {
  Logger.log(name)
  Logger.log(id)
  Logger.log(folder_id)
  Logger.log(fields)

  const template_file = DriveApp.getFileById(id)
  const folder = DriveApp.getFolderById(folder_id)

  const file = template_file.makeCopy()
  file.setName(name)
  file.moveTo(folder)

  const document = DocumentApp.openById(file.getId())

  if (document.getHeader() !== null) {
    transformFields(document.getHeader(), fields)
  }

  if (document.getBody() !== null) {
    transformFields(document.getBody(), fields)
  }

  if (document.getFooter() !== null) {
    transformFields(document.getFooter(), fields)
  }

  if (document.getFootnotes() !== null) {
    for (let foot_note of document.getFootnotes()) {
      transformFields(foot_note.getFootnoteContents(), fields)
    }
  }

  return file.getUrl()
}

function transformFields(elt, fields) {
  for (field of Object.keys(fields)) {
    elt.replaceText("(?i)([$][{]" + field + "[}])", fields[field])
  }
}
