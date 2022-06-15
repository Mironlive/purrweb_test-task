const sliderBand = document.querySelector('.slider__band');
const slides = document.querySelectorAll('.slider__item');
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');
const dots = document.querySelectorAll('.dots__item');

const sliderLength = slides.length;
const firstIndex = 1;
const slideWidth = slides[0].offsetWidth;
const animationDuration = 600;
const animationTimeStep = 20;


let controlsIsActive;
let currentIndex;
let currentPosition = null;

function moveSlide(index, callback) {
    const prevPosition = currentPosition;
    const newPosition = -1 * index * slideWidth;
    const diffPosition = newPosition - prevPosition;
    const startTime = Date.now();

    const timer = setInterval(() => {
        const currentTime = Date.now();

        let timeFraction = (currentTime - startTime) / animationDuration;
        let progress = 1 - Math.pow(1 - timeFraction, 2);
        let position = null;

        if (timeFraction >= 1) {
            timeFraction = 1;
            clearInterval(timer);
        }

        position = prevPosition + diffPosition * progress;
        sliderBand.style.transform = `translateX(${position}px)`;

        if (timeFraction === 1) {
            callback.call();
        }
    }, animationTimeStep);
}

function setSlide(index) {
    currentIndex = index;
    currentPosition = -1 * currentIndex * slideWidth;
    sliderBand.style.transform = `translateX(${currentPosition}px)`;
}

function changeSlide(index) {
    let newIndex = null;

    if (index > sliderLength) {
        newIndex = firstIndex;
    } else if (index < firstIndex) {
        newIndex = sliderLength;
    } else {
        newIndex = index;
    }

    controlsIsActive = false;
    instalDotActive(newIndex, currentIndex);

    moveSlide(index, () => {
        setSlide(newIndex);
        controlsIsActive = true;
    });
}

function onNextSlide() {;
    if (controlsIsActive) {
        changeSlide(currentIndex + 1);
    }
}

function onPrevSlide() {
    if (controlsIsActive) {
        changeSlide(currentIndex - 1);
    }
}

function instalDotActive(newIndex, prevIndex) {
    if (prevIndex) {
        const prevDot = document.querySelector(`[data-dot-index="${prevIndex}"]`);
        prevDot.classList.remove('dots__item_active');
    }
    const currentDot = document.querySelector(`[data-dot-index="${newIndex}"]`);
    currentDot.classList.add('dots__item_active');
}

function onDotClick(event) {
    if (controlsIsActive) {
        const newIndex = Number(event.target.dataset.dotIndex);
        changeSlide(newIndex);
    }
}

function addListeners() {
    buttonRight.addEventListener('click', onNextSlide);
    buttonLeft.addEventListener('click', onPrevSlide);
    dots.forEach((dot) => dot.addEventListener('click', onDotClick));
}

function initSlider() {
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[sliderLength - 1].cloneNode(true);

    controlsIsActive = true;

    sliderBand.prepend(lastSlideClone);
    sliderBand.append(firstSlideClone);

    setSlide(firstIndex);
    instalDotActive(firstIndex);

    addListeners();
}

window.onload = () => initSlider();