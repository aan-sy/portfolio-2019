// 스크롤시 Copy section 가로로 움직이기
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