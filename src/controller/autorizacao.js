const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const constantes = require('../config/constantes.js')
const usuarioRepository = require('../repository/usuarioRepository.js')

router.post('/login', (req,res) => {
    let u = usuarioRepository.recuperar(req.body.email);
    if(req.body.email === u.email && 
        req.body.password === 'a'){

            var token = jwt.sign({payload}, constantes.JWT_SECRET,{
                expiresIn: 300
            })

            res.status(200).send({ auth: true, token: token})
        } else {
            res.status(500).send('Login Invalido!')
        }
})

module.exports = router;
