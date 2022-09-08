const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('SELECT * FROM produtos;',
            [req.body.preco, req.body.nome],
            (error, resultado, fields) => {
                conn.release();
           }
        )
    })
});
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    mysql.getConnection((error, conn) => {
        conn.query('INSERT INTO produtos (preco, nome) VALUES (?,?)',
            [req.body.preco, req.body.nome],
            (error, resultado, fields) => {
                conn.release();
            }
        )
    })
    res.status(500).send({
        mensagem: 'produto',
        id_produto: resultado.insertId
    })

})
router.get('/:id_produto', (req, res, net) => {
    mysql.getConnection((error, conn) => {
        conn.query('SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) { res.status(400).send({ error: error }) }
            }
        )
    })

})

module.exports = router;

