const fs = require('fs');

exports.listFiles = async() => {
    return fs.readdirSync('src/assets/data/')
}

// listFiles().then((files) => {
//     console.log(files);
// })