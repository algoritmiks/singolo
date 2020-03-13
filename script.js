const headerMenu = document.querySelector(".header-menu");
const leftPhoneSwitcher = document.querySelector(".left-phone-switcher");
const rightPhoneSwitcher = document.querySelector(".right-phone-switcher");
const leftPhoneBlackScreen = document.querySelector(".left-phone-black-screen");
const rightPhoneBlackScreen = document.querySelector(".right-phone-black-screen");
const slides = document.querySelectorAll(".slider-image");
const leftArrow = document.querySelector(".slider-items__left-arrow");
const rightArrow = document.querySelector(".slider-items__right-arrow");
const portfolioMenuButtons = document.querySelector(".buttons");
const porfolioItems = document.querySelector(".portfolio-items");
const porfolioImage = document.querySelectorAll(".portfolio-image");
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const submitButton = document.querySelector(".btn-submit");
const closePopupButton = document.querySelector(".popup_btn");
const popupWindow = document.querySelector(".popup");
const email = document.forms["form"].email;
const name = document.forms["form"].name;
const subj = document.forms["form"].subj;
const message = document.forms["form"].msg;
let leftPhoneDisabled = false;
let rightPhoneDisabled = false;
let currentSlide = 0;
let nextSlide = 0;
let portfolioImagesSrc = [];

porfolioImage.forEach(e => portfolioImagesSrc.push(e.src));


closePopupButton.addEventListener('click', e => popupWindow.style.display="none");

submitButton.addEventListener('click', (e) => {
    if (email.checkValidity() && name.checkValidity()) {
        e.preventDefault();
        name.value="";
        email.value="";
        subj.value !== "" 
            ? document.querySelector(".popup__theme").textContent = `Тема: ${subj.value}` 
            : document.querySelector(".popup__theme").textContent = "Без темы"
        subj.value = "";
        message.value !==""
            ? document.querySelector(".popup__description").textContent = `Описание: ${message.value}` 
            : document.querySelector(".popup__description").textContent = "Без описания"
        message.value = "";
        popupWindow.style.display="block";

    }
});

porfolioItems.addEventListener('click', (e) => {
    if (e.target.tagName == "DIV") return;
    porfolioItems.querySelectorAll(".portfolio-image").forEach(el=>{
        e.target == el 
            ? (el.classList.contains("portfolio-image-active") 
                ? el.classList.remove("portfolio-image-active") 
                : el.classList.add("portfolio-image-active") )
            : el.classList.contains("portfolio-image-active") 
                ? el.classList.remove("portfolio-image-active") 
                : null
    });
});


const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
};

const replacePortfolioImages = () => {
    shuffle(portfolioImagesSrc);
    for (let i=0; i<porfolioImage.length; i++) {
        porfolioImage[i].src = portfolioImagesSrc[i];
    }
    porfolioItems.querySelectorAll(".portfolio-image").forEach(el=>{
        el.classList.remove("portfolio-image-active");});
}

portfolioMenuButtons.addEventListener('click', (e) => {
    if (e.target.tagName == "DIV") return;
    portfolioMenuButtons.querySelectorAll('.btn').forEach(el => {
        if ( e.target !== el ) {
            el.classList.remove("btn__active");
        } 
        if ( e.target == el && !el.classList.contains("btn__active") ) {
            e.target.classList.add("btn__active");
            replacePortfolioImages();
        }
    })
});

headerMenu.addEventListener('click', (event) => {
    headerMenu.querySelectorAll('a').forEach(el => {
        if (event.target.tagName == "A") {
            el.classList.remove("header-menu_active");
        }
    });
    if (event.target.tagName == "A") {
        event.target.classList.add("header-menu_active");
    }
});

slides.forEach((el, i) => {
    i == 0 ? slides[i].style.left = "0%" : slides[i].style.display = "none";
});

const moveSlides = (direction) => {
    switch (direction) {
        case RIGHT:
            nextSlide += 1;
            nextSlide > slides.length-1 ? nextSlide = 0 : null;
            slides[nextSlide].style.left = "100%";
            break;
        case LEFT:
            nextSlide -= 1;
            nextSlide < 0 ? nextSlide = slides.length-1 : null;
            slides[nextSlide].style.left = "-100%";
            break;
        default:
            break;
    }
    slides[nextSlide].style.display = "block";
    rightArrow.style.display = "none";
    leftArrow.style.display = "none";
    setTimeout( () => {
        slides[nextSlide].style.left = "0%";
        direction == RIGHT ? slides[currentSlide].style.left = "-100%" : slides[currentSlide].style.left = "100%";
        (direction == RIGHT && currentSlide == 0) || (direction == LEFT && currentSlide == 2)
            ? document.querySelector('.slider').classList.add('slider-blue')
            : document.querySelector('.slider').classList.remove('slider-blue');
    }, 1);
    setTimeout(() => {
        slides[currentSlide].style.display = "none";
        currentSlide = nextSlide;
        rightArrow.style.display = "block";
        leftArrow.style.display = "block";
    }, 1000);
}

rightArrow.addEventListener( 'click', () => moveSlides(RIGHT) );
leftArrow.addEventListener( 'click', () => moveSlides(LEFT) );

const switchPhone = (phone) => {
    phone == LEFT ? leftPhoneDisabled = !leftPhoneDisabled : rightPhoneDisabled = !rightPhoneDisabled;
    phone == LEFT 
        ? (leftPhoneDisabled ? leftPhoneBlackScreen.style.display = "block" : leftPhoneBlackScreen.style.display = "none")
        : (rightPhoneDisabled ? rightPhoneBlackScreen.style.display = "block" : rightPhoneBlackScreen.style.display = "none") 
}
leftPhoneSwitcher.addEventListener( 'click', () => switchPhone(LEFT) );
rightPhoneSwitcher.addEventListener( 'click', () => switchPhone(RIGHT) );