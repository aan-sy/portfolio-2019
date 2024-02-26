const music = document.querySelector('.home__player__audio');
const playButton = document.querySelector('.home__player__button');
const timeline = document.querySelector('.home__player__timeline');
const playhead = document.querySelector('.home__player__playhead');
const mutedButton = document.querySelector('.home__player__muted');
const mutedIcon = mutedButton.querySelector('.fa-solid');
let timelineWidth = timeline.getBoundingClientRect().width - playhead.getBoundingClientRect().width;
let audioDuration;

const activeMutedButton = () => {
  mutedButton.style.opacity = 1;
  mutedButton.style.visibility = 'visible';
}

const playMusic = () => {
  if(music.paused) {
    music.play();
    playButton.ariaLabel = 'audio pause';
    playButton.style.background = 'url(../assets/images/icons/pause.svg) no-repeat center / contain';
  } else {
    music.pause();
    playButton.ariaLabel = 'audio play';
    playButton.style.background = 'url(../assets/images/icons/play.svg) no-repeat center / contain';
  }

  activeMutedButton();
}

const updateTimeline = () => {
  timelineWidth = timeline.getBoundingClientRect().width - playhead.getBoundingClientRect().width;
  const playLength = timelineWidth * (music.currentTime / audioDuration);
  playhead.style.transform = `translateX(${playLength}px)`;
}

const controlTimeline = (e) => {
  playhead.style.transform = `translateX(${e.clientX}px)`;
  music.currentTime = (e.clientX / timelineWidth) * audioDuration;
}

const controlMuted = () => {
  if(music.muted) {
    music.muted = false;
    mutedIcon.classList.remove('fa-volume-xmark');
    mutedIcon.classList.add('fa-volume-high');
  } else {
    music.muted = true;
    mutedIcon.classList.remove('fa-volume-high');
    mutedIcon.classList.add('fa-volume-xmark');
  }
}

// 노래 길이 읽어오기
music.addEventListener('canplaythrough', () => {audioDuration = music.duration});

// 버튼 클릭 시 노래 재생 및 일시 정지
playButton.addEventListener('click', playMusic)

// 노래 재생 시 타임라인 업데이트
music.addEventListener('timeupdate', updateTimeline)

// 타임라인 위치 움직이기 (노래 재생 구간 움직이기)
timeline.addEventListener('click', controlTimeline)

// 리사이즈 되면 타임라인 업데이트
document.addEventListener('resize', updateTimeline)

// 음소거 버튼 클릭 시 볼륨 키우기
mutedButton.addEventListener('click', controlMuted)
