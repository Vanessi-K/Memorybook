const uuid = require("uuid");

async function handleFiles(images, directory) {
    if(images) {
        //Create unique identifier string
        let uuidString = uuid.v4();
        let picture = images.picture;
        let extension = picture.name.split('.').pop()
        let filename = uuidString + "." + extension;
        let filepath = "./public/uploads/" + directory + "/" + filename;

        //Move file to a certain path
        await picture.mv(filepath);
        console.log('saved picture to: ' + filepath)
        return filename;
    }

    return "placeholder.png"
}

module.exports = {
    handleFiles
}