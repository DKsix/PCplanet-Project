// Declaração variáveis
const carousel = document.querySelector('.carrossel');
const cardsContainerOfertas = document.querySelector('.cardsContainerOfertas');
const cardsOfertas = document.querySelectorAll('.cardOfertas');
// Declaração variáveis parte 2
const carousel2 = document.querySelector('.carrossel2');
const cardsContainerComputadores = document.querySelector('.cardsContainerComputadores');
const cardsComputadores = document.querySelectorAll('.cardComputadores');
// Declaração variáveis parte 3
const carousel3 = document.querySelector('.carrossel3');
const cardsContainerMonitores = document.querySelector('.cardsContainerMonitores');
const cardsMonitores = document.querySelectorAll('.cardMonitores');

function responsividadeTranslate(larguraPagina, cardWidth) {
    if (larguraPagina <= 375) {
        return cardWidth = cardWidth + 55;
    } else if (larguraPagina <= 430 && larguraPagina > 375) {
        return cardWidth = cardWidth + 80;
    } else {
        return cardWidth = cardWidth + 20;
    }
}

// // Declaração variáveis parte 4
let larguraPagina = window.innerWidth;
let currentIndexOfertas = 0;
let currentIndexComputadores = 0;
let currentIndexMonitores = 0 ;
let cardWidth = cardsOfertas[0].offsetWidth;

// Responsividade mobile do slider
function responsividadeTranslate(larguraPagina, cardWidth) {
    if (larguraPagina <= 375) {
        return cardWidth = cardWidth + 55;
    } else if (larguraPagina <= 430 && larguraPagina > 375) {
        return cardWidth = cardWidth + 80;
    } else {
        return cardWidth = cardWidth + 20;
    }
}

cardWidth = responsividadeTranslate(larguraPagina, cardWidth)

// Slider Ofertas funções
// Declaração variáveis parte 1

function updateCarouselPosition(currentIndex, cardsContainer) {
    console.log(currentIndex)
    console.log(cardsContainer)
    const translateXValue = -currentIndex * cardWidth;
    cardsContainer.style.transform = `translateX(${translateXValue}px)`;
}

let cardsContainer;
let tamanhoCards;
let cards; 
function rightArrowClick( currentIndex) {
    if(currentIndex === 'ofertas'){
        currentIndex = currentIndexOfertas
        cards = cardsOfertas
        currentIndexOfertas++
        cardsContainer = cardsContainerOfertas;
    } else if(currentIndex === 'computadores'){
        currentIndex = currentIndexComputadores
        cards = cardsComputadores
        currentIndexComputadores++
        cardsContainer = cardsContainerComputadores;
    } else if (currentIndex === 'monitores'){
        currentIndex = currentIndexMonitores
        cards = cardsMonitores
        currentIndexMonitores++
        cardsContainer = cardsContainerMonitores;
    }
    currentIndex++;
    if (currentIndex >= cards.length && larguraPagina <= 425) {
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    } else if (currentIndex >= cards.length -1 && larguraPagina >= 426 && larguraPagina <= 1440){
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    } else if(currentIndex >= cards.length -3 && larguraPagina > 1440){
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    }
    updateCarouselPosition(currentIndex, cardsContainer);
};

function leftArrowClick(currentIndex) {
    if(currentIndex === 'ofertas'){
        currentIndex = currentIndexOfertas
        cards = cardsOfertas
        if (currentIndexOfertas > 0){
            currentIndexOfertas--
        }
        cardsContainer = cardsContainerOfertas;
    } else if(currentIndex === 'computadores'){
        currentIndex = currentIndexComputadores
        cards = cardsComputadores
        if (currentIndexComputadores > 0){
            currentIndexComputadores--
        }
        cardsContainer = cardsContainerComputadores;
    } else if (currentIndex === 'monitores'){
        currentIndex = currentIndexMonitores
        cards = cardsMonitores
        if (currentIndexMonitores > 0){
            currentIndexMonitores--
        }
        cardsContainer = cardsContainerMonitores;
    }
    if (currentIndex >= cards.length && larguraPagina <= 425) {
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    } else if (currentIndex >= cards.length -1 && larguraPagina >= 426 && larguraPagina <= 1439){
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    } else if(currentIndex >= cards.length -3 && larguraPagina >= 1440){
        currentIndex = 0;
        currentIndexOfertas = 0
        currentIndexComputadores = 0
        currentIndexMonitores = 0
    }
    if (currentIndex > 0) {
        console.log(currentIndex)
        currentIndex = currentIndex - 1;
        updateCarouselPosition(currentIndex, cardsContainer);
    }
}


// Redirecionar para página de compra 
function IrParaPaginaDeCompra(idDoElemento) {
    window.location.href = "../html/pgCompra.html?id=" + idDoElemento;
}