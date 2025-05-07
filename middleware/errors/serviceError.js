export class AppError extends Error {
    constructor(message, status = 500, details = null) {
        super(message);
        this.status = status; 
        this.details = details; 
        this.name = this.constructor.name; 

        Error.captureStackTrace(this, this.constructor);
    }
}

export class DatabaseError extends AppError {
    constructor(message = 'Ha habido un problema relacionado a la base de datos', details = null) {
        super(message, 500, details);
        this.name = 'DatabaseError';
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado', details = null) {
        super(message, 404, details);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Datos de validación de negocio inválidos', details = null) {
        super(message, 400, details);
        this.name = 'ValidationError';
    }
}

export class ConflictError extends AppError {
     constructor(message = 'El recurso ya existe o hay un conflicto', details = null) {
        super(message, 409, details); // 409 Conflict
        this.name = 'ConflictError';
    }
}
