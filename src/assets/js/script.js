const fs = require('fs');

listFiles = async() => {
    return fs.readdirSync('src/assets/data/')
}

listFiles().then((files) => {
    console.log(files);
})