import express from 'express'
import cors from 'cors';
import { fileURLToPath } from 'url';
import * as path from "node:path";
import controller from './controller/controller.js';
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.get('/addMaster.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'addMaster.html'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'style.css'));
});
app.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'client.js'));
});

app.use(controller.app);
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}, сайт доступен по ссылке: http://localhost:${port}/`);
});
