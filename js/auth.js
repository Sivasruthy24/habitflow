/* ============================================
   HabitFlow — Authentication
   js/auth.js
   ============================================ */

const EJS_SERVICE  = 'service_svk3dre';
const EJS_TEMPLATE = 'template_cljtp43';
const EJS_KEY      = 'JOVE1-xsbN14-VVvC';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setAuthMode(mode, btn) {
  authMode = mode;
  document.querySelectorAll('.auth-toggle-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('loginForm').style.display  = mode === 'login' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = mode === 'signup' ? 'block' : 'none';
  document.getElementById('otpWrap').classList.remove('active');
}

function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { showToast('Invalid email or password', 'error'); return; }
  
  currentUser = user;
  loadUserData(currentUser.email);
  enterApp();
  showToast(`Welcome back, ${user.name}! 👋`, 'success');
}

async function handleSignup() {
  const name     = document.getElementById('signupName').value.trim();
  const email    = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) { showToast('Please fill all fields', 'error'); return; }
  if (users.find(u => u.email === email)) { showToast('Email already registered', 'error'); return; }

  pendingOTP  = String(Math.floor(100000 + Math.random() * 900000));
  pendingUser = { name, email, password, avatar: '👤', verified: false };

  document.getElementById('loginForm').style.display  = 'none';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('otpWrap').classList.add('active');

  try {
    emailjs.init(EJS_KEY);
    await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { to_name: name, to_email: email, otp_code: pendingOTP });
    showToast('Verification code sent!', 'success');
  } catch (err) {
    document.getElementById('otpDevBanner').textContent = 'DEV MODE: ' + pendingOTP;
    document.getElementById('otpDevBanner').style.display = 'block';
  }
}

function verifyOTP() {
  const entered = Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
  if (entered !== pendingOTP) { showToast('Incorrect code', 'error'); return; }

  pendingUser.verified = true;
  users.push(pendingUser);
  currentUser = pendingUser;
  
  habits = []; completions = {}; moods = {};
  save(); 
  enterApp();
}

function logout() {
  save();
  currentUser = null;
  localStorage.removeItem('hf_current_user');
  location.reload(); 
}