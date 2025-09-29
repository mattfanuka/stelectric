const reviews = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const card = reviews[0];

let index = 0
let isAnimating = false;

function showReview(newIndex, direction) {
  if (isAnimating || newIndex === index) return;
  isAnimating = true;

  const cardStyle = getComputedStyle(card);
  const width = parseFloat(cardStyle.width);

  const current = reviews[index];
  const next = reviews[newIndex];

  // Remove current card
  current.classList.add(direction === "next" ? "exit-left" : "exit-right");
  current.classList.remove('active');

  // Prepare next card
  const translateX = direction === "next" ? `translateX(${width}px)` : `translateX(-${width}px)`;

  // place offscreen with no transition so it's the start state
  next.style.transition = 'none';
  next.style.transform = translateX;

  // Force a reflow so the browser paints the offscreen position before enabling transition
  void next.offsetWidth;

  // enable transition and then animate into place on next frames
  next.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.style.transform = 'translateX(0)';
      next.classList.add('active');
    });
  });

  // use transitionend for robust cleanup instead of a fixed timeout
  function onEnd(e) {
    if (e.target !== next) return;
    if (e.propertyName !== 'transform') return;
    next.removeEventListener('transitionend', onEnd);
    current.classList.remove("exit-left", "exit-right");
    // clear inline styles left from this run (optional)
    next.style.transition = '';
    next.style.transform = '';
    index = newIndex;
    isAnimating = false;
  }
  next.addEventListener('transitionend', onEnd);
};

prevBtn.addEventListener("click", () => {
  const newIndex = (index - 1 + reviews.length) % reviews.length;
  showReview(newIndex, "prev");
});

nextBtn.addEventListener("click", () => {
  const newIndex = (index + 1) % reviews.length;
  showReview(newIndex, "next");
});

//Email subject changer
function submitEmail() {
    const name = document.querySelector('#name').value;
    const uniqueSubject = `New email from ${name} from your site!`;

    const subject = document.querySelector('#_subject');
    subject.value = uniqueSubject;
}