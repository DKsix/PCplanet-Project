function responsividadeTranslate(larguraPagina, cardWidth){
    if (larguraPagina <= 375){
        return cardWidth = cardWidth + 55;
    } else if (larguraPagina <= 430 && larguraPagina > 375){
        return cardWidth = cardWidth + 80;
    } else{
        return cardWidth = cardWidth + 20;
    }
}
// Declaração variaveis parte 1
const carousel = document.querySelector('.carrossel');
const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card2');
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');
// Declaração variaveis parte 2
const carousel2 = document.querySelector('.carrossel2');
const cardsContainer2 = document.querySelector('.cards-container2');
const cards2 = document.querySelectorAll('.card3');
const arrowLeft2 = document.querySelector('.arrow2.left2');
const arrowRight2 = document.querySelector('.arrow2.right2');
// Declaração variaveis parte 3
const carousel3 = document.querySelector('.carrossel3');
const cardsContainer3 = document.querySelector('.cards-container3');
const cards3 = document.querySelectorAll('.card4');
const arrowLeft3 = document.querySelector('.arrow3.left3');
const arrowRight3 = document.querySelector('.arrow3.right3');
// // Declaração variaveis parte 4
let larguraPagina = window.innerWidth;
let currentIndex = 0;
let currentIndex2 = 0;
let currentIndex3 = 0;
let cardWidth = cards[0].offsetWidth;
let cardWidth2 = cards[0].offsetWidth;
let cardWidth3 = cards[0].offsetWidth;

// Responsividade mobile do slider
function responsividadeTranslate(larguraPagina, cardWidth){
    if (larguraPagina <= 375){
        return cardWidth = cardWidth + 55;
    } else if (larguraPagina <= 430 && larguraPagina > 375){
        return cardWidth = cardWidth + 80;
    } else{
        return cardWidth = cardWidth + 20;
    }
}
cardWidth = responsividadeTranslate(larguraPagina, cardWidth)
cardWidth2 = responsividadeTranslate(larguraPagina, cardWidth2)
cardWidth3 = responsividadeTranslate(larguraPagina, cardWidth3)

// Slider Ofertas funções
function updateCarouselPosition() {
    const translateXValue = -currentIndex * cardWidth;
    cardsContainer.style.transform = `translateX(${translateXValue}px)`;
}

arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarouselPosition();
    }
});

arrowRight.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length - 3) {
        currentIndex = 0;
    }
    updateCarouselPosition();
});


// Slider Computadores funções
function updateCarouselPosition2() {
    const translateXValue2 = -currentIndex2 * cardWidth2;
    cardsContainer2.style.transform = `translateX(${translateXValue2}px)`;
}

arrowLeft2.addEventListener('click', () => {
    if (currentIndex2 > 0) {
        currentIndex2--;
        updateCarouselPosition2();
    }
});

arrowRight2.addEventListener('click', () => {
    currentIndex2++;
    if (currentIndex2 >= cards2.length - 3) {
        currentIndex2 = 0;
    }
    updateCarouselPosition2();
});


// Slider Monitores funções
arrowLeft3.addEventListener('click', () => {
    if (currentIndex3 > 0) {
        currentIndex3--;
        updateCarouselPosition3();
    }
});

arrowRight3.addEventListener('click', () => {
    currentIndex3++;
    if (currentIndex3 >= cards3.length - 3) {
        currentIndex3 = 0;
    }
    updateCarouselPosition3();
});

function updateCarouselPosition3() {
    const translateXValue3 = -currentIndex3 * cardWidth3;
    cardsContainer3.style.transform = `translateX(${translateXValue3}px)`;
}






