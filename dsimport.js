Hooks.on("renderSidebarTab", async (app, html) => {
  if (app.options.id == "scenes") {
    let button = $("<button class='import-ds'><i class='fas fa-file-import'></i> Dungeon Scrawl Import</button>")
 
    button.click(function () {
      new DSImporter().render(true);
    });
    
    html.find(".directory-footer").append(button);
  }
})

Hooks.on("init", () => {
  game.settings.register("ds-import", "importSettings", {
    name: "Dungeon Scrawl Default Path",
    scope: "world",
    config: false,
    default: {
      source: "data",
      extension: "png",
      bucket: "",
      region: "",
      path: "worlds/" + game.world.name,
      offset: 0.1,
      fidelity: 3,
      multiImageMode: "g",
      webpConversion: true,
      wallsAroundFiles: true,
    }
  })
})

class DSImporter extends Application
{


  static get defaultOptions()
  {
      const options = super.defaultOptions;
      options.id = "ds-importer";
      options.template = "modules/ds-import/importer.html"
      options.classes.push("ds-importer");
      options.resizable = false;
      options.height = "auto";
      options.width = 400;
      options.minimizable = true;
      options.title = "Dungeon Scrawl Importer"
      return options;
  }
  
}
