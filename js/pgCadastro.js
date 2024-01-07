const form = document.getElementById('form')
const btnCadastrar = document.getElementById('cadastrar')


var user = []
form.addEventListener('submit', event => {
    event.preventDefault();

    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const cpf = document.getElementById('cpf').value
    const rg = document.getElementById('rg').value
    const email = document.getElementById('email').value

    
    auxUser = [nome, sobrenome, cpf, rg, email]
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


function guardarDados(){

}