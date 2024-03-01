const form = document.querySelector('form')

// Evento do submit para cadastrar
form.addEventListener('submit', (event) => {
    // utilizado pra definir como evento padrão ao dar submit, para não recarregar a pagina. 
    event.preventDefault();

    // declarando variáveis dos inputs
    const emailLogin = document.getElementById('email').value;
    const senhaLogin = document.getElementById('senha').value;
    const errorEmail = document.getElementById('errorEmail');
    const errorSenha = document.getElementById('errorSenha');

    // declaração variável de validação final
    var validacaoFinal = false

    // declaração de variáveis que iram receber o retorno das funções de validações
    const validacaoEmail = validarEmail(emailLogin)
    const validacaoSenha = validarSenha(senhaLogin)

    // Se a validação retornar falsa irá aparecer mensagem em baixo de error
    if (validacaoEmail === false) {
        errorEmail.style.display = 'inline-flex'
    } else {
        // Se a validação retornar true some a mensagem de error da tela
        errorEmail.style.display = 'none'
    // Se a validação retornar falsa irá aparecer mensagem em baixo de error
    } if (validacaoSenha === false) {
        errorSenha.style.display = 'inline-flex'
    } else if (validacaoSenha === true) {
        // Se a validação retornar true some a mensagem de error da tela
        errorSenha.style.display = 'none'
    } 
    // caso as duas forem válidas irá começar o login
    if (validacaoSenha && validacaoEmail === true) {
        // variável usuariosJson recupera o valor armazenado no armazenamento local com a chave 'usuarios'
        const usuariosJson = localStorage.getItem('usuarios');

        if (usuariosJson) {
            // Faz a verificação se a variável usuariosJson não é algo nulo, que não há nada dentro dela.
            const usuarios = JSON.parse(usuariosJson);

            // função que vai receber a lista, o email e senha do input para buscar dentro da lista de usuarios
            function encontrarUsuario(usuarios, email, senha) {
                return usuarios.find(u => u.email === email && u.senha === senha);
            }

            // instanciando a função na constante usuario
            const usuario = encontrarUsuario(usuarios, emailLogin, senhaLogin)
            
            // Se a constante usuario não for nula vai dar login concluido
            if (usuario) {
                // alert utilizando a biblioteca toastify
                Toastify({
                    text: "Login concluido",
                    position: 'center',
                    duration: 550,
                    style: {
                        'border-radius': '20px',
                        background: "linear-gradient(to right, #4178BF, #66B1F2)",
                    },
                }).showToast()

                // função trocar de pagina
                function TrocarDePagina() {
                    (window.location.href = '../html/PgPrincipal.html')
                }

                // delay para trocar de pagina
                setTimeout(TrocarDePagina, 800)
                
            } else {
                // Caso usuario for nula vai executar o alert
                Toastify({
                    text: "Nenhum usuário registrado encontrado",
                    position: 'center',
                    duration: 3000,
                    style: {
                        'border-radius': '20px',
                        background: "linear-gradient(to right, #4178BF, #66B1F2)",
                    },
                }).showToast()
            }
        }
    }
})

// Funções validações 
function validarEmail(email) {
    let validacao = false
    if (email.includes("@") && (email.includes(".com")) && (email[email.indexOf("@") - 1] != " ") && (email[email.indexOf("@") + 1] != " ") && (email.indexOf("@") - 1 != -1) && (email[email.indexOf("@") + 1] != ".") === true) {
        validacao = true
    } else {
        validacao = false
    } return validacao;
}
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