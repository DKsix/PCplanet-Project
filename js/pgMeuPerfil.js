nomeInput = document.getElementById('nome')
emailInput = document.getElementById('email')
cpfInput = document.getElementById('cpf')
senhaNova = document.getElementById('novaSenha')
confirmarSenha = document.getElementById('confirmarNovaSenha')
senhaAtual = document.getElementById('senhaAtual')
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
console.log(cpf.value)
async function alterarDados() {
    try {
        data = {
            senhaNova: senhaNova.value,
            senhaAtual: senhaAtual.value,
            email: email.value
        }
        console.log(data)
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
        console.log(responseJson)
        response = await responseJson.text()
        console.log(response)
    } catch (error) {
        console.log(error)
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
    return (senhaNova.value == confirmarSenha ) ? true : 'A senha deve corresponder a primeira.';
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
    window.location.href = '../html/Login.html'
}
function encerrar() {
    localStorage.setItem('token', '')
    redirect()
}