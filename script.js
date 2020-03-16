const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);
const LEFT = "LEFT", RIGHT = "RIGHT";
let currentSlide = 0, nextSlide = 0, portfolioImagesSrc = [];

//src всех картинок в массив
$All(".portfolio-image").forEach(e => portfolioImagesSrc.push(e.src));

//Первоначально все слайды невидимые в стартовой позиции
$All(".slider-image").forEach( (el, i) => {
    i==0 
        ? $All(".slider-image")[i].style.left="0%" 
        : $All(".slider-image")[i].style.display="none" 
});

//Нажатия кнопок влево и вправо
$(".slider-items__right-arrow").addEventListener( 'click', () => moveSlides(RIGHT) );
$(".slider-items__left-arrow").addEventListener( 'click', () => moveSlides(LEFT) );

const moveSlides = (direction) => {
    setNextSlidePosition(direction);
    switchArrowsVisibility("none");
    moveSlidesAhead(direction);
}

const setNextSlidePosition = (direction) => {
    if (direction === RIGHT) {
        nextSlide += 1;
        if (nextSlide > $All(".slider-image").length-1) nextSlide = 0;
        $All(".slider-image")[nextSlide].style.left = "100%";
    } else {
        nextSlide -= 1;
        if (nextSlide < 0)  nextSlide = $All(".slider-image").length-1;
        $All(".slider-image")[nextSlide].style.left = "-100%";
    }
    $All(".slider-image")[nextSlide].style.display = "block";
}

const switchArrowsVisibility = (status) => {
    $(".slider-items__right-arrow").style.display = status;
    $(".slider-items__left-arrow").style.display = status;
}

const moveSlidesAhead = (direction) => {
    setTimeout( () => {
        $All(".slider-image")[nextSlide].style.left = "0%";    
    }, 30);

    direction === RIGHT
        ? $All(".slider-image")[currentSlide].style.left = "-100%"
        : $All(".slider-image")[currentSlide].style.left = "100%";
    (direction === RIGHT && currentSlide == 0) || (direction === LEFT && currentSlide == 2)
        ? $('.slider').classList.add('slider-blue')
        : $('.slider').classList.remove('slider-blue');

    setTimeout( () => {
        $All(".slider-image")[currentSlide].style.display = "none";
        currentSlide = nextSlide;
        switchArrowsVisibility("block");
    }, 1000);
}

//Включение-выключение экранов телефонов
$(".left-phone-switcher").addEventListener( 'click', () => switchPhone(LEFT) );
$(".right-phone-switcher").addEventListener( 'click', () => switchPhone(RIGHT) );

const switchPhone = (phone) => {
    if (phone === LEFT) {
        $(".left-phone-black-screen").classList.contains("hidden") 
            ? $(".left-phone-black-screen").classList.remove("hidden")
            : $(".left-phone-black-screen").classList.add("hidden")
    } else {
        $(".right-phone-black-screen").classList.contains("hidden") 
            ? $(".right-phone-black-screen").classList.remove("hidden")
            : $(".right-phone-black-screen").classList.add("hidden")
    }
}

//Сортировка картинок в portfolio
const replacePortfolioImages = () => {
    portfolioImagesSrc.sort( () => Math.random() - 0.5 );
    for ( let i=0; i<portfolioImagesSrc.length; i++ ) {
        $All(".portfolio-image")[i].src = portfolioImagesSrc[i];
    }
}

//Переключение активной категории portfolio
$(".buttons").addEventListener('click', (e) => {
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
});

//Переключение активной категории меню в header
$(".header-menu").addEventListener('click', (e) => {
    $(".header-menu").querySelectorAll('a').forEach(el => {
        if ( e.target.tagName === "A" ) {
            el.classList.remove("header-menu_active");
            e.target.classList.add("header-menu_active");
        }
    })
});

//сабмит формы
$(".btn-submit").addEventListener('click', (e) => { formSubmit(e) });


const formSubmit = (e) => {
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

//Включение-выключение активной картинки в портфолио
$(".portfolio-items").addEventListener('click', (e) => {
    $(".portfolio-items").querySelectorAll(".portfolio-image").forEach(el=>{
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
});


//закрытие модального окна
$(".popup_btn").addEventListener('click', e => {
    $(".popup").classList.add("hidden");
    $("body").style.overflow="visible";
});