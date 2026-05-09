/* ============================================
   HabitFlow — Data & State
   js/data.js
   ============================================ */

const COLORS = ['#4d96ff','#ff6b6b','#6bcb77','#ffd93d','#b06bff','#ff9f43'];

// --- APP STATE ---
let users       = JSON.parse(localStorage.getItem('hf_users')        || '[]');
let currentUser = JSON.parse(localStorage.getItem('hf_current_user') || 'null');
let habits      = [];
let completions = {};
let moods       = {};

let selectedColor = COLORS[0];
let deleteTarget  = null;
let editTarget    = null;
let pendingOTP    = null;
let pendingUser   = null;
let authMode      = 'login';

// --- KEY FOR MULTI-USER SUPPORT ---
function userKey(email) {
  return 'hf_data_' + email;
}

// --- LOAD DATA ---
function loadUserData(email) {
  const key = userKey(email);
  const stored = localStorage.getItem(key);
  if (stored) {
    const data  = JSON.parse(stored);
    habits      = data.habits      || [];
    completions = data.completions || {};
    moods       = data.moods       || {};
  } else {
    habits = []; completions = {}; moods = {};
  }
}

// --- SAVE DATA ---
function save() {
  if (!currentUser) return;
  // Save global user list
  localStorage.setItem('hf_users', JSON.stringify(users));
  // Save current session
  localStorage.setItem('hf_current_user', JSON.stringify(currentUser));
  // Save specific user's habits/moods
  const data = { habits, completions, moods };
  localStorage.setItem(userKey(currentUser.email), JSON.stringify(data));
}

// --- UTILS ---
function today() { return new Date().toISOString().split('T')[0]; }

function dateKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}