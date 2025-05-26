import zod from 'zod'

const paymentSchema = zod.object({
    method: zod.string({
        invalid_type_error: 'El pago debe registrarse bajo algun metodo.',
        required_error: 'El metodo de pago es requerido.'
    }),
    reference: zod.string({
        invalid_type_error: 'La referencia debe ser una cadena de texto.',
        message: 'Ha ocurrido un error con el valor de la referencia.'
    }),
    amoutBolivar: zod.coerce.number({
        invalid_type_error: 'La cantidad en bolivares debe ser un numnero',
        message: 'Ha ocurrido un error con valor en bolivares.'
    }).nonnegative(),
    amoutDolar: zod.coerce.number({
        invalid_type_error: 'La cantidad en dolares debe ser un numnero',
        message: 'Ha ocurrido un error con valor en dolares.'
    }).nonnegative(),
    saintInvoice: zod.coerce.number({
        invalid_type_error: 'La cantidad en dolares debe ser un numnero',
        message: 'Ha ocurrido un error con valor en dolares.'
    }).nonnegative().optional(),
    receptionId: zod.coerce.number({
        invalid_type_error: 'El id de la recepcion debe ser un numero entero',
        message: 'Ha ocurrido un error con valor de receptionId.'
    }).positive()
})

export function validatePayment(input) {
    return paymentSchema.safeParse(input)
}

export function validatePartialPayment(input) {
    return paymentSchema.partial().safeParse(input)
}