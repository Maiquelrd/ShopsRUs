import {config} from 'dotenv'
config();

export default{
    port: process.env.PORT || 3000,
    dbServer: process.env.DBSERVER,
    dbUser: process.env.DBUSER,
    dbPassword: process.env.DBPASSWORD,
    dbHost: process.env.DBHOST
}