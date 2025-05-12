import zod from 'zod'

const paymentSchema = zod.object({
  method: zod.string({
    invalid_type_error: 'El pago debe registrarse bajo algun metodo.',
    required_error: 'El metodo de pago es requerido.'
  }),
  reference: zod.number(),
  amoutBolivar: zod.number().positive(),
  amoutDolar: zod.number().positive(),
  saintInvoice: zod.number(),
  receptionId: zod.number().positive()
})

export function validatePayment (input) {
  return paymentSchema.safeParse(input)
}

export function validatePartialPayment (input) {
  return paymentSchema.partial().safeParse(input)
}
