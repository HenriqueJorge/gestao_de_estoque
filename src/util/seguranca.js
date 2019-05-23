const jwt = require('jsonwebtoken');
const constantes = require('../config/constantes.js');
const bcrypt = require('bcrypt');

const seguranca = {
    autorizaJWT: (req,res,next) => {
        if(!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer')
        return res.status(401).send({auth: false, message: 'Token não informado.'})

        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token,constantes.JWT_SECRET, (err,decoded) => {
            if (err)
                return res.status(500).send({
                    auth: false,message: 'Token não autentificado.'
                })

            req.user = {
                username: decoded.username,
                roles: decoded.roles,
                email: decoded.email
            }

            next();
        })
    },
    encripta: (senha, callback) => {
        bcrypt.genSalt(10, (err,salt)=> {
            if (err) callback(err);
            else bcrypt.hash(senha,salt,callback);
        });
    },
    comparaSenha: (senha,hash,callback) => {
        bcrypt.compare(senha,hash, (err,match) => {
            if (err) callback(err);
            else callback(null,match);
        })
    }
}

module.exports = seguranca