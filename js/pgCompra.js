// Exportando classe computador
import { Computador } from '../js/computador.js'
// Exportando classe monitor
import { Monitor } from '../js/monitor.js'



// colocando url da pagina em uma constante
const urlParams = new URLSearchParams(window.location.search);
// Pegando id do elemento que foi passado pelo url
const idDoElemento = urlParams.get('id');

// Pegando o ultimo caracter do id para saber qual será o computador/monitor
var IDdoProdutoReal = idDoElemento.charAt(idDoElemento.length - 1)

// Pegando as 2 primeiras caracteres do id para saber se vai ser computador ou monitor
var IDModeloProduto = idDoElemento.slice(0, 2);

// Declarando var main
var main = document.getElementById("main")

function irParaCarrinho() {
    window.location.href = "../html/carrinho.html?id=" + idDoElemento;
}



// Convertendo a lista de computadores json em um objeto
function convertJsonToDadosComputador(ComputadorList) {
    // instanciando o objeto da classe computador
    const computador = new Computador()

    // convertendo os dados json para o objeto
    computador.id = ComputadorList.id;
    computador.nome = ComputadorList.nome;
    computador.marca = ComputadorList.marca;
    computador.preçoAvista = ComputadorList.preçoAvista;
    computador.preçoParcelado = ComputadorList.preçoParcelado;
    computador.preçoParceladoInteiro = ComputadorList.preçoParceladoInteiro / 10;
    computador.processador = ComputadorList.processador;
    computador.placaMae = ComputadorList.placaMae;
    computador.memoria = ComputadorList.memoria;
    computador.armazenamento = ComputadorList.armazenamento;
    computador.placaDeVideo = ComputadorList.placaDeVideo;
    computador.fonte = ComputadorList.fonte;
    computador.gabinete = ComputadorList.gabinete;
    computador.image01 = ComputadorList.image01;
    computador.image02 = ComputadorList.image02;
    computador.image03 = ComputadorList.image03;
    computador.image04 = ComputadorList.image04;

    return computador;
}


// Convertendo a lista de monitor json em um objeto
function convertJsonToDadosMonitor(MonitorList) {
    // instanciando o objeto da classe monitor
    const monitor = new Monitor()

    // convertendo os dados json para o objeto
    monitor.id = MonitorList.id;
    monitor.nome = MonitorList.nome;
    monitor.marca = MonitorList.marca;
    monitor.preçoAvista = MonitorList.preçoAvista;
    monitor.preçoParcelado = MonitorList.preçoParcelado;
    monitor.preçoParceladoInteiro = MonitorList.preçoParceladoInteiro / 10;
    monitor.modelo = MonitorList.modelo;
    monitor.tamanhoExibicao = MonitorList.tamanhoExibicao;
    monitor.resolucao = MonitorList.resolucao;
    monitor.tipoPainel = MonitorList.tipoPainel;
    monitor.taxaAtualizacao = MonitorList.taxaAtualizacao;
    monitor.tempoDeResposta = MonitorList.tempoDeResposta;
    monitor.gabinete = MonitorList.gabinete;
    monitor.image01 = MonitorList.image01;
    monitor.image02 = MonitorList.image02;
    monitor.image03 = MonitorList.image03;
    monitor.image04 = MonitorList.image04;

    return monitor;
}

// Função para carregar os dados do computador
async function  carregarDadosComputador() {

    // Utilizando fetch api para buscar o arquivo json
    await fetch("../js/computadores.json")
        // pegando a resposta e transformmando em json
        .then((response) => response.json())
        // pegando a resposta em json e transformando na computadorList
        .then(ComputadorList => {
            // Executando a função de conversão de json para objeto na var computador, pegando os dados do json de acordo com o ID. 
            var computador = convertJsonToDadosComputador(ComputadorList[IDdoProdutoReal])
            // constante newHtml com toda a pagina de compra trocando os dados de acordo com o arquivo.
            const newHtml = `<div class="navigationProgress">
            <ul class="navigationProgressUl">
                <li><a href="./PgPrincipal.html"><i class="fa-solid fa-house"></i></a></li>
                <span><i class="fa-solid fa-angle-right"></i></span>
                <li id="categoria"></li>
                <span><i class="fa-solid fa-angle-right"></i></span>
                <li id="produto"></li>
            </ul>
        </div>
        <section id="produto-view-all">
            <div class="container-produto">
                <div class="produto">
                    <div class="produto-view">
                        <div class="produto-view-container-carrosel">
                            <div class="card-produto-carrosel" id="card-produto-carrosel-1">
                                <img id='image01' src="../arquivos/Image/computadores/${computador.image01}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-2">
                                <img src="../arquivos/Image/computadores/${computador.image02}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-3">
                                <img src="../arquivos/Image/computadores/${computador.image03}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-4">
                                <img src="../arquivos/Image/computadores/${computador.image04}" alt="">
                            </div>
                        </div>
                        <div class="produto-view-container-principal">
                            <div class="produto-view-principal-imagem">
                                <img src="../arquivos/Image/computadores/${computador.image01}" alt="">
                            </div>
                        </div>

                    </div>
                    <div class="produto-buy">
                        <h1 id="produto-name">${computador.nome}</h1>
                        <div class="produto-low-details">
                            <div class="marca">
                                <p>Marca:</p>
                                <span>${computador.marca}</span>
                            </div>
                            <div class="produto-stars">
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span id="qtd-stars">(1)</span>
                            </div>
                        </div>

                        <div class="price-avista-buy-container">
                            <div class="price-container">
                                <div class="price-avista-container">
                                    <div class="icon-price">
                                        <i class="fa-solid fa-wallet"></i>
                                    </div>
                                    <div class="price-avista-details">
                                        <p class="price-avista-metodo">à vista</p>
                                        <span id="price-avista">${computador.preçoAvista}</span>
                                        <p class="price-desconto">no boleto ou <span id="pix">pix</span> com <span>15%
                                                OFF</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-container">
                                <button id="buttonCompra">
                                    <div class="buy-button">
                                        <div class="icon-buy">
                                            <i class="fa-solid fa-cart-plus"></i>
                                        </div>
                                        <div class="txt-buy">
                                            <span onclick="irParaCarrinho()">COMPRAR</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="price-parcelado-container">
                            <div class="icon-price">
                                <i class="fa-regular fa-credit-card"></i>
                            </div>
                            <div class="price-parcelado-details">
                                <span id="price-parcelado">${computador.preçoParcelado}</span>
                                <p class="price-parcelas">Em até 10x de <span id="price-parcelas">${computador.preçoParceladoInteiro.toFixed(2)}</span></p>
                                <p> sem juros no cartão</p>
                            </div>

                        </div>
                        <form action="" id="frete" name="frete">
                            <div class="calcular-frete-container">
                                <div class="input-frete-container">
                                    <input type="text" id="input-frete" placeholder="Inserir CEP" maxlength="8">
                                    <label for="frete">CEP</label>
                                </div>
                                <div class="button-frete-container">
                                    <div class="button-frete">
                                        <button>Calcular</button>
                                    </div>

                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="especificacoes-section">
                <div class="especificacoes-titulo">
                    <i class="fa-solid fa-file-lines"></i>
                    <h2>Especificações técnicas</h2>
                </div>
                <div class="especificacoes-sumario">
                    <table class="table-espec">
                        <tr class="espec-layer">
                            <th>Marca:</th>
                            <td>${computador.marca}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Processador:</th>
                            <td>${computador.processador}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Placa Mãe:</th>
                            <td>${computador.placaMae}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Memória:</th>
                            <td>${computador.memoria}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Armazenamento:</th>
                            <td>${computador.armazenamento}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Placa de Vídeo:</th>
                            <td>${computador.placaDeVideo}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Fonte:</th>
                            <td>${computador.fonte}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Gabinete</th>
                            <td>${computador.gabinete}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>`
            // Colocando todo o html na main utilizando innerHTML
            main.innerHTML += newHtml
        })
}

// Função para carregar os dados do computador
function carregarDadosMonitor() {
    // Utilizando fetch api para buscar o arquivo json
    fetch("../js/monitores.json")
        // pegando a resposta e transformmando em json
        .then((response) => response.json())
        // pegando a resposta em json e transformando na monitor list
        .then(monitoresList => {
            // Executando a função de conversão de json para objeto na var monitor, pegando os dados do json de acordo com o ID. 
            var monitor = convertJsonToDadosMonitor(monitoresList[IDdoProdutoReal])
            // constante newHtml com toda a pagina de compra trocando os dados de acordo com o arquivo.
            const newHtml = `<div class="navigationProgress">
            <ul class="navigationProgressUl">
                <li><a href="./PgPrincipal.html"><i class="fa-solid fa-house"></i></a></li>
                <span><i class="fa-solid fa-angle-right"></i></span>
                <li id="categoria"></li>
                <span><i class="fa-solid fa-angle-right"></i></span>
                <li id="produto"></li>
            </ul>
        </div>
        <section id="produto-view-all">
            <div class="container-produto">
                <div class="produto">
                    <div class="produto-view">
                        <div class="produto-view-container-carrosel">
                            <div class="card-produto-carrosel" id="card-produto-carrosel-1">
                                <img src="../arquivos/Image/monitor/${monitor.image01}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-2">
                                <img src="../arquivos/Image/monitor/${monitor.image02}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-3">
                                <img src="../arquivos/Image/monitor/${monitor.image03}" alt="">
                            </div>
                            <div class="card-produto-carrosel" id="card-produto-carrosel-4">
                                <img src="../arquivos/Image/monitor/${monitor.image04}" alt="">
                            </div>
                        </div>
                        <div class="produto-view-container-principal">
                            <div class="produto-view-principal-imagem">
                                <img src="../arquivos/Image/monitor/${monitor.image01}" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="produto-buy">
                        <h1 id="produto-name">${monitor.nome}</h1>
                        <div class="produto-low-details">
                            <div class="marca">
                                <p>Marca:</p>
                                <span>${monitor.marca}</span>
                            </div>
                            <div class="produto-stars">
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span><i class="fa-solid fa-star"></i></span>
                                <span id="qtd-stars">(1)</span>
                            </div>
                        </div>

                        <div class="price-avista-buy-container">
                            <div class="price-container">
                                <div class="price-avista-container">
                                    <div class="icon-price">
                                        <i class="fa-solid fa-wallet"></i>
                                    </div>
                                    <div class="price-avista-details">
                                        <p class="price-avista-metodo">à vista</p>
                                        <span id="price-avista">${monitor.preçoAvista}</span>
                                        <p class="price-desconto">no boleto ou <span id="pix">pix</span> com <span>15%
                                                OFF</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-container">
                                <button>
                                    <div class="buy-button">
                                        <div class="icon-buy">
                                            <i class="fa-solid fa-cart-plus"></i>
                                        </div>
                                        <div class="txt-buy">
                                            <span>COMPRAR</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="price-parcelado-container">
                            <div class="icon-price">
                                <i class="fa-regular fa-credit-card"></i>
                            </div>
                            <div class="price-parcelado-details">
                                <span id="price-parcelado">${monitor.preçoParcelado}</span>
                                <p class="price-parcelas">Em até 10x de <span id="price-parcelas">${monitor.preçoParceladoInteiro.toFixed(2)}</span></p>
                                <p> sem juros no cartão</p>
                            </div>

                        </div>
                        <form action="" id="frete" name="frete">
                            <div class="calcular-frete-container">
                                <div class="input-frete-container">
                                    <input type="text" id="input-frete" placeholder="Inserir CEP" maxlength="8">
                                    <label for="frete">CEP</label>
                                </div>
                                <div class="button-frete-container">
                                    <div class="button-frete">
                                        <button>Calcular</button>
                                    </div>

                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="especificacoes-section">
                <div class="especificacoes-titulo">
                    <i class="fa-solid fa-file-lines"></i>
                    <h2>Especificações técnicas</h2>
                </div>
                <div class="especificacoes-sumario">
                    <table class="table-espec">
                        <tr class="espec-layer">
                            <th>Marca:</th>
                            <td>${monitor.marca}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Modelo:</th>
                            <td>${monitor.modelo}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Tamanho Exibição:</th>
                            <td>${monitor.tamanhoExibicao}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Resolução:</th>
                            <td>${monitor.resolucao}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>tipo Painel:</th>
                            <td>${monitor.tipoPainel}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>taxa Atualização:</th>
                            <td>${monitor.taxaAtualizacao}</td>
                        </tr>
                        <tr class="espec-layer">
                            <th>Tempo de Resposta:</th>
                            <td>${monitor.tempoDeResposta}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>`
            // Colocando todo o html na main utilizando innerHTML
            main.innerHTML += newHtml
            console.log('hello world')
        })
}

// De acordo se o id for equivalente a "PC" vai carregar os dados de computador.
if (IDModeloProduto == "PC") {
    carregarDadosComputador()
    // caso não for "PC" vai carregar os dados dos monitores. 
} else {
    carregarDadosMonitor()
}

console.log("foi")




