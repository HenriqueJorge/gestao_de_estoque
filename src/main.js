const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORTA = 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

app.get('/',(req,res) => {res.send('rota principal')})

/*app.use('/auth', require('./controller/autorizacao'));*/
app.use('/produtos', require('./controller/produto'));

app.get('*' , (req,res) => {res.send('404')});

app.listen(PORTA,() => {
    console.log(PORTA)
})