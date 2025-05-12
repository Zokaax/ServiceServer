import zod from 'zod'

const receptionSchema = zod.object({
  saintOrder: zod.string(),
  dateStart: zod.string().date(),
  dateEnd: zod.string().date(),
  clientId: zod.number().positive({
    invalid_type_error: 'El id del cliente debe ser un numero',
    required_error: 'El id del cliente es requerido.'
  }),
  deviceId: zod.number().positive(),
  clientIssue: zod.string(),
  workDone: zod.string(),
  status: zod.string()
})

export function validateReception (input) {
  return receptionSchema.safeParse(input)
}

export function validatePartialReception (input) {
  return receptionSchema.partial().safeParse(input)
}
