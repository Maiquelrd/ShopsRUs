import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";
import DescuentoAplicado from "./descuentoaplicado";

import ProductoFactura from "./productofactura";

const Factura = sequelize.define('facturas', {
    facturaid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    totalcrudo: {
        type: Sequelize.DECIMAL
    },
    totaldescuento: {
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

Factura.hasMany(ProductoFactura, {foreignKey: {name: 'facturaid', allowNull: false}});
ProductoFactura.belongsTo(Factura, {foreignKey: {name: 'facturaid'}});

Factura.hasMany(DescuentoAplicado, {foreignKey: {name: 'facturaid', allowNull: false}});
DescuentoAplicado.belongsTo(Factura, {foreignKey: {name: 'facturaid'}});

export default Factura;