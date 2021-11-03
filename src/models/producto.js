import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import ProductoFactura from "./productofactura";


const Producto = sequelize.define('productos', {
    productoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    descripcion: {
        type: Sequelize.TEXT
    },
    precio: {
        type: Sequelize.DECIMAL
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

Producto.hasMany(ProductoFactura, {foreignKey: {name: 'productoid', allowNull: false}});
ProductoFactura.belongsTo(Producto, {foreignKey: {name: 'productoid'}});

export default Producto;