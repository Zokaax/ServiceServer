export const BaseController = (Model) => {
    return class {
        static async getAll(req, res, next) {
            const { ids } = req.query


            //verificar si hay varios ids
            if (ids){

                try {
    
                    const idsArray = ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    
                    if (idsArray.length === 0) {
                        next({
                            status: 400,
                            message: 'La lista de IDs proporcionada no es válida.'
                        });
                        return;
                    }
                    
                    const elements = await Model.db(Model.tableName).whereIn('id', idsArray).select('*');
                    return res.json(elements);
                } catch (error) {
                    next({
                        status: 500,
                        message: `Error al obtener ${Model.tableName} por IDs`,
                        error
                    });
                    return;
                }
            }
            try {
                const elements = await Model.getAll();
                res.json({
                    success: true,
                    data: elements
                });
            } catch (error) {
                next({
                    status: 500,
                    message: `Error al obtener elementos de ${Model.tableName}`,
                    error
                });
            }
        }

        static async getDataById(req, res, next) {
            const id = req.params.id;
            try {
                const data = await Model.getById(id);
                if (!data) {
                    next({
                        status: 404,
                        message: `No se encontró el elemento con ID: ${id}`
                    });
                    return;
                }
                res.json({
                    success: true,
                    data
                });
            } catch (error) {
                next({
                    status: 500,
                    message: `Error al obtener elemento de ${Model.tableName}`,
                    error
                });
            }
        }

        static async addData(req, res, next) {
            const dataToPost = req.body;
            try {
                const element = await Model.create(dataToPost);
                res.status(201).json({
                    success: true,
                    data: { "id": element[0],
                            ...dataToPost
                    }
                    
                });
            } catch (error) {
                next({
                    status: 500,
                    message: `Error al agregar elemento a ${Model.tableName}`,
                    error
                });
            }
        }


        static async updateData(req, res, next) {
            const id = req.params.id;
            const newData = req.body;

            try {
                const rowsAffected = await Model.update(id, newData);

                if (rowsAffected === 0) {
                    // console.log(`Actualización fallida: Elemento con ID ${id} no encontrado en ${Model.tableName}.`);
                    return next({
                        status: 404,
                        message: `No se encontró el elemento con ID: ${id} para actualizar.`
                    });
                }

                const updatedItem = await Model.getById(id); 
                res.status(200).json({
                    success: true,
                    message: `Elemento actualizado en ${Model.tableName}`,
                    data: {"id":id,
                        ...updatedItem
                    }
                });

            } catch (error) {
                console.error(`Error al actualizar elemento con ID ${id} en ${Model.tableName}:`, error);
                return next({ 
                    status: 500,
                    message: `Error al actualizar elemento en ${Model.tableName}`,
                    error
                });
            }
        }

        static async deleteData(req, res, next) {
            const id = req.params.id;
            try {
                const deletedData = await Model.delete(id);
                if (!deletedData) {
                    next({
                        status: 404,
                        message: `No se encontró el elemento con ID: ${id}`
                    });
                    return;
                }
                res.json({
                    success: true,
                    message: `Elemento eliminado de ${Model.tableName}`
                });
            } catch (error) {
                next({
                    status: 500,
                    message: `Error al eliminar elemento de ${Model.tableName}`,
                    error
                });
            }
        }
    }
}