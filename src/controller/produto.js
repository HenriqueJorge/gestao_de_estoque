const express = require('express');
const router = express.Router();
const produtoRepo = require('../repository/produtoRepository')
const seguranca = require('../util/seguranca.js')

router.get('/',(req,res) => 
    res.json(produtoRepo.todos())
);

router.get('/:id',(req,res) =>
    res.json(produtoRepo.recuperar(parseInt(req.params.id)))
);

router.post('/',  (req,res)=> {
    res.json(produtoRepo.adicionar(req.body))
});

router.put('/:id', (req,res) =>{
    res.json(produtoRepo.alterar(parseInt(req.params.id),req.body))
});

router.delete('/:id', (req,res) => {
    produtoRepo.remover(parseInt(req.params.id))
    res.sendStatus(200)
});

module.exports = router;