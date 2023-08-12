const carousel = document.querySelector('.carrossel');
const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card2');
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');

const cardWidth = cards[0].offsetWidth;
let currentIndex = 0;

arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarouselPosition();
    }
});

arrowRight.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length - 2) {
        currentIndex = 0;
    }
    updateCarouselPosition();
});

function updateCarouselPosition() {
    const translateXValue = -currentIndex * cardWidth;
    cardsContainer.style.transform = `translateX(${translateXValue}px)`;
}