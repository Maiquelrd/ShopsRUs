import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import Producto from "./producto";


const TipoProducto = sequelize.define('tiposproductos', {
    tipoproductoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    descripcion: {
        type: Sequelize.TEXT
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



TipoProducto.hasMany(Producto, {foreignKey: {name: 'tipoproductoid', allowNull: false}});
Producto.belongsTo(TipoProducto, {foreignKey: {name: 'tipoproductoid'}});

export default TipoProducto;
