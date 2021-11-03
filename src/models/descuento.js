import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import DescuentoAplicado from "./descuentoaplicado";
import ReglaDescuento from "./reglaDescuento";

const Descuento = sequelize.define('descuentos', {
    descuentoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    tipo: {
        type: Sequelize.TEXT
    },
    valor: {
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

Descuento.hasMany(ReglaDescuento, {foreignKey: {name: 'descuentoid', allowNull: false}});
ReglaDescuento.belongsTo(Descuento, {foreignKey: {name: 'descuentoid'}});

Descuento.hasMany(DescuentoAplicado, {foreignKey: {name: 'descuentoid', allowNull: false}});
DescuentoAplicado.belongsTo(Descuento, {foreignKey: {name: 'descuentoid'}});

export default Descuento;