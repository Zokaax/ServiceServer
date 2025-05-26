import zod from 'zod'

const receptionSchema = zod.object({
    saintOrder: zod.string(),
    dateStart: zod.string().date(),
    dateEnd: zod.string().date().optional(),
    clientId: zod.number({
        invalid_type_error: 'El id del cliente debe ser un numero',
        required_error: 'El id del cliente es requerido.'
    }).positive({
        invalid_type_error: 'El id del cliente debe ser un numero positivo'
    }),
    deviceId: zod.number({
        invalid_type_error: 'El id del dispositivo debe ser un numero',
        required_error: 'El id del dispositivo es requerido.'
    }).positive({
        invalid_type_error: 'El id del cliente debe ser un numero positivo'
    }),
    clientIssue: zod.string(),
    workDone: zod.string(),
    status: zod.string({
        invalid_type_error: 'El estado de la recepcion debe ser un string',
        required_error: 'El estado de la recepcion es requerido.'
    }),
    amoutDolar: zod.coerce.number({
        invalid_type_error: 'La cantidad en dolares debe ser un numnero',
        message: 'Ha ocurrido un error con valor en dolares.'
    }).nonnegative().optional(),
    dateField: zod.string().max(10).optional(),
    deviceDelivered: zod.boolean().optional()
})

export function validateReception(input) {
    return receptionSchema.safeParse(input)
}

export function validatePartialReception(input) {
    return receptionSchema.partial().safeParse(input)
}