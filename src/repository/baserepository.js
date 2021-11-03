export async function GetAllItems(T){
    const items = await T.findAll();
    return items;
}

export async function GetAllItemsWithRelations(T, relation){
    const items = await T.findAll({
        include: relation
    });
    return items;
}

export async function GetItemByID(T, id, idTable){
    const where = {};
    where[idTable] = id;
    const item = await T.findOne({
        where: where
    });
    return item;
}

export async function GetItemByIDWithRelation(T, id, idTable, relation){
    const where = {};
    where[idTable] = id;
    const item = await T.findOne({
        include: relation,
        where: where
    });
    return item;
}

export async function CreateItem(T, params, fields){
    try {
        const itemCreated = await T.create(params,{
            fields: fields
        });

        if(itemCreated) {
            return {
                message: 'Se ha añadido correctamente',
                status: 200,
                data: itemCreated
            };
        }
    } catch (error) {
        return {
            message: `Ha ocurrido un error ${error}`,
            status: 500
        };
    }

    return response;
}

export async function DeleteItemByID(T, id, idTable){
    const where = {};
    where[idTable] = id;
    const itemFind = await GetItemByID(T,id,idTable);

    if(itemFind){
        const item = await T.destroy({
            where: where
        });
        return 'Registro eliminado correctamente'
    }
    else {
        return 'Registro no encontrado'
    }
}

export async function UpdateItemByID(T, id, idTable, params, fields){

    const itemFind = await GetItemByID(T,id,idTable);

    if(itemFind){
        try {
            const itemUpdated = await itemFind.update(params,{
                fields: fields
            });
    
            if(itemUpdated) {
                return {
                    message: 'Se ha modificado correctamente',
                    status: 200,
                    data: itemUpdated
                };
            }
        } catch (error) {
            return {
                message: `Ha ocurrido un error ${error}`,
                status: 500
            };
        }
    }
    else{
        return{
            message: 'El registro no existe',
            status: 400
        };
    }
}