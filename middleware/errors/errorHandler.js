export function errorHandler(err, req, res, next){
    console.error(err.stack);
    
    // Respuesta consistente para todos los errores
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};