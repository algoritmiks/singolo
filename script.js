const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);
let currentSlide = 0, nextSlide = 0, portfolioImagesSrc = [];

//src всех картинок в массив
$All(".portfolio-image").forEach(e => portfolioImagesSrc.push(e.src));

//Позиционирование первого слайда
$All(".slider-image")[0].style.left="0%";

//Нажатия стрелок влево и вправо
$(".slider-items__right-arrow").addEventListener( 'click', () => moveSlidesHandler("RIGHT") );
$(".slider-items__left-arrow").addEventListener( 'click', () => moveSlidesHandler("LEFT") );

//Перемещения слайдов по нажатию стрелок.
const moveSlidesHandler = (direction) => {
    setNextSlidePosition(direction);
    switchArrowsVisibility("none");
    moveSlidesAhead(direction);
}

//Установка следующего слайда в зависимости от нажатой стрелки
const setNextSlidePosition = (direction) => {
    if (direction === "RIGHT") {
        nextSlide += 1;
        if (nextSlide > $All(".slider-image").length-1) nextSlide = 0;
        $All(".slider-image")[nextSlide].style.left = "100%";
    } else {
        nextSlide -= 1;
        if (nextSlide < 0)  nextSlide = $All(".slider-image").length-1;
        $All(".slider-image")[nextSlide].style.left = "-100%";
    }
    $All(".slider-image")[nextSlide].classList.remove("hidden");

}

//Перемещение слайдов на новую позицию
const moveSlidesAhead = (direction) => {
    setTimeout( () => {
        $All(".slider-image")[nextSlide].style.left = "0%";    
    }, 30);

    direction === "RIGHT"
        ? $All(".slider-image")[currentSlide].style.left = "-100%"
        : $All(".slider-image")[currentSlide].style.left = "100%";

    setSlidesBackgroundColor(direction);

    hideSlideAfterMove();
}

//Задание фона для слайдов
const setSlidesBackgroundColor = (direction) => {
    (direction === "RIGHT" && currentSlide == 0) || (direction === "LEFT" && currentSlide == 2)
        ? $('.slider').classList.add('slider-blue')
        : $('.slider').classList.remove('slider-blue');
}

//Спрятать слайд после перемещения
const hideSlideAfterMove = () => {
    setTimeout( () => {
        $All(".slider-image")[currentSlide].classList.add("hidden");
        currentSlide = nextSlide;
        switchArrowsVisibility("block");    
    }, 1000);
}

//Установка видимости стрелок
const switchArrowsVisibility = (status) => {
    $(".slider-items__right-arrow").style.display = status;
    $(".slider-items__left-arrow").style.display = status;
}

//Включение-выключение экранов телефонов
$(".right-phone-switcher").addEventListener( 'click', () => switchPhoneHandler(".right-phone-black-screen") );
$(".left-phone-switcher").addEventListener( 'click', () => switchPhoneHandler(".left-phone-black-screen") );

const switchPhoneHandler = (phone) => {
    $(phone).classList.contains("hidden")
        ? $(phone).classList.remove("hidden")
        : $(phone).classList.add("hidden")
}

$(".buttons").addEventListener( 'click', e => portfolioMenuHandler(e) );

//Переключение активной категории portfolio
const portfolioMenuHandler = (e) => {
    $(".buttons").querySelectorAll('.btn').forEach(el => {
        if (e.target.tagName === "BUTTON") {
            if ( e.target !== el ) {
                el.classList.remove("btn__active");
            }
            if ( e.target == el && !el.classList.contains("btn__active") ) {
                e.target.classList.add("btn__active");
                replacePortfolioImages();
                $(".portfolio-items").querySelectorAll(".portfolio-image").forEach(el=>{
                    el.classList.remove("portfolio-image-active");});
            }
        }
    })
}

//Сортировка картинок в portfolio
const replacePortfolioImages = () => {
    portfolioImagesSrc.sort( () => Math.random() - 0.5 );
    for ( let i=0; i<portfolioImagesSrc.length; i++ ) {
        $All(".portfolio-image")[i].src = portfolioImagesSrc[i];
    }
}

//Переключение активной категории меню в header
$(".header-menu").addEventListener( 'click', e => headerMenuHandler(e) );

const headerMenuHandler = (e) => {
    $(".header-menu").querySelectorAll('a').forEach(el => {
        if ( e.target.tagName === "A" ) {
            el.classList.remove("header-menu_active");
            e.target.classList.add("header-menu_active");
        }
    })
}


$(".btn-submit").addEventListener( 'click', e => formSubmitHandler(e) );

//сабмит формы
const formSubmitHandler = (e) => {
    if (document.forms["form"].email.checkValidity() && document.forms["form"].name.checkValidity()) {
        e.preventDefault();
        document.forms["form"].name.value="";
        document.forms["form"].email.value="";
        document.forms["form"].subj.value !== ""
            ? $(".popup__theme").textContent = `Тема: ${document.forms["form"].subj.value}`
            : $(".popup__theme").textContent = "Без темы";
        document.forms["form"].subj.value = "";
        document.forms["form"].msg.value !==""
            ? $(".popup__description").textContent = `Описание: ${document.forms["form"].msg.value}`
            : $(".popup__description").textContent = "Без описания";
        document.forms["form"].msg.value = "";
        $(".popup").classList.remove("hidden");
        $("body").style.overflow="hidden";
    }
}

$(".portfolio-items").addEventListener( 'click', e => portfolioImagesHandler(e) );

//Включение-выключение активной картинки в портфолио
const portfolioImagesHandler = (e) => {
    $(".portfolio-items").querySelectorAll(".portfolio-image").forEach( el => {
        if (e.target.tagName !== "IMG") return;
        if (e.target === el) {
            if ( el.classList.contains("portfolio-image-active") ) {
                el.classList.remove("portfolio-image-active");
            } else {
                el.classList.add("portfolio-image-active");
            }
        } else {
            if ( el.classList.contains("portfolio-image-active") ) {
                el.classList.remove("portfolio-image-active");
            }
        }
    });
}

$(".popup_btn").addEventListener( 'click', () => popupButtonHandler() );

//закрытие модального окна
const popupButtonHandler = () => {
    $(".popup").classList.add("hidden");
    $("body").style.overflow="visible";   
}