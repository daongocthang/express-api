import { DataTypes } from 'sequelize';

export const Task = (sequelize) =>
    sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
        },
        completed: {
            type: DataTypes.BOOLEAN,
        },
    });
