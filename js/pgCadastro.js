// declaração variáveis
const form = document.querySelector('form')
const btnCadastrar = document.getElementById('cadastrar')

// Evento do submit para cadastrar
form.addEventListener('submit', event => {
    // utilizado pra definir como evento padrão ao dar submit, para não recarregar a pagina. 
    event.preventDefault();

    // declarando variáveis dos inputs
    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const cpf = document.getElementById('cpf').value
    const rg = document.getElementById('rg').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value

    // declaração de variáveis que iram receber o retorno das funções de validações
    const validacaoNome = validarNome(nome)
    const validacaoSobrenome = validarSobrenome(sobrenome)
    const validacaoCPF = validarCpf(cpf)
    const validacaoRg = validarRg(rg)
    const validacaoEmail = validarEmail(email)
    const validacaoSenha = validarSenha(senha)

    // declaração variável de validação final
    var validacaoFinal = false

    // teste se passou por todas as validações finais e dando valor true para a validação final. 
    if (validacaoNome && validacaoSobrenome && validacaoCPF && validacaoRg && validacaoEmail && validacaoSenha == true) {
        validacaoFinal = true
    }
    // Executando a função para acionar um alerta de acorda com a validação que foi indicada como falsa.
    AlertarDeAcordoComValidacao(validacaoNome, validacaoSobrenome, validacaoCPF, validacaoRg, validacaoEmail, validacaoSenha);

    // Se a validação final for verdadeira começa a parte de cadastro do usuário.
    if (validacaoFinal === true) {
        // variável que inicializa um objeto salvando as propiedades do usuário.
        const dadosUsuario = { nome, sobrenome, rg, cpf, email, senha };
        // variável usuariosJson recupera o valor armazenado no armazenamento local com a chave 'usuarios'
        const usuariosJson = localStorage.getItem('usuarios');
        let usuarios;

        // Faz a verificação se a variável usuariosJson não é algo nulo, que não há nada dentro dela.
        if (usuariosJson) {
            // Caso ela não seja nula, é utilizado o JSON.parse para transformar a string json armazenada nela em objeto para a variável usuarios 
            usuarios = JSON.parse(usuariosJson);
        } else {
            // Caso ela seja nula a variável usuarios cria uma lista vázia para armazenar os dados.
            usuarios = [];
        }
        // O dados da variável dadosUsuario é empurrado para dentro da lista usuarios
        usuarios.push(dadosUsuario);
        // Os dados são transformados em json e colocados no armazenamento local
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // função trocar de pagina
        function TrocarDePagina(){
            window.location.href = 'login.html';
        }
        // delay para trocar de pagina
        setTimeout(TrocarDePagina, 800)
    }
}
)

// Funções de validação

// Função para validar se o cpf tem 11 caracteres
function validarCpf(cpf) {
    let validacao = false
    let tamanhoCpf = cpf.length;
    if (tamanhoCpf == 11) {
        validacao = true
    } else {
        validacao = false
    }
    return validacao;
}
// Função para validar Email
function validarEmail(email) {
    let validacao = false
    if (email.includes("@") && (email.includes(".com")) && (email[email.indexOf("@") - 1] != " ") && (email[email.indexOf("@") + 1] != " ") && (email.indexOf("@") - 1 != -1) && (email[email.indexOf("@") + 1] != ".") === true) {
        validacao = true
    } else {
        validacao = false
    } return validacao;
}
// Função para validar RG
function validarRg(rg) {
    let validacao = false
    let tamanhoRg = rg.length;

    if (tamanhoRg === 10) {
        validacao = true
    } else {
        validacao = false
    }
    return validacao;
}
// Função para validar senha
function validarSenha(senha) {
    let validacao = false
    let tamanhoSenha = senha.length;
    if (tamanhoSenha >= 8) {
        validacao = true
    } else {
        validacao = false
    }
    return validacao;
}
// Função para validar nome
function validarNome(nome) {
    let validacao = true
    console.log(nome)
    const numeros = "0123456789";
    for (let i = 0; i < nome.length; i++) {
        if (numeros.includes(nome[i])) {
            validacao = false;
            break;
        }
    }
    return validacao;
}
// Função para validar sobrenome
function validarSobrenome(sobrenome) {
    let validacao = true
    const numeros = "0123456789";
    for (let i = 0; i < sobrenome.length; i++) {
        if (numeros.includes(sobrenome[i])) {
            validacao = false;
            break;
        }
    }
    return validacao;
}

// Função para executar os alertas
function AlertarDeAcordoComValidacao(validacaoNome, validacaoSobrenome, validacaoCPF, validacaoRg, validacaoEmail, validacaoSenha) {
    if (validacaoNome === false) {
        Toastify({
            text: "Nome invalido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else if (validacaoSobrenome === false) {
        Toastify({
            text: "Sobrenome invalido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else if (validacaoCPF === false) {
        Toastify({
            text: "CPF invalido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else if (validacaoRg === false) {
        Toastify({
            text: "RG invalido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else if (validacaoEmail === false) {
        Toastify({
            text: "Email invalido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else if (validacaoSenha === false) {
        Toastify({
            text: "Senha invalida",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    } else {
        Toastify({
            text: "Registro concluido",
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    };
};