'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const operationBtn = document.querySelectorAll('.operations__tab');
const opertionCon = document.querySelectorAll('.operations__content');
const navbar = document.querySelector('.nav')
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Scroll to the top of the page
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

//Slider


const slide = document.querySelectorAll('.slide');
const sliderBtnR = document.querySelector('.slider__btn--right');
const sliderBtnL = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
const showDots = function(){
  slide.forEach(function(_,i){
    dotContainer.insertAdjacentHTML("beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`
    )
  })
}
showDots();
const dots = document.querySelectorAll('.dots__dot');

const removeDots = function(){
  dots.forEach(function(el){
    el.classList.remove('dots__dot--active');
  })
}

const showSlide = function(e){
  removeDots();
  e.classList.add('dots__dot--active')
  slide.forEach(function(el,i) {
    el.style.transform = `translateX(${100 * (i-currSlide)}%)`;
  })
}

let currSlide = 0;
showSlide(dots[0]);

sliderBtnR.addEventListener('click', function(){
  currSlide = (currSlide == slide.length-1) ? 0 : currSlide+1;
  showSlide(dots[currSlide]);
})

sliderBtnL.addEventListener('click', function(){
  currSlide = (currSlide == 0) ? slide.length-1 : currSlide-1;
  showSlide(dots[currSlide]);
})

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    currSlide = e.target.dataset.slide;
    showSlide(e.target);
  }
})




//Lazy loading
const lazyImg = document.querySelectorAll('img[data-src]');

const callBackFun3 = function(entries,observer){
  entries[0].target.src = entries[0].target.dataset.src;
  entries[0].target.addEventListener('load',function(){
    entries[0].target.classList.remove('lazy-img')
  })
}
const imgObserver = new IntersectionObserver(callBackFun3,{
  root : null,
  threshold : 0,
  rootMargin : '200px',
})
lazyImg.forEach(function(el){
  imgObserver.observe(el);
})

//Reveal Section code
const section = document.querySelectorAll('.section');

const callBackFun2 = function(entries,observer){
  entries[0].target.classList.remove('hidden');
  observer.unobserve(entries[0].target);
}
const sectionObserver = new IntersectionObserver(callBackFun2,{
  root : null,
  threshold : 0.2,
})
section.forEach(function(el){
  sectionObserver.observe(el);
  el.classList.add('hidden')
})

//Navigation bar sticky :
// const temp = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function(){
//   console.log(this.screenY , section1.getBoundingClientRect().top)
//   if(this.scrollY >= temp){
//     navbar.classList.add('sticky');
//   }
//   else{
//     navbar.classList.remove('sticky');
//   }
// }) // Not efficient


//Navigation bar sticky : - With Observer API
const callBackFun = function(entries){
  // console.log(entries);
  if(!entries[0].isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');  
}
const observerHeader = new IntersectionObserver(callBackFun,{
  root : null,
  threshold : 0,
  rootMargin : '-90px',
}) 

observerHeader.observe(header);

//Navigation fading code
document.querySelector('.nav').addEventListener('mouseover',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = document.querySelector('#logo')
    siblings.forEach(function(el){
      if(el !== link) el.style.opacity = '0.5';
    })
    logo.style.opacity = '0.5'
  }
})
document.querySelector('.nav').addEventListener('mouseout',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = document.querySelector('#logo')
    siblings.forEach(function(el){
      if(el !== link) el.style.opacity = '1';
    })
    logo.style.opacity = '1'
  }
})

//Tabbed buttons code
document.querySelector('.operations__tab-container').addEventListener('click', function(e){
  const tar = e.target.closest('.operations__tab');
  console.log(tar);

  if(tar){
    operationBtn.forEach(el => el.classList.remove('operations__tab--active'));
    opertionCon.forEach(el => el.classList.remove('operations__content--active'));

    tar.classList.add('operations__tab--active');
    console.log(tar.dataset.tab);
    document.querySelector(`.operations__content--${tar.dataset.tab}`).classList.add('operations__content--active');
  }
})

//Navigation button code
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link'))
  document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior:"smooth"})
})


//Scroll button - (Read More button) code
btnScrollTo.addEventListener('click', function(){
  console.log(window.scrollX,scrollY)
  console.log(section1.getBoundingClientRect())
  console.log(document.documentElement.clientHeight)
  section1.scrollIntoView({behavior:"smooth"});
})

//Modal Opening Code
btnsOpenModal.forEach((ele) => ele.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



