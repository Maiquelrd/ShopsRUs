import Descuento from "../models/descuento";
import ReglaDescuento from "../models/reglaDescuento";
import Regla from "../models/regla";
import { GetAllItemsWithRelations, GetItemByIDWithRelation, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'

const relation = [{model: ReglaDescuento},{model: ReglaDescuento, include: [{model: Regla}]}];
const fields = ['nombre','tipo', 'valor', 'fechacreacion','activo'];

export async function GetAllDescuentos(){
    const descuentos = await GetAllItemsWithRelations(Descuento,relation);
    return descuentos;
}

export async function GetDescuentoByID(id){
    const descuento = await GetItemByIDWithRelation(Descuento,id,'descuentoid', relation);
    return descuento;
}

export async function CreateDescuento(nombre,tipo,valor){
    const params = GetParams(nombre,tipo,valor);

    return await CreateItem(Descuento, params,fields);
}

export async function DeleteDescuentoByID(id){
    return await DeleteItemByID(Descuento,id,'descuentoid');
}

export async function UpdateDescuento(id,nombre,tipo,valor){
    const params = GetParams(nombre,tipo,valor);

    return await UpdateItemByID(Descuento,id,'descuentoid',params,fields);
}

function GetParams(nombre,tipo,valor){
    return {
        nombre: nombre,
        tipo: tipo,
        valor: valor,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    }; 
}
