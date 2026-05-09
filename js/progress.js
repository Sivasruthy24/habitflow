/* ============================================
   HabitFlow — Progress & Visualization
   js/progress.js
   ============================================ */

function renderDashboard() {
  const done = habits.filter(h => isCompleted(h.id)).length;
  const total = habits.length;
  
  document.getElementById('ds-total').textContent = total;
  document.getElementById('ds-done').textContent = done;
  document.getElementById('ds-streak').textContent = habits.reduce((m, h) => Math.max(m, h.bestStreak || 0), 0);

  let weekTotal = 0, weekDone = 0;
  for (let i = 0; i < 7; i++) {
    const k = dateKey(-i);
    weekTotal += total;
    weekDone += (completions[k] || []).length;
  }
  document.getElementById('ds-rate').textContent = weekTotal ? Math.round((weekDone / weekTotal) * 100) + '%' : '0%';
}

function renderProgress() {
  // Stats summary
  document.getElementById('stat-total').textContent = habits.length;
  document.getElementById('stat-streak').textContent = habits.reduce((m, h) => Math.max(m, h.bestStreak || 0), 0);
  
  renderHeatmap();
  renderMoodBars();
  renderBreakdown();
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';

  for (let i = 27; i >= 0; i--) {
    const k = dateKey(-i);
    const cnt = (completions[k] || []).length;
    const max = Math.max(habits.length, 1);
    
    let level = '';
    if (cnt > 0) {
      const pct = cnt / max;
      if (pct < 0.25) level = 'l1';
      else if (pct < 0.5) level = 'l2';
      else if (pct < 0.75) level = 'l3';
      else level = 'l4';
    }

    const day = document.createElement('div');
    day.className = 'hm-day ' + level;
    day.title = `${k}: ${cnt} completed`;
    grid.appendChild(day);
  }
}

function renderMoodBars() {
  const moodMap = { 'Amazing': 5, 'Good': 4, 'Okay': 3, 'Low': 2, 'Stressed': 1 };
  const moodColors = { 'Amazing': '#6bcb77', 'Good': '#4d96ff', 'Okay': '#ffd93d', 'Low': '#ff6b6b', 'Stressed': '#b06bff' };
  
  const bars = document.getElementById('moodBars');
  if (!bars) return;
  bars.innerHTML = '';

  for (let i = 6; i >= 0; i--) {
    const k = dateKey(-i);
    const m = moods[k];
    const score = m ? moodMap[m.label] : 0;
    const height = score * 20;

    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = date.toLocaleDateString('en', { weekday: 'short' });

    bars.innerHTML += `
      <div class="mood-bar-wrap">
        <div class="mood-bar-fill" style="height:${height}px; background:${m ? moodColors[m.label] : '#eee'}">
          ${m ? m.emoji : ''}
        </div>
        <div class="mood-bar-label">${dayName}</div>
      </div>`;
  }
}

function renderBreakdown() {
  const container = document.getElementById('breakdownList');
  if (!container) return;

  if (!habits.length) {
    container.innerHTML = '<p class="muted center">No data to display.</p>';
    return;
  }

  const habitCounts = {};
  habits.forEach(h => habitCounts[h.id] = 0);

  // Check last 30 days
  for (let i = 0; i < 30; i++) {
    const k = dateKey(-i);
    (completions[k] || []).forEach(id => {
      if (habitCounts[id] !== undefined) habitCounts[id]++;
    });
  }

  container.innerHTML = habits.map(h => {
    const pct = Math.round((habitCounts[h.id] / 30) * 100);
    return `
      <div class="breakdown-item">
        <div class="breakdown-name">${h.emoji} ${h.name}</div>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar" style="width:${pct}%; background:${h.color}"></div>
        </div>
        <div class="breakdown-pct">${habitCounts[h.id]} days</div>
      </div>`;
  }).join('');
}

function setMood(btn, emoji, label) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  moods[today()] = { emoji, label };
  save();
  showToast(`Mood logged: ${emoji}`, 'success');
}

function restoreMoodUI() {
  const m = moods[today()];
  if (!m) return;
  document.querySelectorAll('.mood-btn').forEach(btn => {
    if (btn.textContent.includes(m.emoji)) btn.classList.add('selected');
  });
}