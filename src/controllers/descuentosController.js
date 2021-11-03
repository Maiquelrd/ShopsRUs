import Regla from "../models/regla";
import { GetItemByID} from "../repository/baserepository";
import { GetAllDescuentos, GetDescuentoByID, CreateDescuento, DeleteDescuentoByID, UpdateDescuento } from "../repository/descuentosRepository"
import { CreateReglaDescuento, DeleteReglaDescuentoByID} from "../repository/reglasDescuentosRepository"
import {GetResponse} from "../helpers/responseHelper"

export async function GetAll(request, response){
    const descuentos = await GetAllDescuentos();
    response.json(descuentos);
}

export async function GetByID(request, response){
    const {id} = request.params;
    const descuento = await GetDescuentoByID(id);
    response.json(descuento);
}

export async function Create(request, response){
    const {nombre,tipo,valor, reglas} = request.body;

    const reglasValidas = await ValidRules(reglas);

    if(reglasValidas.message != 'Valido'){
        return response.json(reglasValidas.message);
    }

    const res = await CreateDescuento(nombre,tipo,valor);

    if(res.status != 200){
        return response.status(res.status).json(res);
    }

    for(const regla of reglasValidas.data)
    {
        const reglaRes = await CreateReglaDescuento(res.data.dataValues.descuentoid, regla.id,regla.criterio);

        if(reglaRes.status != 200){
            return response.status(reglaRes.status).json(reglaRes);
        }
    };

    const descuento = await GetDescuentoByID(res.data.dataValues.descuentoid);
    
    response.status(200).json(descuento);
}

export async function DeleteByID(request, response){
    const {id} = request.params;
    const message = await DeleteDescuentoByID(id);

    response.json({
        message
    });
}

export async function UpdateByID(request, response){
    const {nombre,tipo,valor} = request.body;
    const {id} = request.params;

    const resData = await UpdateDescuento(id, nombre, tipo, valor);

    response = GetResponse(resData,response);
}

export async function AddRulesByID(request, response){
    const {reglas} = request.body;
    const {id} = request.params;

    const reglasValidas = await ValidRules(reglas);

    if(reglasValidas.message != 'Valido'){
        return response.json(reglasValidas.message);
    }

    for(const regla of reglasValidas.data)
    {
        const reglaRes = await CreateReglaDescuento(id, regla.id,regla.criterio);

        if(reglaRes.status != 200){
            return response.status(reglaRes.status).json(reglaRes);
        }
    };

    const descuento = await GetDescuentoByID(id);
    
    response.status(200).json(descuento);
}

export async function RemoveRulesByID(request, response){
    const {reglas} = request.body;
    const {id} = request.params;

    var reglasDescuentosidsToDelete = await GetReglasDescuentosIDs(reglas);

    for(const reglaDescuentoID of reglasDescuentosidsToDelete)
    {
        await DeleteReglaDescuentoByID(reglaDescuentoID);
    };

    const descuento = await GetDescuentoByID(id);
    
    response.status(200).json(descuento);
}

async function ValidRules(reglas){
    let reglasValidas = [];
    let message = 'Valido';

    if(!(Array.isArray(reglas))){
        message = 'Lass reglas estan mal';
    }else{
        for(const regla of reglas)
        {
            const reglaItem = await GetItemByID(Regla,regla.id,'reglaid');
            if(reglaItem){
                reglasValidas.push(regla);
            }
        };

        if(!(reglasValidas.length > 0)){
            message ='Las reglas introducidas no son validas';
        }
    }

    return {
        data: reglasValidas,
        message: message
    };
}

async function GetReglasDescuentosIDs(reglasvalidas){
    
    const validRulesids = reglasvalidas.map(function(v){
         return v.id;
     });

    return validRulesids;
}




