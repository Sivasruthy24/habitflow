/* ============================================
   HabitFlow — Habits (CRUD Operations)
   js/habits.js
   ============================================ */

function addHabit() {
  const name  = document.getElementById('habitName').value.trim();
  const emoji = document.getElementById('habitEmoji').value.trim() || '⭐';

  if (!name) { showToast('Please enter a habit name!', 'info'); return; }

  const newHabit = {
    id:          Date.now(), 
    name:        name,
    emoji:       emoji,
    color:       selectedColor,
    createdAt:   today(),
    streak:      0,
    bestStreak:  0
  };

  habits.push(newHabit);
  save(); // Local save

  document.getElementById('habitName').value  = '';
  document.getElementById('habitEmoji').value = '';

  renderManage();
  showToast(`✅ "${name}" added!`, 'success');
}

function toggleHabit(id) {
  const key = today();
  if (!completions[key]) completions[key] = [];

  const idx  = completions[key].indexOf(id);
  const card = document.querySelector(`[data-id="${id}"]`);

  if (idx === -1) {
    completions[key].push(id);
    updateStreak(id, true);
    if (card) { 
      card.classList.add('boom'); 
      setTimeout(() => card.classList.remove('boom'), 300); 
    }
  } else {
    completions[key].splice(idx, 1);
    updateStreak(id, false);
  }

  save(); 
  renderDashboard();
  renderToday();
}

function renderToday() {
  const list = document.getElementById('todayHabitsList');
  if (!list) return;

  // 1. CALCULATE PROGRESS
  const total = habits.length;
  const done  = habits.filter(h => isCompleted(h.id)).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  // 2. UPDATE UI ELEMENTS
  const progBar = document.getElementById('today-progBar'); // Make sure this ID matches your HTML
  const progPct = document.getElementById('today-progPct'); // Make sure this ID matches your HTML

  if (progBar) progBar.style.width = pct + '%';
  if (progPct) progPct.textContent = pct + '%';

  // 3. RENDER THE LIST
  if (!habits.length) {
    list.innerHTML = `
      <div class="empty-state">
        <span class="es-icon">🌱</span>
        <p>No habits yet! Go to Manage to add habits.</p>
      </div>`;
    return;
  }

  list.innerHTML = habits.map(h => `
    <div class="habit-card ${isCompleted(h.id) ? 'completed' : ''}" data-id="${h.id}" style="--accent:${h.color}">
      <button class="check-btn" style="--accent:${h.color}" onclick="toggleHabit(${h.id})">✓</button>
      <div class="habit-info">
        <div class="habit-name">${h.emoji} ${h.name}</div>
        <div class="habit-meta">Added ${h.createdAt}</div>
      </div>
      <div class="streak-badge">🔥 ${h.streak || 0}</div>
    </div>
  `).join('');

  if (typeof restoreMoodUI === "function") restoreMoodUI();
}

  list.innerHTML = habits.map(h => `
    <div class="habit-card ${isCompleted(h.id) ? 'completed' : ''}" data-id="${h.id}" style="--accent:${h.color}">
      <button class="check-btn" style="--accent:${h.color}" onclick="toggleHabit(${h.id})">✓</button>
      <div class="habit-info">
        <div class="habit-name">${h.emoji} ${h.name}</div>
        <div class="habit-meta">Added ${h.createdAt}</div>
      </div>
      <div class="streak-badge">🔥 ${h.streak || 0}</div>
    </div>
  `).join('');

  // Update progress bar on Today page
  const done = habits.filter(h => isCompleted(h.id)).length;
  const pct  = habits.length ? Math.round((done / habits.length) * 100) : 0;
  const pb   = document.getElementById('today-progBar');
  if (pb) pb.style.width = pct + '%';
  
  if (typeof restoreMoodUI === "function") restoreMoodUI();


function renderManage() {
  const list = document.getElementById('manageList');
  if (!list) return;

  list.innerHTML = habits.map(h => `
    <div class="habit-card" style="--accent:${h.color}">
      <div class="habit-icon-circle" style="background:${h.color}">${h.emoji}</div>
      <div class="habit-info">
        <div class="habit-name">${h.name}</div>
        <div class="habit-meta">Best streak: 🔥 ${h.bestStreak || 0}</div>
      </div>
      <div class="habit-actions">
        <button class="icon-btn" onclick="deleteHabit(${h.id})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function updateStreak(id, completed) {
  const habit = habits.find(h => h.id === id);
  if (!habit) return;
  if (completed) {
    habit.streak = (habit.streak || 0) + 1;
    if (habit.streak > (habit.bestStreak || 0)) habit.bestStreak = habit.streak;
  } else {
    habit.streak = Math.max(0, (habit.streak || 1) - 1);
  }
}

function isCompleted(id) {
  return (completions[today()] || []).includes(id);
}

function deleteHabit(id) {
  if (confirm("Delete this habit forever?")) {
    habits = habits.filter(h => h.id !== id);
    save();
    renderManage();
    showToast('Habit removed', 'info');
  }
}