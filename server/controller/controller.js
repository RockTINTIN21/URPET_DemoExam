import express from 'express';

const app = express.Router();
app.use(express.json());
const test = {
    numberOfOrder:0,
    date:'09.09.2024',
    instruments:'test',
    typeError:'test2',
    description:'Test description',
    client:'rocktintin21',
    status:'готово',
    master:'Не назначен'
}
const repo = []
repo.push(test);

app.post('/',(req,res)=>{
    const order = req.body;
    repo.push(order)
    if(order){
        res.send(`OK!`)
    }
})
app.put('/changeOrderByParams/:numberOfOrder',(req,res)=>{
    const order = req.body;
    const id = (Number(req.params.numberOfOrder));
    const numberOfRepo = repo.indexOf(repo.find(item => item.numberOfOrder === id));
    if(numberOfRepo){
        repo[numberOfRepo].master = order.master || repo[numberOfRepo].master;
        repo[numberOfRepo].status = order.status || repo[numberOfRepo].status;
        repo[numberOfRepo].description = order.description || repo[numberOfRepo].description;
        if(order.status){
            res.send('<h1>test!</h1>');
        }else{
            res.send(`OK! ${numberOfRepo}, обновленный элемент в массиве: ${repo[numberOfRepo]}, \n весь массив: ${repo}`);
        }
    }
})
app.get('/',(req,res)=>{
    res.send(repo)
})
app.get('/getOrderByParams/:params',(req,res)=>{
    const param = req.params.params;
    console.log('Запрос пришел, сравниваем с ',param)
    let orders = repo.filter(item =>
        item.numberOfOrder === param ||
        item.date === param ||
        item.instruments === param ||
        item.client === param ||
        item.typeError === param ||
        item.description === param ||
        item.status === param ||
        item.master === param
    );
    console.log('Соответсвующий заказ: ',orders);
    const numberOfRepo = repo.indexOf(repo.find(item=>item === orders));
    console.log('Номер в репо:',numberOfRepo);
    if(numberOfRepo){
        let response = orders.map(item=>
            `
            Номер заявки: ${item.numberOfOrder}, <br>
            Дата: ${item.date}, <br>
            Инструменты: ${item.instruments}, <br>
            Тип ошибки: ${item.typeError}, <br>
            Описание: ${item.description}, <br>
            Клиент: ${item.client}, <br>
            Статус: ${item.status}, <br>
            Мастер: ${item.master}
            `
        ).join('<br>');
        console.log('response:')
        res.send(
            response
        );
    }
})

app.put('/changeOrderByParams/:numberOfOrder',(req,res)=>{
    const order = req.body;
    const id = (Number(req.params.numberOfOrder));
    const numberOfRepo = repo.indexOf(repo.find(item => item.numberOfOrder === id));
    if(numberOfRepo){
        repo[numberOfRepo].master = order.master || repo[numberOfRepo].master;
        repo[numberOfRepo].status = order.status || repo[numberOfRepo].status;
        repo[numberOfRepo].description = order.description || repo[numberOfRepo].description;
        if(order.status){
            res.send('<h1>test!</h1>');
        }else{
            res.send(`OK! ${numberOfRepo}, обновленный элемент в массиве: ${repo[numberOfRepo]}, \n весь массив: ${repo}`);
        }
    }
})
export default {app}