const eventSource = new EventSource('/events');

eventSource.onmessage = function(event) {
    const serverData = JSON.parse(event.data);

    if (serverData.type === 'clientAdded' || serverData.type === 'connection') {
        updateReceptionClientsList();
    }
    if (serverData.type === 'deviceAdded' || serverData.type === 'connection') {
        updateReceptionDevicesList();
    }
    if (serverData.type === 'receptionAdded' || serverData.type === 'connection') {
        updateReceptionList();
        updatePaymentReceptionList()
    }
}

submitForm(
    'submitAddClient',
    'addClientForm',
    '/api/client',
    (form) => {
        if (validateClientForm(form)) {
            alert('El cliente debe llevar un nombre');
            return true;
        }
    },
    (data, form) => {
        form.reset();
        alert('el cliente se ha agregado exitosamente');
    },
    (error) => {
        alert('ha ocurrido un error al agregar al cliente');
    }
);

function validateClientForm(form) {
    const clientNameInput = document.getElementById('clientName');
    return clientNameInput.value.trim() === '';
}

//Agregar dispositivos via formulario

submitForm(
    'submitAddDevice',
    'addDeviceForm',
    '/api/device',
    (form) => {
        if (validateDeviceForm(form)) {
            alert('Se debe identificar el tipo de dispositivo')
            return true;
        }
    },
    (data, form) => {
        form.reset();
        alert('el dispositivo se ha agregado exitosamente');
    },
    (error) => {
        alert('ha ocurrido un error al agregar el dispositivo');
    },
);

function validateDeviceForm(form) {
    const deviceTypeInput = document.getElementById('deciveType');
    return deviceTypeInput.value.trim() === '';
}


// Agregar recepciones via formulario

//actualizar lista de clientes
function updateReceptionClientsList() {

    updateElement('clientList', '/api/clients', (data, element) => {

        let options = '<option value="">-- Selecciona un Cliente --</option>';

        for (let client of data) {

            options += `<option value="${client.id}">${client.name}</option>`;
        }

        element.innerHTML = options;

    }, (error, element) => alert(`ha ocurrido un error en #${element} actualizar la lista de clientes:` + error))

}


//actualizar lista de dispositivos
function updateReceptionDevicesList() {

    updateElement('deviceList', '/api/devices', (data, element) => {

        let options = '<option value="">-- Selecciona un Dispositivo --</option>';

        for (let device of data) {
            options += `<option value="${device.id}">${device.type} --- ${device.brand} --- ${device.model}</option>`;
        }

        element.innerHTML = options;

    }, (error, element) => alert(`ha ocurrido un error en #${element} actualizar la lista de los dispositivos:` + error))
}



//agregar recepcion
submitForm(
    'submitAddReception',
    'addReceptionForm',
    '/api/reception',
    (form) => {
        if (validateReceptionForm(form)) {
            alert('La Recepcion debe llevar un cliente')
            return true;
        }
    },
    (data, form) => {
        form.reset();
        alert('la recepcion se ha agregado exitosamente');
    },
    (error) => {
        alert('ha ocurrido un error al agregar la recepcion');
    },
);

function validateReceptionForm(form) {
    const clientList = document.getElementById('clientList');
    return clientList.value.trim() === '';
}


//Lista de recepciones de muestra

async function updateReceptionList() {

    updateElement('receptionsView', '/api/receptions', async(data, element) => {

        if (!Array.isArray(data)) {
            console.error("Datos iniciales de recepciones no válidos:", data);
            alert("Error al obtener la lista inicial de recepciones.");
            return;
       }

        const clientIds = [...new Set(data.map(reception => reception.clientId))];
        const deviceIds = [...new Set(data.map(reception => reception.deviceId))];

        try {
            const clientsResponse = await fetch(`/api/client?ids=${clientIds.join(',')}`);
            const clientsData = await clientsResponse.json();
            const clientsMap = new Map(clientsData.map(client => [client.id, client]));

            const devicesResponse = await fetch(`/api/device?ids=${deviceIds.join(',')}`);
            const devicesData = await devicesResponse.json();
            const devicesMap = new Map(devicesData.map(device => [device.id, device]));

            let options = '';

            for (const reception of data) {
                const client = clientsMap.get(reception.clientId);
                const device = devicesMap.get(reception.deviceId);

                options += `<li>${reception.status} ${reception.saintOrder} ${client.name} ${device.type}</li>`;
            }

            element.innerHTML = options;

        } catch (error) {
            console.error("Error al obtener datos de clientes o dispositivos:", error);
            alert(`Ha ocurrido un error al actualizar la lista de recepciones.`);
        }

    }, (error, element) => alert(`ha ocurrido un error en #${element} actualizar la lista de las recepciones:` + error))
}




//Agregar pagos via formulario

//actualizar lista de recepciones
function updatePaymentReceptionList() {

    updateElement('receptionsList', '/api/receptions', async(data, element) => {

        const clientIds = [...new Set(data.map(reception => reception.clientId))];
        const deviceIds = [...new Set(data.map(reception => reception.deviceId))];

        try {
            const clientsResponse = await fetch(`/api/client?ids=${clientIds.join(',')}`);
            const clientsData = await clientsResponse.json();
            const clientsMap = new Map(clientsData.map(client => [client.id, client]));

            const devicesResponse = await fetch(`/api/device?ids=${deviceIds.join(',')}`);
            const devicesData = await devicesResponse.json();
            const devicesMap = new Map(devicesData.map(device => [device.id, device]));

            let options = '<option value="">-- Selecciona una Recepcion --</option>';

            for (const reception of data) {
                const client = clientsMap.get(reception.clientId);
                const device = devicesMap.get(reception.deviceId);

                options += `<option value="${reception.id}">${client.name} --- ${device.type} --- ${reception.status}</option>`;
                options += `<li>${reception.status} ${reception.saintOrder} ${client.name} ${device.type}</li>`;
            }

            element.innerHTML = options;

        } catch (error) {
            console.error("Error al obtener datos de clientes o dispositivos:", error);
            alert(`Ha ocurrido un error al actualizar la lista de recepciones.`);
        }

    }, (error, element) => alert(`ha ocurrido un error en #${element} actualizar la lista de las recepciones:` + error))
}



//agregar pagos
submitForm(
    'submitAddPayment',
    'addPaymentForm',
    '/api/payment',
    (form) => {
        if (validatePaymentForm(form)) {
            alert('Debe haber un metodo de pago y una recepcion seleccionada')
            return true;
        }
    },
    (data, form) => {
        form.reset();
        alert('el pago se ha agregado exitosamente');
    },
    (error) => {
        alert('ha ocurrido un error al agregar el pago');
    },
);

function validatePaymentForm(form) {
    const paymentmMethods = document.getElementById('methodList');
    const receptionList = document.getElementById('receptionsList');
    return paymentmMethods.value.trim() === '' || receptionList.value.trim() === '';
}