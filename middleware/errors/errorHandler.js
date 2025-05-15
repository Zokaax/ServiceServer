export const errorHandler = (err, req, res, next) => { 
    console.error('--- Error en la Petición ---');
    console.error(`Ruta: ${req.method} ${req.originalUrl}`);
    console.error('Detalles del Error:', err);
    console.error('--------------------------');

    const statusCode = err.status || 500;

    const message = err.message || (statusCode === 500 ? 'Ocurrió un error interno en el servidor.' : 'Hubo un problema con la solicitud.');

    // const errorDetails = (statusCode === 500 && process.env.NODE_ENV !== 'production') ? err : undefined; // Muestra stack/detalles solo en desarrollo para 500

    if (res.headersSent) {
        console.warn('Headers already sent. Cannot send error response. Passing to next error handler or ending.');
        return;
        // return next(err);
    }

    res.status(statusCode).json({
        success: false,
        errorCode: statusCode,
        message: message
        // error: errorDetails 
    });
};