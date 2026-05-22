
const ratio = 0.1;
const options = {
  root: null,
  rootMargin: '0px',
  threshold: ratio
};

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll('.reveal').forEach(function (r) {
  observer.observe(r);
});

const audioCards = document.querySelectorAll('.project-card.audio-card');
let activeAudio = null;

audioCards.forEach(function (card) {
  card.addEventListener('click', function () {
    const src = card.dataset.audioSrc;
    if (!src) return;

    if (activeAudio && activeAudio !== card.audioElement) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio.card.classList.remove('playing');
    }

    let audio = card.audioElement;
    if (!audio) {
      audio = document.createElement('audio');
      audio.src = src;
      audio.preload = 'auto';
      audio.onended = function () {
        card.classList.remove('playing');
      };
      card.audioElement = audio;
    }

    if (audio.paused) {
      audio.play();
      card.classList.add('playing');
      activeAudio = audio;
      activeAudio.card = card;
    } else {
      audio.pause();
      audio.currentTime = 0;
      card.classList.remove('playing');
      activeAudio = null;
    }
  });
});