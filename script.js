// Shared site JS: countdown, slideshow, simple page behaviors
document.addEventListener('DOMContentLoaded', () => {
  initializeCountdown();
  initializeSlideshow();
  activatePageTabs();
  scrollToHashIfPresent();
  initializeMobileMenu();
});

function initializeMobileMenu(){
  const menuToggle = document.querySelector('.menu-toggle');
  const pageTabs = document.querySelector('.page-tabs');
  
  if(!menuToggle || !pageTabs) return;
  
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    pageTabs.classList.toggle('active');
  });
  
  // Close menu when link clicked
  pageTabs.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      pageTabs.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.page-header')){
      pageTabs.classList.remove('active');
    }
  });
}

function initializeCountdown(){
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const weddingDate = new Date('December 26, 2025 14:00:00').getTime();

  function update(){
    const now = Date.now();
    const diff = weddingDate - now;
    if(!daysEl) return; // only run on pages that include countdown
    if(diff <= 0){
      daysEl.textContent = '00'; hoursEl.textContent='00'; minutesEl.textContent='00'; secondsEl.textContent='00';
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    daysEl.textContent = String(days).padStart(2,'0');
    hoursEl.textContent = String(hours).padStart(2,'0');
    minutesEl.textContent = String(minutes).padStart(2,'0');
    secondsEl.textContent = String(seconds).padStart(2,'0');
  }

  update();
  setInterval(update,1000);
}

function initializeSlideshow(){
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  if(slides.length === 0) return;
  let current = slides.findIndex(s => s.classList.contains('active'));
  if(current < 0) current = 0, slides[0].classList.add('active');

  function next(){
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(next, 7000);
}

function activatePageTabs(){
  const tabs = document.querySelectorAll('.page-tabs a');
  if(!tabs) return;
  tabs.forEach(a => {
    // mark active based on current path
    const href = a.getAttribute('href');
    if(href && href.indexOf(location.pathname.split('/').pop()) !== -1){
      a.classList.add('active');
    }
  });
}

function scrollToHashIfPresent(){
  if(location.hash){
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if(el){
      // small delay so layout and header settle
      setTimeout(()=> el.scrollIntoView({behavior:'smooth'}), 120);
    }
  }
}
