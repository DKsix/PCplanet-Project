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

function carregarDadosComputador(){
    fetch("../js/computadores.json")
    // pegando a resposta e transformmando em json
    .then((response) => response.json())
    // pegando a resposta em json e transformando na computadorList
    .then(ComputadorList => {
        var computador = convertJsonToDadosComputador(ComputadorList[IDdoProdutoReal])
        // Executando a função de conversão de json para objeto na var computador, pegando os dados do json de acordo com o ID. 
        var newhtml = `<div class="tituloCarrinho">
        <i class="fa-solid fa-cart-shopping"></i>
        <h1>Meu Carrinho</h1>
    </div>
    <div class="cart-container">
        <section id="section1">
            <div class="produtoContainer">
                <div class="produtoSubContainer">
                    <div class="produtoRow1">
                        <i class="fa-solid fa-basket-shopping"></i>
                        <h1>PRODUTO</h1>
                    </div>
                    <div class="produtoRow2">
                        <div class="img">
                            <img src="../arquivos/Image/computadores/${computador.image01}" alt="">
                        </div>
                        <div class="produtoRow2Details">
                            <div class="marcaProduto">Pichau</div>
                            <div class="nomeProduto"> <p>
                                COMPUTADOR PICHAU, AMD RYZEN 5 5500, RADEON RX 550 2GB, 16GB DDR4, SSD 480GB
                            </p></div>
                        </div>
                        <div class="produtoRow2QuantPreco">
                            <div class="produtoQuantidade">
                                <button><i class="fa-solid fa-angle-left"></i></button>
                                <div class="quantidade">
                                    <label for="">Quant.</label>
                                    <input type="text" placeholder="1">
                                </div>
                                <button><i class="fa-solid fa-angle-right"></i></button>
                            </div>
                            <div class="produtoRemove">
                                <i class="fa-solid fa-trash"></i>
                                <button>Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="detailsContainer">
                <article id="cupom" class="descontoContainer">
                    <div class="descontoSubContainer">
                        <h4>Cupom de desconto:</h4>
                        <div class="row1">
                            <input type="text" placeholder="Cupom">
                            <div class="aplicar">
                                <button><i class="fa-solid fa-tag"></i><span>APLICAR</span></button>
                            </div>
                        </div>
                    </div>
                </article>
                <article class="freteContainer">
                    <div class="freteSubContainer">
                        <h4>Frete e Prazos:</h4>
                        <div class="row1">
                            <input type="text" placeholder="CEP*">
                            <div class="aplicar">
                                <button><i class="fa-solid fa-truck"></i><span>CALCULAR</span></button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <aside class="table-container">
            <div class="table-aside">
                <table id="tabelaResumo">
                    <div class="tituloResumo">
                        <h1>RESUMO</h1>
                    </div>
                    <tbody>
                        <tr id="valorProdutos">
                            <th>
                                <p>Valor dos produtos:</p>
                            </th>
                            <td>
                                <p>R$ 420,30</p>
                            </td>
                        </tr>
                        <tr id="frete">
                            <th>
                                <p>Frete:</p>
                            </th>
                            <td>
                                <p>R$ 30,32</p>
                            </td>
                        </tr>
                        <tr id="total">
                            <th>
                                <p id="totalTexto">Total:</p>
                            </th>
                            <td>
                                <p>R$ 450,62</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="comprarContainer">
                    <button><i class="fa-solid fa-cart-shopping"></i>Finalizar pedido</button>
                </div>

            </div>
        </aside>
    </div>

    </div>`
    })
}

function carregarDadosMonitor(){

}
















if (IDModeloProduto == "PC"){
    carregarDadosComputador()
// caso não for "PC" vai carregar os dados dos monitores. 
} else{
    carregarDadosMonitor()
}