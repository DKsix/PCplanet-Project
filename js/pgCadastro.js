// declaração variáveis
const form = document.querySelector('form')
const btnCadastrar = document.getElementById('cadastrar')
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const rg = document.getElementById('rg')
const email = document.getElementById('email')
const senha = document.getElementById('password')
document.getElementById('submit').disabled = true;

cpf.addEventListener('input', () => {
    var cpfValue = cpf.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    var value;
    // Adiciona os separadores nos locais apropriados
    if (cpfValue.length > 3 && cpfValue.length <= 6) {
        cpf.value = cpfValue.substring(0, 3) + '.' + cpfValue.substring(3);
    } else if (cpfValue.length > 6 && cpfValue.length <= 9) {
        cpf.value = cpfValue.substring(0, 3) + '.' + cpfValue.substring(3, 6) + '.' + cpfValue.substring(6);
    } else if (cpfValue.length > 9) {
        cpf.value = cpfValue.substring(0, 3) + '.' + cpfValue.substring(3, 6) + '.' + cpfValue.substring(6, 9) + '-' + cpfValue.substring(9);
    } else {
        cpf.cpfValue = value;
    }
});
rg.addEventListener('input', () => {
    var rgValue = rg.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    // Adiciona os separadores nos locais apropriados
    if (rgValue.length > 2 && rgValue.length <= 5) {
        rg.value = rgValue.substring(0, 2) + '.' + rgValue.substring(2);
    } else if (rgValue.length > 5 && rgValue.length <= 8) {
        rg.value = rgValue.substring(0, 2) + '.' + rgValue.substring(2, 5) + '.' + rgValue.substring(5);
    } else if (rgValue.length > 8) {
        rg.value = rgValue.substring(0, 2) + '.' + rgValue.substring(2, 5) + '.' + rgValue.substring(5, 8) + '-' + rgValue.substring(8);
    }
});
function showError(input) {
    input.addEventListener('focusout', () => {
        var resultado = validarInput(input)
        if (resultado != true) {
            document.getElementById('error' + input.id).style.display = "flex"
            document.getElementById('text' + input.id).innerHTML = `${resultado}`
            document.getElementById('submit').disabled = true;
        } else if (resultado == true) {
            document.getElementById('error' + input.id).style.display = "none"
            if (validarNome(nome.value) && validarCPF(cpf.value) && validarEmail(email.value) && validarRG(rg.value) && validarSenha(senha.value) === true) {
                document.getElementById('submit').disabled = false;
            }
        }
    })
}
showError(nome)
showError(cpf)
showError(rg)
showError(email)
showError(senha)


function validarInput(input) {
    if (input.id === 'nome') {
        return resultado = validarNome(input.value)
    } else if (input.id === 'cpf') {
        return resultado = validarCPF(input.value)
    } else if (input.id === 'rg') {
        return resultado = validarRG(input.value)
    }
    else if (input.id === 'email') {
        return resultado = validarEmail(input.value)
    }
    else if (input.id === 'password') {
        return resultado = validarSenha(input.value)
    }
}


// Validações
function validarNome(nome) {
    var regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(nome) ? true : 'Por favor, insira o nome completo.';
}

function validarCPF(cpf) {
    var regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (regex.test(cpf) === true) {
        if (validarCPFbolada(cpf)) {
            return true
        }
    }
    return 'Por favor, insira um CPF válido.'
}
function validarCPFbolada(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

function validarRG(rg) {
    var regex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
    return regex.test(rg) ? true : 'Por favor, insira um RG válido.';
}

function validarEmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? true : 'Por favor, insira um email válido.';
}

function validarSenha(senha) {
    var regex = /^(?=.*\d).{6,}$/;
    return regex.test(senha) ? true : 'A senha pelo menos 6 caracteres.';
}

if (validarNome(nome.value) && validarCPF(cpf.value) && validarEmail(email.value) && validarRG(rg.value) && validarSenha(senha.value) === true) {
    document.getElementById('submit').disabled = false;
}

// Evento do submit para cadastrar
form.addEventListener('submit', event => {
    // Utilizado pra definir como evento padrão ao dar submit, para não recarregar a pagina. 
    event.preventDefault();

    let nomeValido = nome.value
    let cpfValido = cpf.value.replace(/\D/g, '');
    let rgValido = rg.value.replace(/\D/g, '');
    let emailValido = email.value
    let senhaValido = senha.value

    let data = {
        nome: nomeValido,
        cpf: cpfValido,
        rg: rgValido,
        email: emailValido,
        senha: senhaValido,
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
    fetch('http://localhost/PCplanet-Project-main/api/api.php?action=register-user', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(response => {
            console.log(response)
            if (response.errorCode === 1062) {
                importAlerts().then((alerts) => {
                    const alertsToastify = new alerts.default();
                    alertsToastify.showAlert('Já existe um cadastro para o e-mail ou documento informado.');
                });
            } else if ((response.status === "success")) {
                importAlerts().then((alerts) => {
                    const alertsToastify = new alerts.default();
                    alertsToastify.showAlert('Cadastro realizado!');
                    window.location.href = "../html/login.html"
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

    // Função para importar o módulo de alertas
    function importAlerts() {
        return import('./alerts.js');
    }
})

