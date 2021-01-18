Hooks.on("renderSidebarTab", async (app, html) => {
  if (app.options.id == "scenes") {
    let button = $("<button class='import-ds'><i class='fas fa-file-import'></i> Dungeon Scrawl Import</button>")
 
    button.click(function () {
      //nothing yet
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
