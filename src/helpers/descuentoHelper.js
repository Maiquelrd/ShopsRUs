import { GetAllDescuentos} from "../repository/descuentosRepository"
import { UpdateFacturaByID } from "../repository/facturasRepository";
import {DivideString, UpperCase} from "./stringHelper"
import {Percentage} from './numberHelper'
import {CreateDescuentoAplicado} from '../repository/descuentosaplicados'
import {GetAge} from '../helpers/dateHelper'

let facturaData;
let productosfacturas;
let cliente;
let tipoCliente;
let availableDiscounts = [];
let discountsApplied = [];
let productos = [];
let precioDescuento = 0.00;


export async function GetDescuentosForFactura(factura){
    facturaData = factura.dataValues;
    productosfacturas = JSON.parse(JSON.stringify(facturaData.productosfacturas));
    cliente = facturaData.cliente.dataValues;
    tipoCliente = JSON.parse(JSON.stringify(cliente.tiposcliente));
    availableDiscounts = [];
    discountsApplied = [];
    productos = [];
    precioDescuento = 0.00;

    const descuentos = await GetDescuentos();

    for(const descuento of descuentos)
    {
        await TomarDescuento(descuento);
    };

    productosfacturas.forEach(producto => {
        productos.push(producto.producto);
    });

    ApplyDiscounts();

    await UpdateFacturaByID(facturaData.facturaid,facturaData.clienteid,facturaData.totalcrudo,precioDescuento);




    for(const discountID of discountsApplied)
    {
        await CreateDescuentoAplicado(facturaData.facturaid, discountID);
    };
    

}

async function GetDescuentos(){
    let descuentos = await GetAllDescuentos();
    
    return JSON.parse(JSON.stringify(descuentos));

}


async function TomarDescuento(descuento){
    let rulesResults = []; 
    
    for(const regladescuento of descuento.reglasdescuentos)
    {
        rulesResults.push(await SatisfyRule(regladescuento));
    };

    const checker = rulesResults.every(v => v === true);

    if(checker){
        availableDiscounts.push(descuento);
    }

}

async function SatisfyRule(regladescuento){
    
    const ruleName = UpperCase(regladescuento.regla.nombre);
    const criterio = regladescuento.criterio;
    let productsResults = [];

    
    switch(ruleName){
        case UpperCase("Por tipo de cliente"):
            return CheckCriteria(criterio,tipoCliente.nombre);
            break;
        case UpperCase("Por nombre de cliente"):
            return CheckCriteria(criterio,cliente.nombres);
            break;
        case UpperCase("Por apellido de cliente"):
            return CheckCriteria(criterio,cliente.apellidos);
            break;
        case UpperCase("Por edad de cliente"):
            return CheckCriteria(criterio,GetAge(cliente.fechanacimiento));
            break;
        case UpperCase("Por tiempo en la tienda del cliente"):
            return CheckCriteria(criterio,GetAge(cliente.fechacreacion));
            break;
        case UpperCase("Por cantidad total factura"):
            return CheckCriteria(criterio,facturaData.preciocrudo);
            break;
        case UpperCase("Por fecha actual"):
            return CheckCriteria(criterio,GetCurrentDateTime());
            break;
        case UpperCase("Por tipo de producto"):
            productsResults = [];
            productos.forEach(producto => {
                productsResults.push(CheckCriteria(criterio,producto.tiposproducto.nombre));
            });
            return productsResults.every(v => v === true);
            break;
        case UpperCase("Por nombre de producto"):
            productsResults = [];
            productos.forEach(producto => {
                productsResults.push(CheckCriteria(criterio,producto.tiposproducto.nombre));
            });
            return productsResults.every(v => v === true);
            break;
        default:
            return false;
            break;
    }

}

function CheckCriteria(criteria,dataCheck){
    
    const criteriaSeparated = DivideString(criteria,'|');

    const operator = criteriaSeparated[0];
    const criteriaCheck = criteriaSeparated[1] != undefined  ? UpperCase(criteriaSeparated[1]) : undefined;
    dataCheck = UpperCase(dataCheck);

    switch(operator){
        case "<":
            if(dataCheck<parseFloat(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        case ">":
            if(dataCheck>parseFloat(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        case "<=":
            if(dataCheck<=parseFloat(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        case ">=":
            if(dataCheck>=parseFloat(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        case "=":
            if(dataCheck==UpperCase(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        case "!=":
            if(dataCheck!=parseFloat(criteriaCheck)){
                return true;
            }
            else{
                return false;
            }
        default:
            return true;
    }

}


function ApplyDiscounts(){

    const descuentosPorcentuales = availableDiscounts.map(function(v){
        if(v.tipo == 'Porcentual'){
            return v;
        }
     }).filter(function(x) {return x !== undefined;});

     const descuentosCadax = availableDiscounts.map(function(v){
        if(DivideString(v.tipo,' ')[0] == "Cada"){
            return v;
        }
     }).filter(function(x) {return x !== undefined;});

     const descuentosPlanos = availableDiscounts.map(function(v){
        if(v.tipo == 'Plano'){
         return v;
        }
     }).filter(function(x) {return x !== undefined;});

     if(descuentosPorcentuales.length > 0){
        var maxDescuentoPorcentual = descuentosPorcentuales.reduce(function(prev, current) {
            if (+parseFloat(current.valor) > +parseFloat(prev.valor)) {
                return current;
            } else {
                return prev;
            }
        });
    
        if(maxDescuentoPorcentual){
            for(const producto of productos)
            {
                
                if(producto.tiposproducto.nombre != 'Comestible'){
                    precioDescuento = precioDescuento + parseFloat(producto.precio)- Percentage(maxDescuentoPorcentual.valor,producto.precio);
                }else{
                    precioDescuento = precioDescuento + parseFloat(producto.precio);
                }
            };
            discountsApplied.push(maxDescuentoPorcentual.descuentoid);
        }
     }
    else{
        precioDescuento = facturaData.totalcrudo;
    }

    for(const descuento of descuentosCadax)
    {
        const timesNumber = Math.trunc(precioDescuento/parseInt(DivideString(descuento.tipo,' ')[1]));
        precioDescuento = precioDescuento - (timesNumber * descuento.valor);
        discountsApplied.push(descuento.descuentoid);
    };

    for(const descuento of descuentosPlanos)
    {
        precioDescuento = precioDescuento - descuento.valor;
        discountsApplied.push(descuento.descuentoid);
    };
}
