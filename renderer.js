const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
const filesList = document.getElementById('files-list')
const fileName = document.getElementById('file-name')
const fileTable = document.getElementById('file-table')
const fileRows = document.getElementById('file-rows')
// setButton.addEventListener('click', () => {
//     const title = titleInput.value
//     window.electronAPI.setTitle(title)
// });

const allItems = document.getElementsByClassName('json-file-item');
for(var i = 0; i < allItems.length; i++) {
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

// loadFiles = async() => {
//     var allFiles = await window.electronAPI.getAllFiles().then(files => {
//         files.forEach(file => {
//             filesList.innerHTML += `<li><a href="#!" class="collection-item">${file}</a></li>`
//         });
//     })
    
// }

// loadFiles();