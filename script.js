// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });
}

// ===== Toast Notification =====
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  if (toast && toastTitle && toastMessage) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// ===== Drive Controls (Only on Control Page) =====
const driveButtons = document.querySelectorAll('.drive-btn');
if (driveButtons.length > 0) {
  driveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const direction = btn.dataset.direction;
      showToast(`Driving ${direction}`, 'Command sent to robot');
    });
  });
}

// ===== Keyboard Controls (WASD) - Only on Control Page =====
// Check if we're on the control page by looking for drive buttons
const isControlPage = document.querySelectorAll('.drive-btn').length > 0;

if (isControlPage) {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    let direction = null;
    let btnId = null;

    switch (key) {
      case 'w':
        direction = 'forward';
        btnId = 'btnForward';
        break;
      case 'a':
        direction = 'left';
        btnId = 'btnLeft';
        break;
      case 's':
        direction = 'backward';
        btnId = 'btnBackward';
        break;
      case 'd':
        direction = 'right';
        btnId = 'btnRight';
        break;
    }

    if (direction) {
      showToast(`Driving ${direction}`, 'Command sent to robot');
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 100);
      }
    }
  });
}

// ===== Water Pump Toggle =====
const pumpToggle = document.getElementById('pumpToggle');
const pumpIcon = document.getElementById('pumpIcon');

if (pumpToggle) {
  pumpToggle.addEventListener('change', () => {
    const isOn = pumpToggle.checked;
    showToast(isOn ? 'Pump ON' : 'Pump OFF', isOn ? 'Water flowing' : 'Water stopped');
  });
}

// ===== Arms Toggle =====
const armsToggle = document.getElementById('armsToggle');
const armsLabel = document.getElementById('armsLabel');

if (armsToggle && armsLabel) {
  armsToggle.addEventListener('change', () => {
    const isOpen = armsToggle.checked;
    armsLabel.textContent = isOpen ? 'Arms (180°)' : 'Arms (90°)';
    showToast(
      isOpen ? 'Arms Open (180°)' : 'Arms Closed (90°)',
      isOpen ? 'Pipes in open position' : 'Pipes in closed position'
    );
  });
}

// ===== Capture Photo =====
const captureBtn = document.getElementById('captureBtn');
const photoGallery = document.getElementById('photoGallery');
let photos = JSON.parse(localStorage.getItem('robotPhotos') || '[]');

function renderGallery() {
  if (!photoGallery) return;

  if (photos.length === 0) {
    photoGallery.innerHTML = '<p class="gallery-empty">No photos yet. Capture your first photo!</p>';
  } else {
    photoGallery.innerHTML = `
      <div class="gallery-grid">
        ${photos.map(photo => `
          <div class="gallery-item">
            <img src="${photo.url}" alt="Captured at ${photo.date}">
          </div>
        `).join('')}
      </div>
    `;
  }
}

if (captureBtn) {
  captureBtn.addEventListener('click', () => {
    showToast('Capturing photo', 'Requesting photo from ESP32...');

    // Simulate photo capture with random image
    setTimeout(() => {
      const newPhoto = {
        url: `https://picsum.photos/800/600?random=${Date.now()}`,
        date: new Date().toLocaleString()
      };
      photos.unshift(newPhoto);
      localStorage.setItem('robotPhotos', JSON.stringify(photos));
      renderGallery();
      showToast('Photo captured!', 'Photo saved to gallery');
    }, 500);
  });
}

// Initialize gallery on page load
renderGallery();

// ===== Auth Tabs =====
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginTab && signupTab && loginForm && signupForm) {
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
}

// ===== Form Submissions (Removed - now handled in auth.html inline) =====
// Note: Login/Signup form handling is now done directly in auth.html
// to properly set sessionStorage before redirecting

// ===== Scroll Animations =====
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.feature-card, .why-card');
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    
    if (isVisible) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Initial styles for scroll animation elements
document.querySelectorAll('.feature-card, .why-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);