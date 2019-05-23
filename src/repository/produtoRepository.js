const fs = require('fs')

const ARQUIVO_BD = './database/produtos.json'

let produtos = [];
let proxId = 0;

const lerDados = () => {
    let arquivos = fs.readFile(ARQUIVO_BD, (err,buf)=> {
        let bd = JSON.parse(buf.toString());
        proxId = parseInt(bd.proxId);
        produtos = bd.produtos
    })
}

lerDados();

const gravarDados = () => {
    let bd = { proxId, produtos}
    fs.writeFile(ARQUIVO_BD, JSON.stringify(bd), (err, data) => {})
}

const getProdutoIdx = id => produtos.map(p => p.id).indexOf(id);

const ProdutoRepository = {
    adicionar: (produto) =>{
        let novoP = {
            id: proxId++,
            nome: produto.nome,
            valor: produto.valor
        }
        produtos.push(novoP)
        gravarDados()
        return novoP
    },
    recuperar: id => produtos[getProdutoIdx(id)],
    alterar: (id,novo) =>{ 
        produtos[getProdutoIdx(id)] = novo;
        novo.id = id;
        gravarDados();
        return novo},
    remover: id => {produtos.splice(getProdutoIdx(id),1); gravarDados();},
    todos:() => produtos 
}

module.exports = ProdutoRepository;