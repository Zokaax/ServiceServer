import zod from 'zod'

export const querySchema = zod.object({
  ids: zod.preprocess(
      (val) => (val === undefined || val === null || val === '') ? null : val,

      zod.string({ invalid_type_error: 'El parámetro ids debe ser una lista de números separados por comas.'})
      .trim()
      .transform(str => str.split(','))
      .pipe( 
          zod.array( 
              zod.coerce.number({ invalid_type_error: 'Cada ID en la lista debe ser un número válido'})
              .int({ message: 'Cada ID en la lista debe ser un número entero.' })
              .positive({ message: 'Cada ID en la lista debe ser un número positivo.' })))
      .nullable() 
      .optional()
  ),
    // Si tienes otros parámetros de query esperados (ej. ?page=1&limit=10), los defines aquí:
    // page: z.coerce.number().int().positive().optional(),
    // limit: z.coerce.number().int().positive().optional(),
})

export function validateRawQuerys(query) {
  return  querySchema.partial().safeParse(query);
}
