import {Sequelize} from "sequelize";
import config from '../config';

export const sequelize = new Sequelize(
    config.dbServer,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: 'postgres',
        pool:{
            max:5,
            min:0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);