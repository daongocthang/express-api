import { Sequelize } from 'sequelize';
import { dbConfig as cnf } from '../config';
import { Task } from './task.model';
const sequelize = new Sequelize(cnf.DB, cnf.USER, cnf.PASSWORD, {
    host: cnf.HOST,
    dialect: cnf.dialect,
    port: cnf.port,
    operatorsAliases: false,
    pool: cnf.pool,
});

const models = {};
models.sequelize = sequelize;
models.Task = Task(sequelize);

export default models;
