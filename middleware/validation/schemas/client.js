import zod from 'zod'

const clientSchema = zod.object({
  name: zod.string().trim().min(3, {
    invalid_type_error: 'El nombre del cliente debe ser un string',
    required_error: 'El nombre del cliente es requerido.'}),
  phone: zod.string()
})

export function validateClient (input) {
  return clientSchema.safeParse(input)
}

export function validatePartialClient (input) {
  return clientSchema.partial().safeParse(input)
}
