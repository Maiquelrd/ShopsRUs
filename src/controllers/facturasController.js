import Cliente from "../models/cliente";
import Producto from "../models/producto";
import { GetItemByID } from "../repository/baserepository";
import { GetAllFacturas, GetFacturaByID, CreateFactura, DeleteFacturaByID, UpdateFacturaByID } from "../repository/facturasRepository";
import { CreateProductoFactura } from "../repository/productosfacturasRepository";
import { GetDescuentosForFactura } from "../helpers/descuentoHelper";

export async function GetAll(request, response){
    const facturas = await GetAllFacturas();
    response.json(facturas);
}

export async function GetByID(request, response){
    const {id} = request.params;
    const factura = await GetFacturaByID(id);
    response.json(factura);
}

export async function Create(request, response){
    const {clienteid,productos} = request.body;

    const cliente = await GetItemByID(Cliente,clienteid,'clienteid');

    if(!cliente){
        return response.json('Cliente no encontrado en la base de datos');
    }

    const productosValidos = await ValidProductos(productos);

    if(productosValidos.message != 'Valido'){
        return response.json(productosValidos.message);
    }

    let res = await CreateFactura(clienteid,productosValidos.precio,productosValidos.precio);

    if(res.status != 200){
        return response.status(res.status).json(res);
    }

    for(const productoid of productosValidos.data)
    {
        const productoFacturaRes = await CreateProductoFactura(res.data.dataValues.facturaid,productoid);

        if(productoFacturaRes.status != 200){
            response = GetResponse(productoFacturaRes,response);
            return response;
        }
    };

    let factura = await GetFacturaByID(res.data.dataValues.facturaid);

    await GetDescuentosForFactura(factura);

    factura = await GetFacturaByID(res.data.dataValues.facturaid);

    response.status(200).json({
        message: 'Agregado correctamente',
        factura: factura});
}

export async function DeleteByID(request, response){
    const {id} = request.params;
    const message = await DeleteFacturaByID(id);

    response.json({
        message: message
    });
}

async function ValidProductos(productos){
    let productosIDValidos = [];
    let precioTotal = 0.00;
    let message = 'Valido';

    if(!(Array.isArray(productos))){
        message ='Los productos estan mal';
    }else{
        for(const productoid of productos)
        {
            const producto = await GetItemByID(Producto,productoid,'productoid');
            if(producto){
                productosIDValidos.push(productoid);
                precioTotal = precioTotal + parseFloat(producto.precio);
            }
        };

        if(!(productosIDValidos.length > 0)){
            message ='Los productos introducidos no son validas';
        }
    }

    return {
        data: productosIDValidos,
        precio: precioTotal,
        message: message
    };
}
