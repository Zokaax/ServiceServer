import zod from 'zod'

const clientSchema = zod.object({
  name: zod.string({
    invalid_type_error: 'El nombre del cliente debe ser un string',
    required_error: 'El nombre del cliente es requerido'
  })
  .trim()
  .min(3, {
    message: 'El nombre del cliente es muy corto'}),
  phone: zod.string({
    invalid_type_error: 'El numero de telefono debe ser un string',
    message: 'No se puede encontrar la variable phone'
  })
})

export function validateClient (input) {
  return clientSchema.safeParse(input)
}

export function validatePartialClient (input) {
  return clientSchema.partial().safeParse(input)
}
