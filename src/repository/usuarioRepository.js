const fs = require('fs');

const ARQUIVO_BD = './database/usuarios.json';

let usuarios = []
let proxId = 0;

const lerDados = () => {
    let arquivos = fs.readFile(ARQUIVO_BD , (err,buf) => {
        let bd = JSON.parse(buf.toString())
        proxId = parseInt(bd.proxId)
        usuarios = bd.usuarios
    })
}

lerDados();

const gravarDados = () =>{
    let bd = {proxId,usuarios}
    fs.writeFile(ARQUIVO_BD, JSON.stringify(bd),(err,data) => {})
}

const getUsuariosIdx = id => usuarios.map(p => p.id).indexOf(id);
const getUsuariosNomex = nome => usuarios.map(p => p.nome).indexOf(nome);

const UsuariosRepository = {
    adicionar: (usuario) => {
        let usuarioN = {
            id: proxId++,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        }
        usuarios.push(usuarioN)
        gravarDados()
        return usuarioN
    },
    recuperar: id => {usuarios[getUsuariosIdx(id)]},
    alterar: (id,novo) => {
        usuarios[getUsuariosIdx(id)] = novo,
        novo.id = id;
        gravarDados()
        return novo
    },
    remover: id => {usuarios.splice(getUsuariosIdx(id),1); gravarDados(); },
    todos: () => usuarios
}

module.exports = UsuariosRepository;