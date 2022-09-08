const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) =>{
    const pedido = {
        id_pedido: req.body.id_pedido,
        quantidade: req.body.quantidade
    }
    res.status(200).send({
        mensagem: 'usango get na rota de pedidos'
    })
})
router.post('/', (req,res,next) => {
    res.status(201).send({mensagem: 'usando post na rota de pedidos'})
})

module.exports = router