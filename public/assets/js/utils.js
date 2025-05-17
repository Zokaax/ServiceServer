function submitForm(submitButtonId, formId, postUrl, onSuccess, onError) {
    const submitButton = document.getElementById(submitButtonId);
    const form = document.getElementById(formId);

    if (!submitButton || !form) {
        console.error(`No se contro el botón con ID '${submitButtonId}' o el formulario con ID '${formId}'.`);
        return;
    }

    form.addEventListener('submit', function(e) {
        // e.preventDefault();

    // submitButton.addEventListener('click', function(event) {
        // event.preventDefault();
        fetchPost(postUrl, form, onSuccess, onError);
    });
};


function updateElement(elementId, getUrl, onSuccess, onError) {
    const listElement = document.getElementById(elementId);

    if (!listElement) {
        console.error(`No se encontró el elemento con ID '${elementId}'.`);
        return;
    }

    fetchGet(getUrl, data => {
        onSuccess(data.data, listElement)
    }, (error, listElement) => onError(error, listElement));
}


async function fetchPost(url, form, funcionok, funcionerr) {

    const formData = new FormData(form);
    const jsonForm = Object.fromEntries(formData.entries());

    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonForm),
        })
        .then(response => response.json())
        .then(data => {
            funcionok(data, form);
        })
        .catch(error => {
            funcionerr(error);
        });
}

function fetchGet(url, funcionok, funcionerr) {
    fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            funcionok(data);
        })
        .catch(error => {
            funcionerr(error);
        });
}



function setCurrentDate() {
    const fechaElemento = document.getElementById('currentDate');
    const ahora = new Date();
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const fechaFormateada = ahora.toLocaleDateString('es-VE', opciones); // 'es-VE' para formato venezolano
    fechaElemento.textContent = fechaFormateada;
}
// setCurrentDate();