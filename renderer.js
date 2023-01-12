const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')
const filesList = document.getElementById('files-list')
const fileName = document.getElementById('file-name')
const fileTable = document.getElementById('file-table')
const fileRows = document.getElementById('file-rows')
const itemTemplate = `<li><a href="#!" class="collection-item json-file-item" data-name="filename">filename</a></li>`

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.selectFolder()
  filePathElement.innerText = filePath
  console.log(filePath);
  window.electronAPI.loadFiles(filePath);
})

window.electronAPI.handleFilesList((event, files) => {
    console.log("Received files ", files);
    filesList.innerHTML = "";
    for (var i = 0; i < files.length; i++) {
        console.log(itemTemplate.replace(/filename/g, files[i]));
        files[i] = files[i].replace(/\//g, '\\');
        let newItem = itemTemplate.replace(/filename/g, files[i])
        filesList.innerHTML += newItem
    }
    setListeners();
})

function setListeners() {
var allItems = document.getElementsByClassName('json-file-item'); 
for (var i = 0; i < allItems.length; i++) {
    let name = allItems[i].getAttribute("data-name")
    allItems[i].addEventListener("click", () => {
        console.log(eval(name));
        fileName.innerHTML = name + ".json"
        fileTable.classList.remove("hide");
        let obj = eval(name);
        for (key in obj) {
            fileRows.innerHTML += `<tr><td>${key}</td><td>${obj[key]}</td></tr>`
        }
    })
}    
}



// loadFiles = async() => {
//     var allFiles = await window.electronAPI.getAllFiles().then(files => {
//         files.forEach(file => {
//             filesList.innerHTML += `<li><a href="#!" class="collection-item">${file}</a></li>`
//         });
//     })
    
// }

// loadFiles();