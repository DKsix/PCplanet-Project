const form = document.querySelector('form')
const btnCadastrar = document.getElementById('cadastrar')


const newUser = {
    nome: 'testuser',
    sobrenome: 'testpassword',
    cpf: 'testcpf',
    rg: 'testrg',
    email: 'testemail',
    senha: 'testsenha'
};

function setCookie(name, value, days) {
    const expires = days ? `expires=${new Date(Date.now() + days * 864e5).toUTCString()}` : '';
    document.cookie = `${name}=${value};${expires};path=/`;
    console.log(document.cookie)
}

function saveUser(user) {
    const userData = JSON.stringify(user);
    setCookie('userData', userData, 30); // Cookie expira em 30 dias
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const cpf = document.getElementById('cpf').value
    const rg = document.getElementById('rg').value
    const email = document.getElementById('email').value


    auxUser = [nome, sobrenome, cpf, rg, email]
    console.log(auxUser)
    saveUser(auxUser)

    auxUser = auxUser.join()
    console.log(auxUser)
    user.push(auxUser)
    console.log(user)

    const userToJson = [{
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        rg: rg,
        email: email
    }
    ]
    const jsonData = JSON.stringify(userToJson)
    console.log(jsonData)

    const objData = JSON.parse(jsonData)
    console.log(objData)
})


function guardarDados() {
}