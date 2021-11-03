import TipoProducto from "../models/tipoproducto";
import { GetAllItems, GetItemByID, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'

const fields = ['nombre', 'descripcion', 'fechacreacion', 'activo'];

export async function GetAllTiposProductos(){
    const tiposProductos = await GetAllItems(TipoProducto);
    return tiposProductos;
}

export async function GetTipoProductoByID(id){
    const tipoProducto = await GetItemByID(TipoProducto,id,'tipoproductoid');
    return tipoProducto;
}

export async function CreateTipoProducto(nombre, descripcion){

    const params = GetParams(nombre, descripcion);

    return await CreateItem(TipoProducto, params,fields);
}

export async function DeleteTipoProductoByID(id){
    return await DeleteItemByID(TipoProducto,id,'tipoproductoid');
}

export async function UpdateTipoProductoByID(id,nombre, descripcion){
    
    const params = GetParams(nombre, descripcion);

    return await UpdateItemByID(TipoProducto,id,'tipoproductoid',params,fields);
}

function GetParams(nombre, descripcion){
    return {
        nombre: nombre,
        descripcion: descripcion,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}