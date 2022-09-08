const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

app.use('/',(req, res, next) =>{
    res.status(201).send({
        mensagem: 'deu certo'
    })
})


app.use((req,res,next) =>{
    const erro = new Error('nao encontrado')
    erro.status = 404
    next(erro)
})

app.use((error,req,res,next) =>{
    res.status(500)
    return res.send({
        status:{
            mensagem: 'dados enviados'
        }
    })
})

module.exports = app;