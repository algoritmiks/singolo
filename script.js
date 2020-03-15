const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);
const LEFT = "LEFT", RIGHT = "RIGHT";
let isLeftPhoneDisabled = false, isRightPhoneDisabled = false;
let currentSlide = 0, nextSlide = 0, portfolioImagesSrc = [];

$All(".portfolio-image").forEach(e => portfolioImagesSrc.push(e.src));
$All(".slider-image").forEach( (el, i) => i==0 ? $All(".slider-image")[i].style.left="0%" : $All(".slider-image")[i].style.display="none" );

const moveSlides = (direction) => {
    switch (direction) {
        case RIGHT:
            nextSlide += 1;
            nextSlide > $All(".slider-image").length-1 ? nextSlide = 0 : null;
            $All(".slider-image")[nextSlide].style.left = "100%";
            break;
        case LEFT:
            nextSlide -= 1;
            nextSlide < 0 ? nextSlide = $All(".slider-image").length-1 : null;
            $All(".slider-image")[nextSlide].style.left = "-100%";
            break;
        default:
            break;
    }
    $All(".slider-image")[nextSlide].style.display = "block";
    $(".slider-items__right-arrow").style.display = "none";
    $(".slider-items__left-arrow").style.display = "none";
    setTimeout( () => {
        $All(".slider-image")[nextSlide].style.left = "0%";
        direction === RIGHT
            ? $All(".slider-image")[currentSlide].style.left = "-100%"
            : $All(".slider-image")[currentSlide].style.left = "100%";
        (direction === RIGHT && currentSlide == 0) || (direction === LEFT && currentSlide == 2)
            ? $('.slider').classList.add('slider-blue')
            : $('.slider').classList.remove('slider-blue');
    }, 30);
    setTimeout( () => {
        $All(".slider-image")[currentSlide].style.display = "none";
        currentSlide = nextSlide;
        $(".slider-items__right-arrow").style.display = "block";
        $(".slider-items__left-arrow").style.display = "block";
    }, 1000);
}

const switchPhone = (phone) => {
    phone === LEFT ? isLeftPhoneDisabled = !isLeftPhoneDisabled : isRightPhoneDisabled = !isRightPhoneDisabled;
    phone === LEFT
        ? (isLeftPhoneDisabled ? $(".left-phone-black-screen").style.display = "block" : $(".left-phone-black-screen").style.display = "none")
        : (isRightPhoneDisabled ? $(".right-phone-black-screen").style.display = "block" : $(".right-phone-black-screen").style.display = "none")
}

const replacePortfolioImages = () => {
    portfolioImagesSrc.sort( () => Math.random() - 0.5 );
    for ( let i=0; i<portfolioImagesSrc.length; i++ ) {
        $All(".portfolio-image")[i].src = portfolioImagesSrc[i];
    }
    $(".portfolio-items").querySelectorAll(".portfolio-image").forEach(el=>{
        el.classList.remove("portfolio-image-active");});
}

$(".buttons").addEventListener('click', (e) => {
    if (e.target.tagName === "DIV") return;
    $(".buttons").querySelectorAll('.btn').forEach(el => {
        if ( e.target !== el ) {
            el.classList.remove("btn__active");
        }
        if ( e.target == el && !el.classList.contains("btn__active") ) {
            e.target.classList.add("btn__active");
            replacePortfolioImages();
        }
    })
});

$(".header-menu").addEventListener('click', (e) => {
    if ( e.target.tagName !== "A" ) return;
    $(".header-menu").querySelectorAll('a').forEach(el => {
        el.classList.remove("header-menu_active");
        e.target.classList.add("header-menu_active");
    })
});

$(".btn-submit").addEventListener('click', (e) => {
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
        $(".popup").style.display="block";
        $("body").style.overflow="hidden";
    }
});

$(".portfolio-items").addEventListener('click', (e) => {
    if (e.target.tagName === "DIV") return;
    $(".portfolio-items").querySelectorAll(".portfolio-image").forEach(el=>{
        e.target === el
            ? (el.classList.contains("portfolio-image-active")
                ? el.classList.remove("portfolio-image-active") : el.classList.add("portfolio-image-active"))
            : el.classList.contains("portfolio-image-active")
                ? el.classList.remove("portfolio-image-active") : null;
    });
});

$(".left-phone-switcher").addEventListener( 'click', () => switchPhone(LEFT) );
$(".right-phone-switcher").addEventListener( 'click', () => switchPhone(RIGHT) );
$(".slider-items__right-arrow").addEventListener( 'click', () => moveSlides(RIGHT) );
$(".slider-items__left-arrow").addEventListener( 'click', () => moveSlides(LEFT) );
$(".popup_btn").addEventListener('click', e => {
    $(".popup").style.display="none";
    $("body").style.overflow="visible";
});