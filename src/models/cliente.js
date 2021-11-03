import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import Factura from "./factura";

const Cliente = sequelize.define('clientes', {
    clienteid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombres: {
        type: Sequelize.TEXT
    },
    apellidos: {
        type: Sequelize.TEXT
    },
    fechanacimiento: {
        type: Sequelize.DATE
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


Cliente.hasMany(Factura, {foreignKey: {name: 'clienteid', allowNull: false}});
Factura.belongsTo(Cliente, {foreignKey: {name: 'clienteid'}});


export default Cliente;