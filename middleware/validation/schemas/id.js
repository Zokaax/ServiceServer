import zod from 'zod';

// const preprocessIdInput = (value) => {
// 
//   if (value === undefined || value === null) {
//     return undefined;
//   }
//   return value.split(',')
// };

const preprocessIdInput = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  let idStrings = [];

  if (Array.isArray(value)) {
    value.forEach(item => {
      if (typeof item === 'string') {
        idStrings = idStrings.concat(item.split(',').map(s => s.trim()));
      } 
    });
  }
  else if (typeof value === 'string') {
    idStrings = value.split(',').map(s => s.trim());
  } else {
    return undefined;
  }

  const filteredIdStrings = idStrings.filter(s => s.length > 0);
  return filteredIdStrings.length > 0 ? filteredIdStrings : undefined;
};


const idSchema = zod.object({
  id: zod.preprocess( 
    preprocessIdInput, 
    zod.array( 
      zod.coerce.number({ 
        invalid_type_error: 'Cada ID debe ser un valor numérico'
      })
      .int({ message: 'Cada ID debe ser un número entero' })
      .positive({ message: 'Cada ID debe ser un número positivo' })
    ).optional()
  )
});

export function validateRawId(id) {
  return idSchema.safeParse(id)
}