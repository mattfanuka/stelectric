//   --Scoll-animations--
document.addEventListener('DOMContentLoaded', scrollFade());


function scrollFade() {
  const objectsToAnimate = document.querySelectorAll('.fade-on-scroll');

  const observer = new IntersectionObserver(objects => {
    objects.forEach(object => {
      if(object.isIntersecting) {
        object.target.classList.add('floatUp');
      }
    });
  }, {
    threshold: 0.4
  });

  objectsToAnimate.forEach(object => {
    observer.observe(object);
  })
}

const objectsToSlide = document.querySelectorAll('.slide-in');

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(objects => {
    objects.forEach(object => {
      if(object.isIntersecting) {
        object.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.4
  });

  objectsToSlide.forEach(object => {
    observer.observe(object);
  })
});


//Copyright year auto-update
function renderCopyrightDate() {
  const year = document.querySelector('.copyright-year');
  date = new Date();
  year.innerText = date.getFullYear();
}

document.addEventListener('DOMContentLoaded', renderCopyrightDate());


//Mobile menu
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (isMobileMenuOpen && document.body.classList.contains('no-scroll')) {
    isMobileMenuOpen = false;
  } else if (!isMobileMenuOpen && !document.body.classList.contains('no-scroll')) {
    isMobileMenuOpen = true;
  }

  handleScrolling();
}

function handleScrolling() {
  const body = document.body;

  if (isMobileMenuOpen) {
    body.classList.add('no-scroll');
  } else if (!isMobileMenuOpen) {
    body.classList.remove('no-scroll');
  }
}


// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav .link, .mobile-nav .contact').forEach(link => {
    link.addEventListener('click', () => {
        const mobileNav = document.getElementById('mobileNav');
        const hamburger = document.querySelector('.hamburger');
        
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        isMobileMenuOpen = false;
        handleScrolling();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-nav')) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');

        isMobileMenuOpen = false;
        handleScrolling();
    }
});