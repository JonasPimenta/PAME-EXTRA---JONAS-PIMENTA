var requisicao = require('readline-sync');

function gerarID(x) {  //Função que gera um ID baseado no cpf do usuario 
    var ID;
    ID = x * 2;
    return ID;
}

function exibirMenuPrincipal() { //Função que exibe o menu principal
    console.log("Bem-vindo ao Sistema de Pedidos!");
    console.log("1. Fazer login");
    console.log("2. Cadastro de cliente");
    console.log("3. Cadastro de funcionário");
    console.log("4. Sair do programa");
}

function exibirMenuFuncionario() { // Função que exibe o menu do funcionario
    console.log("Menu do Funcionário");
    console.log("1. Ver meus dados");
    console.log("2. Modificar meus dados");
    console.log("3. Adicionar produto");
    console.log("4. Ver lista de produtos");
    console.log("5. Excluir produto");
    console.log("6. Editar produto");
    console.log("7. Ver lista de pedidos");
    console.log("8. Mudar status de um pedido");
    console.log("9. Ver lista de clientes")
    console.log("10. Sair");
}

function exibirMenuCliente() {  // Função que exibe o menu do cliente
    console.log("Menu do Cliente");
    console.log("1. Ver meus dados");
    console.log("2. Modificar meus dados");
    console.log("3. Fazer pedido");
    console.log("4. Ver meus pedidos");
    console.log("5. Cancelar pedido");
    console.log("6. Avaliar pedido");
    console.log("7. Visualizar avaliações");
    console.log("8. Sair");
}


class Funcionario {  // Classe contendo os atributos dos funcionarios 
    constructor(ID, nome, cpf, email, senha) {
        this.ID = ID;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente extends Funcionario {  // Classe contendo os atributos dos clientes
    constructor(ID, nome, cpf, email, senha,dataNasc) {
        super(ID, nome, cpf, email, senha);
        this.dataNasc = dataNasc;
    }
}

class Pedido {  // Classe contendo os atributos dos pedidos
    constructor(IDpedido, IDcliente, status, dataPedido, nomeProduto) {
        this.IDpedido = IDpedido;
        this.IDcliente = IDcliente;
        this.status = status;
        this.dataPedido = dataPedido;
        this.nomeProduto = nomeProduto;
    }
}

class Produtos {  // Classe contendo os atributos do funcionario 
    constructor(nome, preco, qntEst, validade, descricao,avaliacao = [] ) {
        this.validade = validade;
        this.preco = parseInt(preco);
        this.qntEst = parseInt(qntEst);
        this.nome = nome;
        this.descricao = descricao;
        this.avaliacao = avaliacao;
        

    }
}

class Sistema { // Classe na qual o programa rodara no entorno 
    constructor() { // Constructor que contem as listas que guardarão as informações necessarias para o programa funcionar 
        this.pedidos = [];
        this.funcionarios = [];
        this.clientes = [];
        this.produtos = [];
    }

    fazerLogin() { // Metodo que pede email e senha e retorna um usuario (cliente ou funcionario)
        var Email = requisicao.question('Digite seu email:\n');
        var Senha = requisicao.question('Digite sua senha:\n');

        for (let i = 0; i < this.clientes.length; i++) {
            if (Email === this.clientes[i].email && Senha === this.clientes[i].senha) {
                console.log("Cliente logado com sucesso!\n");
                let cliente = this.clientes[i];
                return cliente;
            }
        }

        for (let i = 0; i < this.funcionarios.length; i++) {
            if (Email === this.funcionarios[i].email && Senha === this.funcionarios[i].senha) {
                console.log("Funcionário logado com sucesso!\n");
                let funcionario = this.funcionarios[i]
                return this.funcionarios[i];
            }
        }

        if (this.clientes.length === 0 && this.funcionarios.length === 0) {
            console.log("Não há clientes ou funcionários cadastrados.\n");
            return null;
        }

        console.log("Email ou senha incorretos.\n");
        return null;
    }

    cadastroCliente(){ // Metodo que realiza o cadastro de um determinado cliente, criando um novo objeto da classe Cliente e atribuindo suas infos a lista de clientes
        let nome = requisicao.question('Digite seu Nome:\n');
        let cpf = parseInt(requisicao.question('Digite seu cpf:\n'));
        let dataNsc = requisicao.question('Digite sua data de nascimento: [YYYY-MM-DD]\n');
        let email = requisicao.question('Digite seu email:\n');
        let senha = requisicao.question('Escolha uma senha:\n');
        let IDcliente = gerarID(cpf);
        let cliente = new Cliente(IDcliente,nome,cpf,email,senha,dataNsc);
        this.clientes.push(cliente);
        console.log(this.clientes);
        console.log("Cadastro realizado com sucesso!\n");
    }
    
    
    cadastroFuncionario(){ // Metodo que cadastra funcionarios, criando um objeto da classe Funcionarios e atribuindo suas infos a uma lista contendo os funcionarios
        let nome = requisicao.question('Digite seu Nome:\n');
        let cpf = parseInt(requisicao.question('Digite seu cpf:\n'));
        let email = requisicao.question('Digite seu email:\n');
        let senha = requisicao.question('Escolha uma senha:\n');
        let IDfuncionario = gerarID(cpf);
        let funcionario = new Funcionario(IDfuncionario,nome,cpf,email,senha);
        this.funcionarios.push(funcionario);
        console.log("Cadastro realizado com sucesso!\n");
    }
    
    verDadosFuncionario(x){ //Metodo que printa os dados do usuario 
        console.log(x);
    }
    
    modificarDadosFuncionario(x){ //Pergunta ao usuario o dado que ele deseja alterar e logo apos o modifica, passando por um looping que continua ate o usuario desejar sair, caso ele digite outra opção alem de "n" na escolha se deseja alterar novamente, o metodo sera encerrado.
        while (true) {
            let alterar = requisicao.question("Qual dado deseja alterar? (nome, cpf, email, senha) \n");
    
            if (alterar === "nome") {
                x["nome"] = requisicao.question('Digite um novo nome: \n');
            } 
            
            else if (alterar === "cpf") {
                x["cpf"] = requisicao.question("Digite um novo CPF:\n");
            } 
            
            else if (alterar === "email") {
                x["email"] = requisicao.question("Digite um novo email:\n");
            } 
            
            else if (alterar === "senha") {
                x["senha"] = requisicao.question("Digite uma nova senha:\n");
            } 
            
            else {
                console.log("Dado inválido. Por favor, digite um dos seguintes: nome, cpf, email, senha.");
                continue; 
            }
    
            let continuarAlterando = requisicao.question("Deseja alterar outro dado? [s/n] \n");
            
            if (continuarAlterando === "n") {
                console.log("Alterações finalizadas.\n");
                break;
            } 
            
            else if (continuarAlterando !== "s") { 
                console.log("Opção inválida.\n"); 
                break; 
            }
        }
    }
    
    adicionarProduto(){ // Metodo que cria um objeto da classe produto e adiciona a lista de produtos
        let nome = requisicao.question("Digite o nome do produto:\n");   
        let preco = requisicao.question("Digite o preço do produto:\n");
        let estoque = requisicao.question("Digite o numero de produtos em estoque\n");
        let validade = requisicao.question("Digite a validade do produto: \n");
        let descricao = requisicao.question("Digite a descrição do produto:\n");
        var produto = new Produtos (nome, preco, estoque, validade, descricao);
        this.produtos.push(produto);
        console.log ("Produto adicionado com sucesso!\n");
    }
    
    listarProdutos(){ // Metodo que printa a lista de produtos em ordem alfabetica, se baseando no nome do produto
        this.produtos.sort(function(a,b){
            if(a.nome < b.nome) return -1;
            if(a.nome > b.nome) return 1;
            return 0;
        });
        console.log(this.produtos);
        console.log("Produtos listados com sucesso!\n");
    }

    excluirProduto(){ // Metodo que exclui um determinado produto atravez de um looping
        let nome = requisicao.question("Digite o nome do produto a ser excluido:\n");
        for ( let i = 0; i<this.produtos.length; i++){
            if (nome == this.produtos[i].nome){
                this.produtos.splice(i,1);
                console.log("Produto excluido com sucesso!\n");
                return
            }
        }
        console.log('Produto nao encontrado. \n')
    }
    
    editarProduto(){ // Metodo que edita uma determinada informação de um produto selecionado pelo usuario
        let nome = requisicao.question("Digite o nome do produto a ser editado:\n");
            for ( let i = 0; i<this.produtos.length; i++){
                if (nome == this.produtos[i].nome){
                    let produtoEdit = this.produtos[i];
                    while (true) {
                        let alterar = requisicao.question("Qual dado deseja alterar? (nome, preço, estoque, validade, descrição) \n");
                
                        if (alterar === "nome") {
                            produtoEdit["nome"] = requisicao.question('Digite um novo nome: \n');
                        } 
                        
                        else if (alterar === "preço") {
                            produtoEdit["preco"] = requisicao.question("Digite um novo preço:\n");
                        } 
                        
                        else if (alterar === "estoque") {
                            produtoEdit["qntEst"] = requisicao.question("Digite uma nova quantidade em estoque:\n");
                        } 
                        
                        else if (alterar === "validade") {
                            produtoEdit["validade"] = requisicao.question("Digite uma nova validade:\n");
                        } 
                        
                        else if (alterar === "descrição"){
                            produtoEdit["descricao"] = requisicao.question("Digite uma nova descrição para o produto:\n");
                        }
                        else {
                            console.log("Dado inválido. Por favor, digite um dos seguintes: nome, preço, estoque, validade, descrição.");
                            continue; 
                        }
                
                        let continuarAlterando = requisicao.question("Deseja alterar outro dado? [s/n] \n");
                        
                        if (continuarAlterando === "n") {
                            console.log("Alterações finalizadas.\n");
                            return;
                        } 
                        
                        else if (continuarAlterando !== "s") { 
                            console.log("Opção inválida.\n"); 
                            return; 
                        }
                    }}}
        console.log ("Produto nao encontrado.\n");

                }
    
    verListaPedido(){ // Metodo que lista os pedidos em ordem cronologica, pegando as strings de datas e convertendo para o tipo dadta, logo apos subtraindo e utilizando o sort() para ordenar baseado na subtração 
        this.pedidos.sort(function(a,b){
            return (a.dataPedido) - (b.dataPedido);
        });
        console.log(this.pedidos);
        console.log("Pedidos listados com sucesso!\n");
    }

    mudarStatusPedido(){ // Modifica o status de um pedido em especifico, rastreado através do ID do mesmo, possui uma opção de conferir a lista inteira a fim de confirmar o ID correto 
        console.log("Deseja conferir a lista de pedidos a fim de confirmar o ID do pedido que deseja alterar o status?")
        while(true){
            let op = requisicao.question("[s/n]?: ")
            if (op === "n"){
                break
            }
            else if(op === "s"){
                this.verListaPedido()
                break
            }
            else{
                console.log("Digite uma opção válida.")
                continue
            }
        }
        let IDped = parseInt(requisicao.question('Digite o ID do pedido:\n'));
        let novoStatus = requisicao.question("Digite o novo status:\n");
        for (let i = 0; i<this.pedidos.length; i++){
          if (IDped == this.pedidos[i].IDpedido){
            this.pedidos[i].status = novoStatus;
            console.log("Status do pedido alterado \n");
            return;
          }
        }
        console.log("ID do pedido nao encontrado \n");
        

    }

    verListaClientes(){ // Printa a lista de clientes em ordem alfabetica, utilizando do sort para organizar em ordem alfabetica e do maps pra retirar o atributo senha de cada cliente, a fim de manter a segurança dos dados do cliente
        this.clientes.sort(function(a,b){
            if(a.nome < b.nome) return -1;
            if(a.nome > b.nome) return 1;
            return 0;
        });
        let clientesSemSenha = this.clientes.map(function(cliente){
            let {senha, ...resto} = cliente;
            return resto;
        })
        console.log(clientesSemSenha);
        console.log("Clientes listados com sucesso!\n");
    }
    
    verDadosCliente(x){ // Metodo que printa os dados do usuario 
        console.log(x);
    }

    modificarDadosCliente(x){ //Pergunta ao usuario o dado que ele deseja alterar e logo apos o modifica, passando por um looping que continua ate o usuario desejar sair, caso ele digite outra opção alem de "n" na escolha se deseja alterar novamente, o metodo sera encerrado.
        while (true) {
            let alterar = requisicao.question("Qual dado deseja alterar? (nome, cpf, email, senha, dataNasc) \n");
    
            if (alterar === "nome") {
                x["nome"] = requisicao.question('Digite um novo nome: \n');
            } 
            
            else if (alterar === "cpf") {
                x["cpf"] = requisicao.question("Digite um novo CPF:\n");
            } 
            
            else if (alterar === "email") {
                x["email"] = requisicao.question("Digite um novo email:\n");
            } 
            
            else if (alterar === "senha") {
                x["senha"] = requisicao.question("Digite uma nova senha:\n");
            } 
            
            else if (alterar === "dataNasc") {
                x["dataNasc"] = requisicao.question("Digite sua data de nascimento: [YYYY-MM-DD]")
            }

            else {
                console.log("Dado inválido. Por favor, digite um dos seguintes: nome, cpf, email, senha.");
                continue; 
            }
    
            let continuarAlterando = requisicao.question("Deseja alterar outro dado? [s/n] \n");
            
            if (continuarAlterando === "n") {
                console.log("Alterações finalizadas.\n");
                break;
            } 
            
            else if (continuarAlterando !== "s") { 
                console.log("Opção inválida."); 
                break; 
            }
        }
    }
    fazerPedido(x){ // Metodo que realiza um pedido, listando ao usuario os produtos disponiveis, e o perguntando qual deles ele deseja, adicionando a uma lista de pedidos com as informações necessarias 
        this.listarProdutos();
        let produto = requisicao.question("Digite o nome do produto que deseja: ");
        for ( let i = 0; i<this.produtos.length; i++){
            if (produto === this.produtos[i].nome){
                if (this.produtos[i].qntEst === 0){
                    console.log ("Produto fora de estoque\n");
                    return;
                }
                else{
                    this.produtos[i].qntEst -=1;
                    let IDpedido = 2*(new Date()).getTime();
                    let IDcliente = x.ID;
                    let status = "Pedido em andamento";
                    let dataPed = new Date();
                    let Novopedido = new Pedido (IDpedido, IDcliente, status, dataPed, produto);
                    this.pedidos.push(Novopedido);
                    console.log("Pedido realizado com sucesso!\n");
                    return;
                }
        }
    }
        console.log("Produto nao encontrado\n")
}

    verMeusPedidos(x){ //Printa na tela os pedidos de um determinado usuario, rastreando os pedidos atravez do ID do cliente 
        for (let i = 0; i<this.pedidos.length; i++){
            if (x.ID === this.pedidos[i].IDcliente){
                console.log(this.pedidos[i])
            }
        }
        console.log("Pedidos listados com sucesso!(Caso nao tenha aparecido nenhum pedido, nenhum pedido seu foi rastreado.\n")
    }

    cancelarPedido(x){ //Exclui da lista de pedidos pessoal de um determinado cliente o pedido que ele deseja cancelar 
        this.verMeusPedidos(x)
        let pedidoID = requisicao.question("Digite o ID do pedido a ser excluido:\n");
        for (let i = 0; i<this.pedidos.length; i++){
            if (pedidoID == this.pedidos[i].IDpedido){
                this.pedidos.splice(i,1);
                console.log("Pedido cancelado \n");
                break;
    }
    }
    }
    fazerAvaliação(){ // Metodo que acrescenta uma avaliação a um produto  em específico, onde o usuario irá avaliar um produto que tenha pedido anteriormente, o metodo funciona de forma que acrescenta informações a um atributo lista de avaliações que a classe produtos possui
        this.listarProdutos();
        let prodAva = requisicao.question("Digite o produto a ser avaliado: ");
        for (let i = 0; i<this.produtos.length; i++){
            if (prodAva === this.produtos[i].nome){
                let avaliação = requisicao.question("Digite a avaliação que deseja por no produto: ");
                this.produtos[i].avaliacao.push(avaliação);
                console.log ("Avaliação realizada com sucesso!\n");
                return;
            }
        }
        console.log ("Produto nao encontrado!");
    }

    verAvaliação(){ // Metodo que printa todos os produtos disponivéis, nele terá todas as avaliações postas anteriormente no programa.
        console.log (this.listarProdutos());
    }
    
    menu() { //Metodo que roda o programa como um todo, printando o menu e apresentando as opções de forma interativa com o usuario, chamando os metodos anteriores quando necessario.
        while (true) { 
            exibirMenuPrincipal();
            let opPrincipal = parseInt(requisicao.question("Digite uma opção: "));

            if (opPrincipal === 1) {
                const usuarioLogado = this.fazerLogin();
                if (usuarioLogado instanceof Cliente) {
                    while(true){
                        exibirMenuCliente();
                        let opMenuCliente = parseInt(requisicao.question("Digite uma opção: "));
                        if (opMenuCliente === 1){
                            this.verDadosCliente(usuarioLogado);
                        }
                        else if (opMenuCliente === 2){
                            this.modificarDadosCliente(usuarioLogado);
                        }
                        else if (opMenuCliente === 3){
                            this.fazerPedido(usuarioLogado);
                        }
                        else if (opMenuCliente === 4){
                            this.verMeusPedidos(usuarioLogado);
                        }
                        else if (opMenuCliente === 5){
                            this.cancelarPedido(usuarioLogado);
                        }
                        else if (opMenuCliente === 6){
                            this.fazerAvaliação();
                        }
                        else if (opMenuCliente === 7){
                            this.verAvaliação();
                        }
                        else if (opMenuCliente === 8){
                            break;
                        }
                    }

                } 
                
                else if (usuarioLogado instanceof Funcionario) {
                    while(true){
                        exibirMenuFuncionario();
                        let opMenuFuncionario = parseInt(requisicao.question("Digite uma opção: "));
                        if (opMenuFuncionario === 1){
                            this.verDadosFuncionario(usuarioLogado);
                        }
                        else if (opMenuFuncionario === 2){
                            this.modificarDadosFuncionario(usuarioLogado);

                        }
                        else if (opMenuFuncionario === 3){
                            this.adicionarProduto()
                        }
                        else if (opMenuFuncionario === 4){
                            this.listarProdutos()
                        }
                        else if (opMenuFuncionario === 5){
                            this.excluirProduto()
                        }
                        else if (opMenuFuncionario === 6){
                            this.editarProduto();            
                        }
                        else if (opMenuFuncionario === 7){
                            this.verListaPedido();
                        }
                        else  if (opMenuFuncionario === 8){
                            this.mudarStatusPedido();
                        }
                        else if (opMenuFuncionario === 9){
                            this.verListaClientes();
                        }
                        else if (opMenuFuncionario === 10){
                            break
                        }
                }}
            } 

            else if (opPrincipal === 2){
                console.log("Bem vindo ao cadastro de clientes!");
                this.cadastroCliente();
            }
            
            else if (opPrincipal === 3){
                console.log("Bem vindo ao cadastro de funcionarios!");
                this.cadastroFuncionario();
            }

            else if (opPrincipal === 4) {
                console.log("Saindo do programa.");
                break; 
            } 
            
            else {
                console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}

const sistema = new Sistema();
sistema.menu();
