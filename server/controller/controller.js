import express from 'express';

const app = express.Router();
app.use(express.json());
let count = 1

const test = {
    numberOfOrder:0,
    date:new Date(),
    instruments:'test',
    typeError:'test2',
    description:'Test description',
    client:'rocktintin21',
    status:'готово',
    master:'Не назначен',
    comments:'Нет'
}
const repo = []
repo.push(test);

app.post('/',(req,res)=>{
    const order = req.body;
    const {
        instruments = 'Не указаны',
        typeError = 'Не указана',
        description = 'Нет',
        client = 'Не указан',
        master = 'Не указана',
        comments = 'Нет'
    } = order;
    const correctOrder = {
        numberOfOrder: count++,
        date:new Date(),
        instruments:instruments,
        typeError:typeError,
        description:description,
        client:client,
        status:'В работе',
        master:master,
        comments:comments,
        notification: false,
    }
    repo.push(correctOrder)
    if(order){
        res.send(`OK!`)
    }
})
app.get('/',(req,res)=>{
    res.send(repo)
})

app.put('/changeOrderByParams/:numberOfOrder',(req,res)=>{
    const order = req.body;
    const id = (Number(req.params.numberOfOrder));
    const numberOfRepo = repo.indexOf(repo.find(item => item.numberOfOrder === id));
    const changeNotification = () => {
        repo[numberOfRepo].notification = true;
        repo[numberOfRepo].endTimeOfRepair = new Date();
        repo[numberOfRepo].averageTime = (repo[numberOfRepo].endTimeOfRepair - repo[numberOfRepo].date) / (1000);
    }
    if(numberOfRepo){
        repo[numberOfRepo].master = order.master || repo[numberOfRepo].master;
        repo[numberOfRepo].status = order.status.toLowerCase() === 'готов' ? changeNotification() : order.status = 'в работе';
        repo[numberOfRepo].description = order.description || repo[numberOfRepo].description;
        repo[numberOfRepo].instruments = order.instruments || repo[numberOfRepo].instruments;
        repo[numberOfRepo].typeError = order.typeError || repo[numberOfRepo].typeError;
        repo[numberOfRepo].description = order.description || repo[numberOfRepo].description;
        repo[numberOfRepo].comments = order.comments || repo[numberOfRepo].comments;
        if(order.status){
            res.send('<h1>test!</h1>');
        }else{
            res.send(`OK! ${numberOfRepo}`);
        }
    }
})
app.get('/getOrderByParams/:params', (req, res) => {
    const param = req.params.params;
    const paramAsNumber = isNaN(param) ? param : Number(param);
    let orders = repo.filter(item =>
        item.numberOfOrder === paramAsNumber ||
        item.date === param ||
        item.instruments === param ||
        item.client === param ||
        item.typeError === param ||
        item.description === param ||
        item.status === param ||
        item.master === param ||
        item.comments === param
    );
    if (orders.length > 0) {
        let response = orders.map(item =>
            `
            Номер заявки: ${item.numberOfOrder}, <br>
            Дата: ${item.date}, <br>
            Инструменты: ${item.instruments}, <br>
            Тип ошибки: ${item.typeError}, <br>
            Описание: ${item.description}, <br>
            Клиент: ${item.client}, <br>
            Статус: ${item.status}, <br>
            Мастер: ${item.master}, <br>
            Комментарий: ${item.comments}
            `
        ).join('<br>');
        res.send(response);
    } else {
        res.send('Заказ не найден');
    }
});
app.get('/getStatusOfCount', (req, res) => {
    let orders = repo.filter(item =>
        item.status.toLowerCase() === 'в работе'
    );
    res.send(`Кол-во выполняемых заявок: ${orders.length}`);
});
app.get('/getAverageTime', (req, res) => {
    let orders = repo.filter(item =>
        item.averageTime
    );
    let time = 0
    orders.forEach(order => {time += order.averageTime; console.log(order.averageTime);});
    console.log();
    res.send(`Среднее время выполнения заявок в секундах: ${time / orders.length}`);
});
app.get('/getAverageErrorType', (req, res) => {
    let orders = repo.filter(item =>
        item.averageTime
    );
    let time = 0
    orders.forEach(order => {time += order.averageTime; console.log(order.averageTime);});
    console.log();
    res.send(`Среднее время выыполнения заявок в секундах: ${time / orders.length}`);
});
export default {app}