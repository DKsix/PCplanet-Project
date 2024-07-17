const email = document.getElementById('email')
const senha = document.getElementById('password')
import alerts from './alerts.js';

let resultado;
function showError(input) {
    input.addEventListener('focusout', () => {
        let resultado = validarInput(input)
        if (resultado != true) {
            document.getElementById('error' + input.id).style.display = "flex"
            document.getElementById('text' + input.id).innerHTML = `${resultado}`
            document.getElementById('submit').disabled = true;
        } else if (resultado == true) {
            document.getElementById('error' + input.id).style.display = "none"
            if (validarEmail(email.value) && validarSenha(senha.value) === true) {
                document.getElementById('submit').disabled = false;
            }
        }
    })
}
showError(email)
showError(senha)


function validarInput(input) {
    if (input.id === 'email') {
        return resultado = validarEmail(input.value)
    }
    else if (input.id === 'password') {
        return resultado = validarSenha(input.value)
    }
}


function validarEmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? true : 'Por favor, insira um email válido.';
}

function validarSenha(senha) {
    var regex = /^(?=.*\d).{6,}$/;
    return regex.test(senha) ? true : 'A senha pelo menos 6 caracteres.';
}



const form = document.querySelector('form')
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;

    let data = {
        email,
        senha,
    };

    // Configurar as opções para a solicitação Fetch
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        body: JSON.stringify(data)
    };

    // Enviar a solicitação usando Fetch
    try {
        const response = await fetch('http://localhost/PCplanet-Project/api/api.php?action=login-user', options)
        if (response.ok) {
            const token = response.headers.get('Authorization')?.slice(7)
            const json = await response.json()
            localStorage.setItem('token', token);
            window.location.href = '../html/pgMeuPerfil.html'
        }
        else {
            const alertsToastify = new alerts();
            alertsToastify.showAlert('Email ou senha inválidos.');
        }
    } catch (error) {
        const alertsToastify = new alerts();
        alertsToastify.showAlert('Email ou senha inválidos.');
        console.log(error)
    }
})