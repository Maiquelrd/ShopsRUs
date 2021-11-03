import { GetAllTiposProductos, GetTipoProductoByID, CreateTipoProducto, DeleteTipoProductoByID, UpdateTipoProductoByID } from "../repository/tipoProdcutoRepository";
import {GetResponse} from "../helpers/responseHelper"

export async function GetAll(request, response){
    const tiposProductos = await GetAllTiposProductos();
    response.json(tiposProductos);
}

export async function GetByID(request, response){
    const {id} = request.params;
    const tipoProducto = await GetTipoProductoByID(id);
    response.json(tipoProducto);
}

export async function Create(request, response){
    const {nombre, descripcion} = request.body;

    const res = await CreateTipoProducto(nombre,descripcion);
    response = GetResponse(res,response);
}

export async function DeleteByID(request, response){
    const {id} = request.params;
    const message = await DeleteTipoProductoByID(id);

    response.json({
        message: message
    });
}

export async function UpdateByID(request, response){
    const {id} = request.params;

    const {nombre, descripcion} = request.body;

    const resData = await UpdateTipoProductoByID(id, nombre, descripcion);

    response = GetResponse(resData,response);
}


