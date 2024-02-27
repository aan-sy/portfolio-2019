// 마우스 오버 시 점수 나타내기
const skills = document.querySelector('.skills__titles');

const handleMouseOver = (e) => {
  const skill = e.target.dataset.skill;
  if(!skill) return;
  const scores = document.querySelectorAll('.skills__score');
  scores.forEach(score => {
    if(score.dataset.type === skill) {
      score.classList.add('on');
    } else {
      score.classList.remove('on');
    }
  })
}

skills.addEventListener('mouseover', handleMouseOver)

// 스크롤시 텍스트 가로로 움직이기
const copySection = document.querySelector('.copy');
const copies = document.querySelectorAll('.copy__words');

const moveCopy = () => {
  copies.forEach((copy, i) => {
    let offset = scrollY - copy.offsetTop;
    switch (i) {
      case 0:
        offset = offset * 0.8;
        break;
      case 1:
        offset = offset * -0.5;
        break;
      case 2:
        offset = offset * 0.5;
        break;
      case 3:
        offset = offset * -0.6;
    }
    copy.style.transform = `translateX(${offset}px)`;
  })
}

const observerCallback = (entries) => {
  if(entries[0].isIntersecting) {
    document.addEventListener('scroll', moveCopy)
  } else {
    document.removeEventListener('scroll', moveCopy)
  }
}

const options = {
  root: null,
  rootMargin: '200px 0px',
  threshold: 0,
}

const observer = new IntersectionObserver(observerCallback, options);
observer.observe(copySection);


// 아코디언 메뉴
const accordion = document.querySelector('.others__accordion');

accordion.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter;
  if(!filter) return;

  const animations = document.querySelectorAll('.others_animation');
  const toggles = document.querySelectorAll('.others__toggle__wrapper');
  const toggleAccordion = (ele) => {
    if(ele.dataset.type === filter) {
      ele.classList.toggle('active');
    } else {
      ele.classList.remove('active');
    }
  }

  animations.forEach(animation => toggleAccordion(animation))
  toggles.forEach(toggle => toggleAccordion(toggle))
})