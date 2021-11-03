import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";


const ProductoFactura = sequelize.define('productosfacturas', {
    productosfacturaid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechacreacion: {
        type: Sequelize.DATE
    },
    activo: {
        type: Sequelize.BOOLEAN
    }

},{
    timestaps: true,
    createdAt: false,
    updatedAt: false
});

export default ProductoFactura;