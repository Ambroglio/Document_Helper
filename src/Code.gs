function onOpen() {
  return CardService
    .newCardBuilder()
    .addSection(
      CardService.newCardSection()
        .setHeader('Presentation')  // optional
        .addWidget(CardService.newTextParagraph().setText(
          "With Document Helper, you can directly generate new files from a chosen template.")))
    .addSection(
      CardService.newCardSection().setHeader("Read documentation")
        .addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Documentation")
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOpenLink(
            CardService.newOpenLink().setUrl("https://docs.google.com/document/d/e/2PACX-1vS6ml77HQdddmTAaFi7TwW6vF5-kYcRRwNPUJRtOj8ZJcebzMCTN8I6mR7HEKRJWhMEVqwE2_5T7qCE/pub")
          )))
    )
    .addSection(
      CardService.newCardSection().setHeader("Generate a file from a template")
        .addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Generate")
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor("#3079ed")
          .setOnClickAction(
            CardService.newAction().setFunctionName("loadTemplateSidebar")
          )))
    )
    .build()
}

function createMenu() {
  DocumentApp.getUi().createAddonMenu().addItem("Create document from template", "loadTemplateSidebar").addToUi()
}

function loadTemplateSidebar() {
  const hs = HtmlService.createTemplateFromFile("loadTemplateSidebar")
  const ho = hs.evaluate().setTitle("Create from template")

  const ui = DocumentApp.getUi()
  ui.showSidebar(ho)
}

function testFillTemplate() {
  fillTemplateSidebar("TEST DOCUMENT", "1ePy9EyMVtMJby1oz1UJBR-vJ9bN70--yKpY-Bz_AOc4", "1KvTGskXQPl0MoPWd9OVdPWKeb03SpfEs")
}

function fillTemplateSidebar(name, id, folder_id) {
  Logger.log(id)

  const hs = HtmlService.createTemplateFromFile("fillTemplateSidebar")

  hs.id = id
  hs.folder_id = folder_id
  hs.name = name
  hs.folder_name = DriveApp.getFolderById(folder_id).getName()
  hs.template_name = DocumentApp.openById(id).getName()
  const ho = hs.evaluate().setTitle("Fill Template")

  const ui = DocumentApp.getUi()
  ui.showSidebar(ho)
}

function successSidebar(url) {
  const hs = HtmlService.createTemplateFromFile("successSidebar")
  hs.url = url
  const ho = hs.evaluate().setTitle("Creation success")
  DocumentApp.getUi().showSidebar(ho)
}