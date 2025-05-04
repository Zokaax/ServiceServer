function getOrCreateClientId() {
    const storageKey = 'clientId';
    let clientId = localStorage.getItem(storageKey);

    if (!clientId) {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            clientId = crypto.randomUUID();
        }

        localStorage.setItem(storageKey, clientId);
    }
    return clientId;
}

// --- Uso al establecer la conexión SSE ---
const clientId = getOrCreateClientId();
const sseUrl = `/events?clientId=${clientId}`;

const eventSource = new EventSource(sseUrl);

eventSource.onerror = function(error) {
    console.error('Error en la conexión SSE:', error);
    eventSource.close(); 
};