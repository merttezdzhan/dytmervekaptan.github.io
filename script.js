// ========================
// NAVBAR SCROLL EFFECT
// ========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========================
// HAMBURGER MENU
// ========================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========================
// CALORIE CALCULATOR
// ========================
function calculateCalories() {
  const age      = parseFloat(document.getElementById('calc-age').value);
  const gender   = document.getElementById('calc-gender').value;
  const weight   = parseFloat(document.getElementById('calc-weight').value);
  const height   = parseFloat(document.getElementById('calc-height').value);
  const activity = parseFloat(document.getElementById('calc-activity').value);

  if (!age || !weight || !height || age < 10 || age > 100 || weight < 30 || height < 100) {
    alert('Lütfen geçerli değerler girin.');
    return;
  }

  // Mifflin-St Jeor Denklemi
  let bmr;
  if (gender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  const tdee     = Math.round(bmr * activity);
  const lose     = Math.round(tdee - 500);
  const gain     = Math.round(tdee + 500);

  document.getElementById('result-tdee').textContent     = tdee.toLocaleString('tr-TR');
  document.getElementById('result-maintain').textContent = tdee.toLocaleString('tr-TR');
  document.getElementById('result-lose').textContent     = lose.toLocaleString('tr-TR');
  document.getElementById('result-gain').textContent     = gain.toLocaleString('tr-TR');

  const resultEl = document.getElementById('calcResult');
  resultEl.style.display = 'flex';
  resultEl.style.flexDirection = 'column';
  resultEl.style.justifyContent = 'center';
  resultEl.style.alignItems = 'center';
  resultEl.style.textAlign = 'center';
}

// ========================
// CONTACT FORM
// ========================
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Gönderiliyor...';

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'Gönder';

    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 5000);
  }, 1000);
}

// ========================
// SCROLL ANIMATIONS
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
