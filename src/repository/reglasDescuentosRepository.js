import ReglaDescuento from "../models/reglaDescuento";
import Regla from "../models/regla";
import { GetAllItemsWithRelations, GetItemByIDWithRelation, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'

const relation = Regla;
const fields = ['descuentoid','reglaid', 'criterio', 'fechacreacion','activo'];

export async function GetAllReglasDescuentos(){
    const descuentos = await GetAllItemsWithRelations(ReglaDescuento,relation);
    return descuentos;
}

export async function GetReglaDescuentoByID(id){
    const descuento = await GetItemByIDWithRelation(ReglaDescuento,id,'regladescuentoid', relation);
    return descuento;
}

export async function CreateReglaDescuento(descuentoid,reglaid,criterio){
    const params = {
        descuentoid: descuentoid,
        reglaid: reglaid,
        criterio: criterio,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };

    return await CreateItem(ReglaDescuento, params,fields);
}

export async function DeleteReglaDescuentoByID(id){
    return await DeleteItemByID(ReglaDescuento,id,'regladescuentoid');
}

export async function UpdateReglaDescuento(id,descuentoid,reglaid,criterio){
    const params = {
        descuentoid: descuentoid,
        reglaid: reglaid,
        criterio: criterio,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };

    return await UpdateItemByID(ReglaDescuento,id,'regladescuentoid',params,fields);
}
