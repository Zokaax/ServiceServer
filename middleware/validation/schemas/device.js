import zod from 'zod'

const deviceSchema = zod.object({
  type: zod.string({
    invalid_type_error: 'El valor del tipo de dispositivo debe ser un string',
    required_error: 'El tipo de dispositivo es requerido.'
  }),
  brand: zod.string(),
  model: zod.string()
})

export function validateDevice (input) {
  return deviceSchema.safeParse(input)
}

export function validatePartialDevice (input) {
  return deviceSchema.partial().safeParse(input)
}
