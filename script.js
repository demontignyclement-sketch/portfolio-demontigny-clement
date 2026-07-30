
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

const easeInOutCubic = function (t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const smoothScrollTo = function (targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = function (now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const targetY = target.getBoundingClientRect().top + window.scrollY - 90;
    smoothScrollTo(targetY, 700);
  });
});

