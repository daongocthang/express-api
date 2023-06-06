import express from 'express';
import cors from 'cors';
import models from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

models.sequelize
    .sync()
    .then(() => {
        console.log('Synced database');
    })
    .catch((e) => {
        console.log('Failed to sync database: ' + e.message);
    });

app.get('/', (req, res) => {
    res.json({ message: `Hello from Express` });
});

routes(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
