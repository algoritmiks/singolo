const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);
let currentSlide = 0, nextSlide = 0, portfolioImagesSrc = [];

//src of images to array
$All(".portfolio-image").forEach(e => portfolioImagesSrc.push(e.src));

//first slide position
$All(".slider-image")[0].style.left = "0%";

const onScrollHandler = (e) => {
  const sections = $All("section");
  const menuItems = $(".header-menu").querySelectorAll("a");
  const totalMenuItems = menuItems.length;
  let scroll = window.scrollY;
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  sections.forEach(section => {
    if (section.offsetTop - $('.header').offsetHeight <= scroll && (section.offsetTop + section.offsetHeight) > scroll) {
      menuItems.forEach(e => {
        e.classList.remove("header-menu_active");
        if (e.getAttribute('href').includes(section.classList[0])) {
          e.classList.add("header-menu_active");
        }
      });
    }
  });
  if (scroll >= scrollHeight - innerHeight) {
    menuItems.forEach(e => e.classList.remove("header-menu_active"));
    menuItems[totalMenuItems - 1].classList.add("header-menu_active");
  }
}

document.addEventListener('scroll', onScrollHandler);


$(".slider-items__right-arrow").addEventListener('click', () => moveSlidesHandler("RIGHT"));
$(".slider-items__left-arrow").addEventListener('click', () => moveSlidesHandler("LEFT"));

//move slides by press arrow
const moveSlidesHandler = (direction) => {
  setNextSlidePosition(direction);
  switchArrowsVisibility("none");
  moveSlidesAhead(direction);
}

//set next slide depending on press arrow
const setNextSlidePosition = (direction) => {
  if (direction === "RIGHT") {
    nextSlide += 1;
    if (nextSlide > $All(".slider-image").length - 1) nextSlide = 0;
    $All(".slider-image")[nextSlide].style.left = "100%";
  } else {
    nextSlide -= 1;
    if (nextSlide < 0) nextSlide = $All(".slider-image").length - 1;
    $All(".slider-image")[nextSlide].style.left = "-100%";
  }
  $All(".slider-image")[nextSlide].classList.remove("hidden");
}

//move slides to new position
const moveSlidesAhead = (direction) => {
  setTimeout(() => {
    $All(".slider-image")[nextSlide].style.left = "0%";
  }, 30);
  direction === "RIGHT"
    ? $All(".slider-image")[currentSlide].style.left = "-100%"
    : $All(".slider-image")[currentSlide].style.left = "100%";
  setSlideBackgroundColor(direction);
  hideSlideAfterMove();
}

//set background for slides
const setSlideBackgroundColor = (direction) => {
  currentSlide == 0
    ? $('.slider').classList.add('slider-blue')
    : $('.slider').classList.remove('slider-blue');
}

//hide slide after move
const hideSlideAfterMove = () => {
  setTimeout(() => {
    $All(".slider-image")[currentSlide].classList.add("hidden");
    currentSlide = nextSlide;
    switchArrowsVisibility("block");
  }, 1000);
}

//set arrows visibility
const switchArrowsVisibility = (status) => {
  $(".slider-items__right-arrow").style.display = status;
  $(".slider-items__left-arrow").style.display = status;
}

$(".right-phone-switcher").addEventListener('click', () => switchPhoneHandler(".right-phone-black-screen"));
$(".left-phone-switcher").addEventListener('click', () => switchPhoneHandler(".left-phone-black-screen"));

//switch on\off phones screens
const switchPhoneHandler = (phone) => {
  $(phone).classList.contains("hidden")
    ? $(phone).classList.remove("hidden")
    : $(phone).classList.add("hidden")
}

$(".buttons").addEventListener('click', e => setActivePortfolioMenuHandler(e));

//set active category in portfolio
const setActivePortfolioMenuHandler = (e) => {
  $(".buttons").querySelectorAll('.btn').forEach(el => {
    if (e.target.tagName === "BUTTON") {
      if (e.target !== el) {
        el.classList.remove("btn__active");
      }
      if (e.target == el && !el.classList.contains("btn__active")) {
        e.target.classList.add("btn__active");
        replacePortfolioImages();
        $All(".portfolio-image").forEach(el => {
          el.classList.remove("portfolio-image-active");
        });
      }
    }
  })
}

//pictures sort in portfolio
const replacePortfolioImages = () => {
  shuffle();
  for (let i = 0; i < portfolioImagesSrc.length; i++) {
    $All(".portfolio-image")[i].src = portfolioImagesSrc[i];
  }
}

//shuffle array
const shuffle = () => {
  const oldArr = [...portfolioImagesSrc];
  const replace = () => {
    portfolioImagesSrc.sort(() => Math.random() - 0.5);
    oldArr.forEach((el, i) => {
      if (el === portfolioImagesSrc[i]) {
        replace();
      };
    });
  }
  replace();
}

$(".portfolio-items").addEventListener('click', e => setActivePortfolioImageHandler(e));

//set active picture in potrfolio
const setActivePortfolioImageHandler = (e) => {
  $(".portfolio-items").querySelectorAll(".portfolio-image").forEach(el => {
    if (e.target.tagName === "IMG") {
      if (e.target === el) {
        if (el.classList.contains("portfolio-image-active")) {
          el.classList.remove("portfolio-image-active");
        } else {
          el.classList.add("portfolio-image-active");
        }
      } else {
        el.classList.remove("portfolio-image-active");
      }
    }
  });
}

$(".btn-submit").addEventListener('click', e => submitFormHandler(e));

//form submit
const submitFormHandler = (e) => {
  if (document.forms["form"].email.checkValidity() && document.forms["form"].name.checkValidity()) {
    e.preventDefault();
    fillFormSubject();
    fillFormMessage();
    clearForm();
    showPopupWindow();
  }
}

//fill subject
const fillFormSubject = () => {
  document.forms["form"].subj.value !== ""
    ? $(".popup__theme").textContent = `Тема: ${document.forms["form"].subj.value}`
    : $(".popup__theme").textContent = "Без темы";
}

//fill message
const fillFormMessage = () => {
  document.forms["form"].msg.value !== ""
    ? $(".popup__description").textContent = `Описание: ${document.forms["form"].msg.value}`
    : $(".popup__description").textContent = "Без описания";
}

//clear form
const clearForm = () => {
  document.forms["form"].reset();
}

//show modal window after submit form
const showPopupWindow = () => {
  $(".popup").classList.remove("hidden");
  $("body").style.overflow = "hidden";
}

$(".popup_btn").addEventListener('click', () => popupButtonHandler());

//close modal window
const popupButtonHandler = () => {
  $(".popup").classList.add("hidden");
  $("body").style.overflow = "visible";
}

const openSideMenu = () => {
  $(".hamburger").classList.add("hamburger__opened");
  $(".header-navigation").style.left = "0%";
  $(".logo").style.left = "100px";
  $("body").style.overflow="hidden";
  $(".acitve-mobile-menu").classList.add("header-navigation__background");
}


const closeSideMenu = () => {
  $(".hamburger").classList.remove("hamburger__opened");
  $(".header-navigation").style.left = "-100%";
  $(".logo").style.left = "50%";
  $("body").style.overflow = "visible";
  $(".acitve-mobile-menu").classList.remove("header-navigation__background");
}

const clickHamburgerHandler = () => {
  if ($(".header-navigation").style.left === "-100%" || $(".header-navigation").style.left === "") {
    openSideMenu();
  } else {
    closeSideMenu();
  }
}

$(".hamburger").addEventListener('click', clickHamburgerHandler);


const pressNavigationHandler = (e) => {
  if (e.target.tagName === "A") {
    closeSideMenu();
  }
}

$(".header-navigation").addEventListener('click', pressNavigationHandler);