import { Task } from '../controllers';
import { Router } from 'express';

const router = Router();

const routes = (app) => {
    router.get('/', Task.findAll);
    router.get('/:id', Task.find);
    router.post('/', Task.create);
    router.put('/:id', Task.update);
    router.delete('/:id', Task.delete);
    router.delete('/', Task.deleteAll);

    app.use('/api/v1/task', router);
};

export default routes;
