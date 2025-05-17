// const eventSource = new EventSource('/events');
const eventSource = new EventSource('/events');
// Cuando se recibe un mensaje del backend
eventSource.onmessage = function(event) {
    const serverData = JSON.parse(event.data);

    if (serverData.type === 'testing') {
        console.log('prueba de testing')
    }
}