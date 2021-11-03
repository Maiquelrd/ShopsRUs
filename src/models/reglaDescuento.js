import {Sequelize} from "sequelize";
import {sequelize} from "../database/database";


const ReglaDescuento = sequelize.define('reglasdescuentos', {
    regladescuentoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    criterio: {
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

export default ReglaDescuento;