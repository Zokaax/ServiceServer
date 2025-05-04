const clients = []; // Cambiado a una lista vacía

export function addClient(res) {
    try {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        // res.setHeader('Access-Control-Allow-Origin', '*'); // Ajusta esto para producción

        // No necesitamos verificar el ID ya que usamos una lista
        clients.push(res);
        console.log('Cliente SSE agregado. Total:', clients.length);

        if (!res.writableEnded) {
            res.write(':ok\n\n');
            res.write("data: {\"type\": \"connection\"}\n\n");
        }
    } catch (error) {
        console.error('Error al agregar cliente:', error.message);
        // Manejar el error de manera adecuada
    }
}

export function removeClient(res) {
    const index = clients.indexOf(res);
    if (index !== -1) {
        clients.splice(index, 1);
        console.log('Cliente SSE se ha eliminado. Total:', clients.length);
    }
}

export function serverSend(data) {
    const eventData = `data: ${JSON.stringify(data)}\n\n`;

    clients.forEach((client) => {
        if (!client.writableEnded && client.writable) {
            try {
                client.write(eventData);
            } catch (error) {
                if (!client.writableEnded) {
                    client.end();
                }
                removeClient(res)
            }
        }
    });
}