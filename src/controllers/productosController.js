import { GetAllProductos, GetProductoByID, CreateProducto, DeleteProductoByID, UpdateProductoByID  } from "../repository/productosRepository";
import {GetResponse} from "../helpers/responseHelper"


export async function GetAll(request, response){
    const productos = await GetAllProductos();
    response.json(productos);
}

export async function GetByID(request, response){
    const {id} = request.params;
    const producto = await GetProductoByID(id);
    response.json(producto);
}

export async function Create(request, response){
    const {tipoproductoid,nombre, descripcion, precio} = request.body;

    const res = await CreateProducto(tipoproductoid,nombre, descripcion, precio);
    response = GetResponse(res,response);
}

export async function DeleteByID(request, response){
    const {id} = request.params;
    const message = await DeleteProductoByID(id);

    response.json({
        message: message
    });
}

export async function UpdateByID(request, response){
    const {id} = request.params;

    const {tipoproductoid,nombre, descripcion, precio} = request.body;

    const resData = await UpdateProductoByID(id, tipoproductoid, nombre, descripcion, precio);

    response = GetResponse(resData,response);
}


