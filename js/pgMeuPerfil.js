const nomeInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const cpfInput = document.getElementById('cpf')
const senhaNova = document.getElementById('novaSenha')
const confirmarSenha = document.getElementById('confirmarNovaSenha')
const senhaAtual = document.getElementById('senhaAtual')
const form = document.querySelector('form')



const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    },
};

async function buscarDados() {
    try {
        const response = await fetch('http://localhost/PCplanet-Project/api/api.php?action=profile-user', options)
        data = await response.json()
        userEmail = data.email
        userNome = data.nome
        userCpf = data.cpf
        nomeInput.value = userNome
        emailInput.value = userEmail
        cpfInput.value = userCpf
    } catch (error) {
        window.location.href = '../html/login.html'
    }
}
buscarDados()




form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('alterar')
    alterarDados()
})
async function alterarDados() {
    try {
        data = {
            senhaNova: senhaNova.value,
            senhaAtual: senhaAtual.value,
            email: email.value
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        };
        const responseJson = await fetch('http://localhost/PCplanet-Project/api/api.php?action=profile-user-edit', options)
        response = await responseJson.json()
        if(response.status == 200){
            window.location.href = '../html/pgMeuPerfil.html'
        }
        if (response.status == 401) {
            console.log("Senha incorreta.")
        }
    } catch (error) {
        console.log(error.text)
    }
}



async function excluirConta() {
    event.preventDefault();
    try {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        };
        const responseJson = await fetch('http://localhost/PCplanet-Project/api/api.php?action=profile-delete', options);
        const response = await responseJson.json();
        if (response.status == 200) {
            localStorage.setItem('token', '')
            window.location.href = '../html/login.html';
        }
    } catch (error) {
        console.log(error.text); 
    }
}













function showError(input) {
    input.addEventListener('focusout', () => {
        let resultado = validarInput(input)
        if (resultado != true) {
            document.getElementById('error' + input.id).style.display = "flex"
            document.getElementById('text' + input.id).innerHTML = `${resultado}`
            document.getElementById('submit').disabled = true;
        } else if (resultado == true) {
            document.getElementById('error' + input.id).style.display = "none"
            if (validarSenhaNova(senhaNova.value) && validarNome(nome.value) && validarSenhaAtual(senhaAtual.value) && validarConfirmarSenha(confirmarSenha.value) === true) {
                document.getElementById('submit').disabled = false;
            }
        }
    })
}
showError(senhaNova)
showError(senhaAtual)
showError(confirmarSenha)

function validarInput(input) {
    if (input.id === 'novaSenha') {
        return resultado = validarSenhaNova(input.value)
    }
    else if (input.id === 'confirmarNovaSenha') {
        return resultado = validarConfirmarSenha(input.value)
    }
    else if (input.id === 'senhaAtual') {
        return resultado = validarSenhaAtual(input.value)
    }
    else if (input.id === 'nome') {
        return resultado = validarNome(input.value)
    }
}

function validarSenhaNova(senha) {
    var regex = /^(?=.*\d).{6,}$/;
    return regex.test(senha) ? true : 'A senha deve ter pelo menos 6 caracteres.';
}
function validarConfirmarSenha(confirmarSenha) {
    return (senhaNova.value == confirmarSenha) ? true : 'A senha deve corresponder a primeira.';
}
function validarSenhaAtual(senhaAtual) {
    var regex = /^(?=.*\d).{6,}$/;
    return regex.test(senhaAtual) ? true : 'A senha deve ter pelo menos 6 caracteres.';
}
function validarNome(nome) {
    var regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(nome) ? true : 'Por favor, insira o nome completo.';
}







function redirect() {
    window.location.href = '../html/login.html'
}
function encerrar() {
    localStorage.setItem('token', '')
    redirect()
}