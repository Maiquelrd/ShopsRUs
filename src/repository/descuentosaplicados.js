import DescuentoAplicado from "../models/descuentoaplicado";
import { GetAllItems, GetItemByID, CreateItem } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'

const fields = ['descuentoid','facturaid','fechacreacion','activo'];

export async function GetAllDescuentosAplicados(){
    const descuentos = await GetAllItems(ReglaDescuento);
    return descuentos;
}

export async function GetDescuentoAplicadoByID(id){
    const descuento = await GetItemByID(DescuentoAplicado,id,'descuentoaplicadoid');
    return descuento;
}

export async function CreateDescuentoAplicado(facturaid,descuentoid){
    const params = GetParams(facturaid,descuentoid);

    return await CreateItem(DescuentoAplicado, params,fields);
}

function GetParams(facturaid,descuentoid){
    return {
        descuentoid: descuentoid,
        facturaid: facturaid,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}