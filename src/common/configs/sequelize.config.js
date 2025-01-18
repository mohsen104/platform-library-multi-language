import Sequelize from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = +process.env.DB_PORT;

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    host,
    database,
    user,
    password,
    port,
})

sequelize.authenticate()
    .then(async () => {
        await sequelize.sync({ alter: true });
        console.log('connected to mysql');
    })
    .catch((error) => {
        console.log(error);
    })