import zod from 'zod'

const idSchema = zod.object({
  id: zod.coerce.number({
    invalid_type_error: 'El ID de la URL debe ser un valor numérico'
  })
  .int({ message: 'El ID debe ser un número entero' })
  .positive({ message: 'El ID debe ser un número positivo' })
})

export function validateRawId(id) {
  return idSchema.safeParse(id)
}
