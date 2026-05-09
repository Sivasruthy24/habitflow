/* ============================================
   HabitFlow — App Init & Navigation
   js/app.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  buildColorPicker();

  if (currentUser) {
    loadUserData(currentUser.email);
    enterApp();
  }

  document.addEventListener('click', e => {
    const btn      = document.getElementById('profileBtn');
    const dropdown = document.getElementById('profileDropdown');
    if (btn && dropdown && !btn.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });
});

function buildColorPicker() {
  const cp = document.getElementById('colorPick');
  if (!cp) return;
  cp.innerHTML = '';
  COLORS.forEach((color, i) => {
    const dot       = document.createElement('div');
    dot.className   = 'color-dot' + (color === selectedColor ? ' active' : '');
    dot.style.background = color;
    dot.onclick = () => {
      selectedColor = color;
      document.querySelectorAll('.color-dot').forEach(x => x.classList.remove('active'));
      dot.classList.add('active');
    };
    cp.appendChild(dot);
  });
}

function enterApp() {
  document.getElementById('mainNav').style.display    = 'flex';
  document.getElementById('mainFooter').style.display = 'flex';
  document.getElementById('ddName').textContent       = currentUser.name;
  document.getElementById('ddEmail').textContent      = currentUser.email;
  
  const hour    = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greetMsg').textContent = `${greeting}, ${currentUser.name}! 👋`;

  switchMainTab('dashboard', document.querySelector('.nav-tab'));
}

function switchMainTab(tab, el) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  const selectedPage = document.getElementById('page-' + tab);
  if (selectedPage) {
    selectedPage.classList.add('active');
    selectedPage.style.display = 'block';
  }

  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');

  if (tab === 'dashboard') renderDashboard();
  if (tab === 'today')     renderToday();
  if (tab === 'progress')  renderProgress();
  if (tab === 'manage')    renderManage();
}

function toggleDropdown() { document.getElementById('profileDropdown').classList.toggle('open'); }
function closeDropdown() { document.getElementById('profileDropdown').classList.remove('open'); }