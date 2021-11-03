import Productofactura from "../models/productofactura";
import { GetAllItems, GetItemByID, CreateItem, DeleteItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'

const fields = ['facturaid','productoid','fechacreacion','activo'];

export async function GetAllProductosFacturas(){
    const productosfacturas = await GetAllItems(Productofactura);
    return productosfacturas;
}

export async function GetProductoFacturaByID(id){
    const productofactura = await GetItemByID(Productofactura,id,'productofacturaid');
    return productofactura;
}

export async function CreateProductoFactura(facturaid,productoid){
    const params = GetParams(facturaid,productoid);

    return await CreateItem(Productofactura, params,fields);
}

export async function DeleteReglaDescuentoByID(id){
    return await DeleteItemByID(Productofactura,id,'productofacturaid');
}


function GetParams(facturaid,productoid){
    return {
        facturaid: facturaid,
        productoid: productoid,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}