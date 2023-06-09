import express from 'express';
import cors from 'cors';
import models from './src/models';
import routes from './src/routes';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env.sample' });
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

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
