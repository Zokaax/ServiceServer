import {
    contextBridge,
    ipcRenderer
} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    //     // getData: (query) => ipcRenderer.invoke('get-data', query),
    //     // editItem: (item) => ipcRenderer.invoke('edit-item', item),
    //     // deleteItem: (item) => ipcRenderer.invoke('delete-item', item),
    //     // addItem: (newItem) => ipcRenderer.invoke('add-item', newItem),
    //     // showConfirmDialog: (message) => ipcRenderer.invoke('show-confirm-dialog', message),
    //     // // showEditPrompt: (message, defaultValue) => ipcRenderer.invoke('show-edit-prompt', message, defaultValue),
    //     // loadInitialData: () => ipcRenderer.invoke('load-initial-data'),
    //     // getAIResponse: (prompt) => ipcRenderer.invoke('get-ai-response', prompt),
    //     // onDataUpdatedByTool: (callback) => ipcRenderer.on('data-updated-by-tool', callback),
    //     // publishToSupabase: () => ipcRenderer.send('publish')
});