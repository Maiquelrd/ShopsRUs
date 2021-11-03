import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import ReglaDescuento from "./reglaDescuento";

const Regla = sequelize.define('reglas', {
    reglaid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
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

Regla.hasMany(ReglaDescuento, {foreignKey: {name: 'reglaid', allowNull: false}});
ReglaDescuento.belongsTo(Regla, {foreignKey: {name: 'reglaid'}});

export default Regla;