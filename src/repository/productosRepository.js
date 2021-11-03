import Producto from "../models/producto";
import { GetAllItemsWithRelations, GetItemByIDWithRelation, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'
import TipoProducto from "../models/tipoproducto";

const relation = [TipoProducto];
const fields = ['tipoproductoid','nombre', 'descripcion', 'precio','fechacreacion', 'activo'];

export async function GetAllProductos(){
    const productos = await GetAllItemsWithRelations(Producto, relation);
    return productos;
}

export async function GetProductoByID(id){
    const producto = await GetItemByIDWithRelation(Producto,id,'productoid', relation);
    return producto;
}

export async function CreateProducto(tipoproductoid,nombre, descripcion, precio){

    const params = GetParams(tipoproductoid,nombre, descripcion, precio);

    return await CreateItem(Producto, params,fields);
}

export async function DeleteProductoByID(id){
    return await DeleteItemByID(Producto,id,'productoid');
}

export async function UpdateProductoByID(id,tipoproductoid,nombre, descripcion, precio){
    
    const params = GetParams(tipoproductoid,nombre, descripcion, precio);

    return await UpdateItemByID(Producto,id,'productoid',params,fields);
}

function GetParams(tipoproductoid,nombre, descripcion, precio){
    return {
        tipoproductoid: tipoproductoid,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}