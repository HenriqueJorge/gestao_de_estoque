const produtoRepository = require('../repository/produtoRepository')

const regex = new RegExp(/[^A-z]/g)

function UserException(message) {
   this.message = message;
   this.name = "UserException";
}

const produtoService = {
    adicionarProduto: (produto) => {
        let novo = {nome: '',valor: 0}
        
        if(regex.test(produto.nome)) {
          throw new UserException()  
        }else{
          novo.nome = produto.nome;  
        }
        
        if(produto.valor < 0 ){
          throw new UserException()  
        }else{
          novo.valor = produto.valor;  
        }   
        produtoRepository.adicionar(novo)
    }
    
}

module.exports = produtoService;