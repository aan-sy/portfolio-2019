const sectionIds = [
  '#message',
  '#about',
  '#skills',
  '#work',
  '#others',
  '#contact',
]
const sections = sectionIds.map(id => document.querySelector(id));
const works = document.querySelectorAll('.work__content');

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      if(entry.target.id !== 'work') {
        if(entry.intersectionRatio >= 0.3) {
          entry.target.classList.add('anim');
        }
      } else {
        entry.target.classList.add('anim');
      }
    }
  })
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: [0.1, 0.4],
}

const observer = new IntersectionObserver(observerCallback, options);
sections.forEach(section => observer.observe(section));
works.forEach(work => observer.observe(work));
