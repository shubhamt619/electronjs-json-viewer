// preload.js
// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI',{
  selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  loadFiles: (directory) => ipcRenderer.invoke('load-all-files', directory),
  handleFilesList: (callback) => ipcRenderer.on('handle-all-files', callback),
})

window.addEventListener('DOMContentLoaded', () => {

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

