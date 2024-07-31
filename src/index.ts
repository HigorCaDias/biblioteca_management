// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database';
import mainRoutes from './routes/mainRoutes';
import './models/associations';
import validateModel from './scripts/validateModel'

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(mainRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
      validateModel()
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });
