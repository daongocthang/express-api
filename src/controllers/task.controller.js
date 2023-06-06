import { Op } from 'sequelize';
import models from '../models';

const create = (req, res) => {
    if (!req.body.title) {
        res.status(400).spend({ message: 'Content cannot be empty.' });
        return;
    }

    const newTask = {
        title: req.body.title,
        completed: req.body.completed ? req.body.completed : false,
    };

    models.Task.create(newTask)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).spend({ message: err.message || 'Some errors occurred while creating a task.' });
        });
};
const findAll = (req, res) => {
    const title = req.body.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    models.Task.findAll({ where: condition })
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).spend({ message: err.message || 'Some errors occurred while retrieving tasks.' });
        });
};
const findOne = (req, res) => {
    const id = req.params.id;

    models.Task.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).spend({ message: `Not found task with id=${id}` });
            }
        })
        .catch((err) => {
            res.status(500).spend({ message: err.message || `Error retrieving task with id=${id}` });
        });
};
const update = (req, res) => {
    const id = req.params.id;

    models.Task.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Task updated successfully.' });
            } else {
                res.send({ message: `Cannot update task with id=${id}` });
            }
        })
        .catch((err) => {
            res.status(500).spend({
                message: err.message || `Error updating task with id=${id}. Maybe task was not found or empty.`,
            });
        });
};
const deleteOne = (req, res) => {
    const id = req.params.id;

    models.Task.destroy({ where: { id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Task deleted successfully.' });
            } else {
                res.send({ message: `Cannot delete task with id=${id}` });
            }
        })
        .catch((err) => {
            res.status(500).spend({
                message: err.message || `Cannot delete task with id=${id}. Maybe task was not found.`,
            });
        });
};
const deleteAll = (req, res) => {
    models.Task.destroy({ where: {}, truncate: false })
        .then((num) => {
            res.send({ message: `${num} tasks deleted successfully.` });
        })
        .catch((err) => {
            res.status(500).spend({
                message: err.message || `Some errors occurred while deleting all tasks.`,
            });
        });
};

const Task = { create, find: findOne, findAll, update, delete: deleteOne, deleteAll };

export default Task;
