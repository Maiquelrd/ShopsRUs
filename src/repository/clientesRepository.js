import Cliente from "../models/cliente";
import { GetAllItemsWithRelations, GetItemByIDWithRelation, CreateItem, DeleteItemByID, UpdateItemByID } from "../repository/baserepository";
import {GetCurrentDateTime} from '../helpers/dateHelper'
import TipoCliente from "../models/tipocliente";

const relation = [TipoCliente];
const fields = ['tipoclienteid','nombres', 'apellidos', 'fechanacimiento','fechacreacion', 'activo'];

export async function GetAllClientes(){
    const clientes = await GetAllItemsWithRelations(Cliente, relation);
    return clientes;
}

export async function GetClienteByID(id){
    const cliente = await GetItemByIDWithRelation(Cliente,id,'clienteid', relation);
    return cliente;
}

export async function CreateCliente(tipoclienteid,nombres, apellidos, fechaNacimiento){

    const params = GetParams(tipoclienteid,nombres, apellidos, fechaNacimiento);

    return await CreateItem(Cliente, params,fields);
}

export async function DeleteClienteByID(id){
    return await DeleteItemByID(Cliente,id,'clienteid');
}

export async function UpdateClienteByID(id,tipoclienteid,nombres, apellidos, fechaNacimiento){
    
    const params = GetParams(tipoclienteid,nombres, apellidos, fechaNacimiento);

    return await UpdateItemByID(Cliente,id,'clienteid',params,fields);
}

function GetParams(tipoclienteid,nombres, apellidos, fechaNacimiento){
    return {
        tipoclienteid: tipoclienteid,
        nombres: nombres,
        apellidos: apellidos,
        fechaNacimiento: fechaNacimiento,
        fechacreacion: GetCurrentDateTime(),
        activo: true
    };
}