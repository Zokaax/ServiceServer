import zod from 'zod'

const deviceSchema = zod.object({
    type: zod.string({
        invalid_type_error: 'El valor de type debe ser un string',
        required_error: 'El tipo de dispositivo es requerido'
    }),
    brand: zod.string({
        invalid_type_error: 'El valor de brand debe ser un string',
        message: 'No se puede encontrar la variable brand'
    }),
    model: zod.string({
        invalid_type_error: 'El valor de model debe ser un string',
        message: 'No se puede encontrar la variable model'
    }),
    description: zod.string({
        invalid_type_error: 'El valor de model debe ser un string',
        message: 'No se puede encontrar la variable model'
    }).array().optional()
})

export function validateDevice(input) {
    return deviceSchema.safeParse(input)
}

export function validatePartialDevice(input) {
    return deviceSchema.partial().safeParse(input)
}