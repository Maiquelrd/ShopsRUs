import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import Cliente from "./cliente";


const TipoCliente = sequelize.define('tiposclientes', {
    tipoclienteid: {
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

TipoCliente.hasMany(Cliente, {foreignKey: {name: 'tipoclienteid', allowNull: false}});
Cliente.belongsTo(TipoCliente, {foreignKey: {name: 'tipoclienteid'}});

export default TipoCliente;