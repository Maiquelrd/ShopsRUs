import Factura from "../models/factura";
import ProductoFactura from "../models/productofactura";
import Producto from "../models/producto";
import Descuento from "../models/descuento";
import DescuentoAplicado from "../models/descuentoaplicado";
import { GetAllItemsWithRelations, GetItemByIDWithRelation, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'
import Cliente from "../models/cliente";
import TipoCliente from "../models/tipocliente"
import TipoProducto from "../models/tipoproducto"

const relation = [{model: ProductoFactura},{model: ProductoFactura, include: [{model: Producto},{model: Producto, include: [{model: TipoProducto}]}]},{model: DescuentoAplicado},{model: DescuentoAplicado, include: [{model: Descuento}]},{model: Cliente},{model: Cliente, include: [{model: TipoCliente}]}];
const fields = ['clienteid','totalcrudo', 'totaldescuento', 'fechacreacion','activo'];

export async function GetAllFacturas(){
    const facturas = await GetAllItemsWithRelations(Factura,relation);
    return facturas;
}

export async function GetFacturaByID(id){
    const factura = await GetItemByIDWithRelation(Factura,id,'facturaid', relation);
    return factura;
}

export async function CreateFactura(clienteid,totalcrudo,totaldescuento){
    const params = GetParams(clienteid,totalcrudo,totaldescuento);

    return await CreateItem(Factura, params,fields);
}

export async function DeleteFacturaByID(id){
    return await DeleteItemByID(Factura,id,'facturaid');
}

export async function UpdateFacturaByID(id,clienteid,totalcrudo,totaldescuento){
    const params = GetParams(clienteid,totalcrudo,totaldescuento);

    return await UpdateItemByID(Factura,id,'facturaid',params,fields);
}

function GetParams(clienteid,totalcrudo,totaldescuento){
    return {
        clienteid: clienteid,
        totalcrudo: totalcrudo,
        totaldescuento: totaldescuento,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}
