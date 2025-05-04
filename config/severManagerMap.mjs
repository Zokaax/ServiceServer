const clients = new Map(); 

export function addClient(req, res){

    const clientId = getClientId(req);

    if (!clientId) {
        console.error('No se pudo obtener Client ID único. Rechazando conexión SSE.');
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Unable to identify client.');
        return;
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    // res.setHeader('Access-Control-Allow-Origin', '*'); // Ajusta esto para producción

    if (clients.has(clientId)) {
        const oldRes = clients.get(clientId);
        if (!oldRes.writableEnded) {
             oldRes.end();
        }
        clients.delete(clientId);
    }

    clients.set(clientId, res);
    console.log('Cliente SSE agregado. Total:', clients.size);

    try {
        if (!res.writableEnded) {
            res.write(':ok\n\n');
            res.write("data: {\"type\": \"connection\"}\n\n");
        }
    } catch (error) {
        if (!res.writableEnded) {
            res.end();
        }
        clients.delete(clientId);
        console.error('Error al agregar cliente:', error.message); //middleware
        return; 
    }
}


export function removeClient(req, res){

    const clientId = getClientId(req);
    
    if (!clientId) {
        console.error('No se pudo obtener Client ID al remover.');
        return;
    }
    
    if (clients.has(clientId) && clients.get(clientId) === res) {
        clients.delete(clientId);
        console.log(`Cliente con ID ${clientId} eliminado del Map. Total:`, clients.size);
    } else {
        console.log(`Cliente con ID ${clientId} ya no estaba en el Map o era una conexión antigua.`);
    }
}

export function serverSend(data){
    const eventData = `data: ${JSON.stringify(data)}\n\n`;

    clients.forEach((client, clientId) => {
        if (!client.writableEnded && client.writable) { // Verificar writable también por si acaso
            try {
                client.write(eventData);
            } catch (error) {
                 if (!client.writableEnded) {
                     client.end();
                 }
                 clients.delete(clientId);
            }
        } else {
            clients.delete(clientId);
        }
    });
}

function getClientId(req) {

    const clientId = req.query.clientId;

    if (!clientId || typeof clientId !== 'string') {
        return null; // Indica que no se pudo obtener un ID válido
    }
    return clientId; 
}