//anchor moves
function moveToAnchor(id){
  document.getElementById(id).scrollIntoView({behavior: "smooth"})
}

const Works = document.querySelectorAll(".work-card")
const Filters = document.querySelectorAll(".portfolio__button")

//portfolio works filter
function filterWorks(name){
  Filters.forEach(filter => {
    filter.classList.remove("button_selected");
  })
  switch (name) {
    case("work-frontend"):
      document.getElementById("filterFrontend").classList.add("button_selected");
      break;
    case("work-design"):
      document.getElementById("filterDesign").classList.add("button_selected");
      break;
    case("work-card"):
      document.getElementById("filterAll").classList.add("button_selected");
      break;
  }
  Works.forEach(work => {
     !work.classList.contains(name)
       ? work.classList.add("work-card_hidden")
       : work.classList.remove("work-card_hidden");
  })
}

//gallery slider settings
if (document.querySelector('.swiper-wrapper') !== null){
const GallerySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.gallery_next',
    prevEl: '.gallery_prev',
  },
  breakpoints: {
    600:{
      slidesPerView: 2.5,
    },
    900:{
      slidesPerView: 3.5,
    }
  }
})
};



//marking visited works
function markAsVisited(name){
  localStorage.setItem(name,'visited');
}

//array with information about works
const WorksInfo = [
  {image: 'ural_cup', title: 'Кубок Урала 2018', subtitle: 'Оформление киберспортивного фестиваля'},
  {image: 'zvezda_logo', title: 'ФК "Звезда"', subtitle: 'Логотип футбольного клуба'},
  {image: 'zvezda_1920', title: 'ФК "Звезда" Сезон 19/20', subtitle: 'Фирменный стиль футбольного клуба'},
  {image: 'digital_ball', title: 'Цифровой мяч', subtitle: 'Оформление киберспортивного фестиваля'},
  {image: 'arena_arsenal', title: 'Arena Arsenal', subtitle: 'Фирменный стиль киберспортивного пространства'},
  {image: 'zvezda_1819', title: 'ФК "Звезда" Сезон 18/19', subtitle: 'Оформление медиасетей футбольного клуба'},
  {image: 'zvezda_1819_2.0', title: 'ФК "Звезда" Сезон 18/19 2.0', subtitle: 'Фирменный стиль футбольного клуба'},
  {image: 'dimontello', title: 'Dimontello', subtitle: 'Логотип киберспортсмена'},
  {image: 'afangess', title: 'Afangess', subtitle: 'Оформление медиасетей киберспортсмена'},
  {image: 'acrid', title: 'Acrid', subtitle: 'Логотип киберспортсмена'},
  {image: 'quenta', title: 'Quenta', subtitle: 'Логотип объединения квестов'},
  {image: 'demise', title: 'Demise', subtitle: 'Логотип киберспортивной команды'},
  {image: 'dikiy_zapad', title: 'Дикий запад', subtitle: 'Логотип парка активного отдыха'},
  {image: 'cyberfootball_perm', title: 'Федерация киберфутбола', subtitle: 'Логотип киберспортивной организации'},
  {image: 'station_konechnaya', title: 'Станция Конечная Спартак-Москва', subtitle: 'Концепт освещения новостей клуба'},
  {image: 'rostra_piter', title: 'Ростра Питер', subtitle: 'Сайт строительной компании'},
];

//storing work visiting marks
WorksInfo.forEach(workInfo => {
  if (localStorage.getItem(workInfo.image) === undefined) {
    localStorage.setItem(workInfo.image, "unvisited");
  }
})

//creating an "other works" list
function createOtherWorksList() {
  let works = {...localStorage}
  let otherWorks = [];
  let worksVisited = [];
  let size = 3;
  console.log(works);
  for (let i in WorksInfo){
    if (works[WorksInfo[i].image] !== 'visited') {
      otherWorks.push(WorksInfo[i])
      console.log(WorksInfo.find(workInfo => workInfo.image === i));
    }
    else{
      worksVisited.push(i);
    }
    console.log(otherWorks);
    if (otherWorks.length === size){
      return otherWorks;
    }
  }
  let i = 0;
  while (otherWorks.length < size){
    otherWorks.push(worksVisited[i]);
    i++;
  }
  return otherWorks;
}

//adding "other works" elements to html
function addOtherWorksElements() {
  let otherWorksRow = document.getElementById('otherWorksRow');
  let elements = createOtherWorksList();
  if (otherWorksRow != null){
    elements.forEach(element => {
      document.getElementById('otherWorksRow').innerHTML +=
      `<div class="work-card fade-animation work-design">
        <div class="work-card__image" style="background: url(${ 'img/works/previews/' + element.image + '.png'}) center/cover no-repeat"></div>
        <div class="work-card__text">
            <div class="work-card__title work-card_animated-short">${element.title}</div>
            <div class="work-card__subtitle">${element.subtitle}</div>
        </div>
      </div>`;
    })
  }
}

addOtherWorksElements();

const FadeInElements = document.querySelectorAll(".fade-animation")

//fade-in observer
const FadeInObserver = new IntersectionObserver(function
  (entries){
  entries.forEach(entry => {
    console.log(entry);
    setTimeout(() =>
    {entry.isIntersecting
      ? entry.target.classList.add("fade-animation_in")
      : entry.target.classList.remove("fade-animation_in")
    }, 100);
  })
})

FadeInElements.forEach(element => {
  FadeInObserver.observe(element);
})
