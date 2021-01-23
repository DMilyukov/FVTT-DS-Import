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
  
  activateListeners(html)
  {
    super.activateListeners(html)

    html.find(".import-map").click(async ev => {
      try 
      {
        let sceneName = html.find('[name="sceneName"]').val()
        let imgFile = html.find('[name="filePNG"]').files[0]
		let imageFileName = html.find('[name="filePNG"]').val()
		
        //let bfr = DSImporter.DecodeImage(imgFile)
        ui.notifications.notify("Uploading image ....")
        DSImporter.uploadFile(imgFile, imageFileName, "DS-Import-upload", "local_file_system", "png")
		
        ui.notifications.notify("creating scene")
        //DSImporter.DSImport(imageFileName, sceneName)
      }
      catch (e)
      {
        ui.notifications.error("Error Importing: " + e)
      }
    })
        
  }
  
  static async DSImport(imagePath, sceneName) {
      
    let newScene = new Scene({
      name: sceneName,
      grid: 70,
      img: imagePath,
      width: 200,
      height: 200,
      padding: 0,
      shiftX : 0,
      shiftY : 0
    })
    let scene = await Scene.create(newScene.data);
    scene.createThumbnail().then(thumb => {
      scene.update({"thumb" :  thumb.thumb});
    })
  }
  
  static DecodeImage(file){
    var byteString = atob(file.image);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ab;
  }
  
  static async uploadFile(filebits, name, path, source, extension) {
    let uploadFile = new File([filebits], name, { type: 'image/' + extension });
    await FilePicker.upload(source, path, uploadFile)
  }
  
}
