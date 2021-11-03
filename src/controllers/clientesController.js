import { CreateCliente, DeleteClienteByID, GetAllClientes, GetClienteByID, UpdateClienteByID } from "../repository/clientesRepository";
import {GetResponse} from "../helpers/responseHelper"

export async function GetAll(request, response){
    const clientes = await GetAllClientes();
    response.json(clientes);
}

export async function GetByID(request, response){
    const {id} = request.params;
    const cliente = await GetClienteByID(id);
    response.json(cliente);
}

export async function Create(request, response){
    const {tipoclienteid,nombres, apellidos, fechaNacimiento} = request.body;

    const res = await CreateCliente(tipoclienteid,nombres, apellidos, fechaNacimiento);
    response = GetResponse(res,response);
}

export async function DeleteByID(request, response){
    const {id} = request.params;
    const message = await DeleteClienteByID(id);

    response.json({
        message: message
    });
}

export async function UpdateByID(request, response){
    const {id} = request.params;

    const {tipoclienteid,nombres, apellidos, fechaNacimiento} = request.body;

    const resData = await UpdateClienteByID(id, tipoclienteid,nombres, apellidos, fechaNacimiento);

    response = GetResponse(resData,response);
}


