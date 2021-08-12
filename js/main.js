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
  {id: 'zvezda_logo', title: 'ФК "Звезда"', subtitle: 'Логотип футбольного клуба'},
  {id: 'zvezda_1920', title: 'ФК "Звезда" Сезон 19/20', subtitle: 'Фирменный стиль футбольного клуба'},
  {id: 'digital_ball', title: 'Цифровой мяч', subtitle: 'Оформление киберспортивного фестиваля'},
  {id: 'arena_arsenal', title: 'Arena Arsenal', subtitle: 'Фирменный стиль киберспортивного пространства'},
  {id: 'zvezda_1819', title: 'ФК "Звезда" Сезон 18/19', subtitle: 'Оформление медиасетей футбольного клуба'},
  {id: 'zvezda_1819_2.0', title: 'ФК "Звезда" Сезон 18/19 2.0', subtitle: 'Фирменный стиль футбольного клуба'},
  {id: 'ural_cup', title: 'Кубок Урала 2018', subtitle: 'Оформление киберспортивного фестиваля'},
  {id: 'dimontello', title: 'Dimontello', subtitle: 'Логотип киберспортсмена'},
  {id: 'afangess', title: 'Afangess', subtitle: 'Оформление медиасетей киберспортсмена'},
  {id: 'acrid', title: 'Acrid', subtitle: 'Логотип киберспортсмена'},
  {id: 'quenta', title: 'Quenta', subtitle: 'Логотип объединения квестов'},
  {id: 'demise', title: 'Demise', subtitle: 'Логотип киберспортивной команды'},
  {id: 'dikiy_zapad', title: 'Дикий запад', subtitle: 'Логотип парка активного отдыха'},
  {id: 'cyberfootball_perm', title: 'Федерация киберфутбола', subtitle: 'Логотип киберспортивной организации'},
  {id: 'station_konechnaya', title: 'Станция Конечная Спартак-Москва', subtitle: 'Концепт освещения новостей клуба'},
  {id: 'rostra_piter', title: 'Ростра Питер', subtitle: 'Сайт строительной компании'},
];


//storing work visiting marks
WorksInfo.forEach(workInfo => {
  if (localStorage.getItem(workInfo.id) === undefined) {
    localStorage.setItem(workInfo.id, "unvisited");
  }
})

//checking for visiting marks reset
function tryResetVisitingMarks() {
  for (let i in WorksInfo) {
    if (localStorage.getItem(WorksInfo[i].id) !== "visited")
      return;
  }
  WorksInfo.forEach(workInfo => {
    localStorage.setItem(workInfo.id, "unvisited");
  })
}

tryResetVisitingMarks();


//creating an "other works" list
function createOtherWorksList() {
  let works = {...localStorage}
  let otherWorks = [];
  let worksVisited = [];
  let size = 3;
  for (let i in WorksInfo){
    works[WorksInfo[i].id] !== 'visited'
      ? otherWorks.push(WorksInfo[i])
      : worksVisited.push(WorksInfo[i]);
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
      `<a class="work-card fade-animation work-design" href="${element.id + ".html"}" onclick="markAsVisited('${element.id}')">
        <div class="work-card__image" style="background: url(${ 'img/works/previews/' + element.id + '.png'}) center/cover no-repeat"></div>
        <div class="work-card__text">
            <div class="work-card__title work-card_animated-short">${element.title}</div>
            <div class="work-card__subtitle">${element.subtitle}</div>
        </div>
      </a>`;
    })
  }
}

addOtherWorksElements();

const FadeInElements = document.querySelectorAll(".fade-animation")

//fade-in observer
const FadeInObserver = new IntersectionObserver(function
  (entries){
  entries.forEach(entry => {
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

