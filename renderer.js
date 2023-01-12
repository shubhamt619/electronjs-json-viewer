const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')
const selectedFolder = document.getElementById('selected-folder')
const filesList = document.getElementById('files-list')
const fileName = document.getElementById('file-name')
const fileTable = document.getElementById('file-table')
const fileRows = document.getElementById('file-rows')
const chatContainer = document.getElementById('chat-container')
const chatBody = document.getElementById('chat-body')
const botId = document.getElementById('bot-id')
const creationTS = document.getElementById('creation-ts')
const itemTemplate = `<li><a href="#!" class="collection-item json-file-item" data-name="filename">filename</a></li>`
const botTextTemplate = `<p class="from-them">TEXT</p>`
const answersTextTemplate = `<p class="from-me">TEXT</p>`

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.selectFolder()
  filePathElement.innerText = filePath
  console.log(filePath);
  window.electronAPI.loadFiles(filePath);
})

window.electronAPI.handleFilesList((event, files) => {
    console.log("Received files ", files);
    selectedFolder.classList.remove("hide")
    filesList.innerHTML = "";
    for (var i = 0; i < files.length; i++) {
        console.log(itemTemplate.replace(/filename/g, files[i]));
        files[i] = files[i].replace(/\//g, '\\');
        let newItem = itemTemplate.replace(/filename/g, files[i])
        filesList.innerHTML += newItem
    }
    setListeners();
})

window.electronAPI.processFile((event, jsonObj) => {
    chatContainer.classList.remove("hide")
    botId.innerHTML = jsonObj.BotId;
    creationTS.innerHTML = jsonObj.CreationTS;
    for (var i =0; i < jsonObj.Bubbles.length; i++) {
        let text = botTextTemplate.replace(/TEXT/g, jsonObj.Bubbles[i].text)
        chatBody.innerHTML += text;
        for (var j =0; j < jsonObj.Bubbles[i].answers.length; j++) {
            let text = answersTextTemplate.replace(/TEXT/g, jsonObj.Bubbles[i].answers[j].text)
            chatBody.innerHTML += text;
        }
    }
})

function setListeners() {
var allItems = document.getElementsByClassName('json-file-item'); 
for (var i = 0; i < allItems.length; i++) {
    let name = allItems[i].getAttribute("data-name")
    allItems[i].addEventListener("click", () => {
        fileName.innerHTML = name + ".json"
        window.electronAPI.readFile(name);
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