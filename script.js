// ═══════════════════════════════════════════════════════════
// LICZNIK GRACZY I KOPIOWANIE IP
// ═══════════════════════════════════════════════════════════
const SERVER_IP = "Pixelmonia.pl";
document.getElementById('serverIp').textContent = SERVER_IP;

function copyIp() {
  navigator.clipboard.writeText(SERVER_IP).then(() => {
    const btn = document.getElementById('copyBtn');
    const orig = btn.textContent;
    btn.textContent = '✓ Skopiowano!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1500);
  });
}

fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`)
  .then(r => r.json())
  .then(data => {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (data.online) {
      dot.classList.add('online');
      text.textContent = `Online — ${data.players.online} graczy`;
    } else {
      dot.classList.add('offline');
      text.textContent = 'Serwer offline';
    }
  })
  .catch(() => {
    document.getElementById('statusText').textContent = 'Status niedostępny';
    document.getElementById('statusDot').classList.add('offline');
  });

// ═══════════════════════════════════════════════════════════
// TYPEWRITER W HERO
// ═══════════════════════════════════════════════════════════
(function() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const fullText = el.dataset.text;
  let i = 0;
  el.innerHTML = '<span class="typed"></span><span class="cursor"></span>';
  const typed = el.querySelector('.typed');
  function type() {
    if (i < fullText.length) {
      typed.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 35);
    }
  }
  setTimeout(type, 800);
})();

// ═══════════════════════════════════════════════════════════
// CZĄSTECZKI W HERO
// ═══════════════════════════════════════════════════════════
(function() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    container.appendChild(p);
  }
})();

// ═══════════════════════════════════════════════════════════
// PARALLAX
// ═══════════════════════════════════════════════════════════
(function() {
  const layer = document.getElementById('parallaxLayer');
  if (!layer) return;
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        layer.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ═══════════════════════════════════════════════════════════
// 3D TILT NA KARTACH
// ═══════════════════════════════════════════════════════════
(function() {
  const cards = document.querySelectorAll('.tilt');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
})();

// ═══════════════════════════════════════════════════════════
// STICKY CTA
// ═══════════════════════════════════════════════════════════
(function() {
  const cta = document.getElementById('stickyCta');
  if (!cta) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) cta.classList.add('visible');
    else cta.classList.remove('visible');
  });
})();

// ═══════════════════════════════════════════════════════════
// CIEŃ POD NAWIGACJĄ
// ═══════════════════════════════════════════════════════════
(function() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
})();

// ═══════════════════════════════════════════════════════════
// ANIMACJE REVEAL PRZY SCROLLU
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
});

// ═══════════════════════════════════════════════════════════
// WŁASNY KALENDARZ
// ═══════════════════════════════════════════════════════════
(function() {
  const MONTHS_PL = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  // ═══════════════════════════════════════════════════════════
  // 👇 TUTAJ WPISUJESZ EVENTY 👇
  // Format: { date: 'RRRR-MM-DD', title: 'Nazwa', description: 'Opis' }
  // ═══════════════════════════════════════════════════════════
  const events = [
    { date: '2026-12-06', title: 'Ogłoszenie startu edycji', description: 'Oficjalne ogłoszenie daty startu nowej edycji Pixelmonii! Szczegóły pojawią się na Discordzie — śledź kanał #｜𝓞𝓖𝓛𝓞𝓢𝓩𝓔𝓝𝓘𝓐▸📢｜, żeby nie przegapić.' },
  ];
  // ═══════════════════════════════════════════════════════════
  // 👆 KONIEC WPISYWANIA EVENTÓW 👆
  // ═══════════════════════════════════════════════════════════

  const calWrap = document.getElementById('calendar-wrap');
  const calGrid = document.getElementById('calGrid');
  const calTitle = document.getElementById('calTitle');
  if (!calGrid) return;

  let currentDate = new Date();
  currentDate.setDate(1);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const pageTurnSound = new Audio('page-turn.mp3');
  pageTurnSound.volume = 0.4;
  pageTurnSound.preload = 'auto';

  let isAnimating = false;

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    calTitle.textContent = `${MONTHS_PL[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';
    for (let i = 0; i < 42; i++) {
      let dayNum, cellMonth, cellYear, isOther = false;

      if (i < startOffset) {
        dayNum = daysInPrevMonth - (startOffset - i) + 1;
        cellMonth = month - 1;
        cellYear = year;
        if (cellMonth < 0) { cellMonth = 11; cellYear--; }
        isOther = true;
      } else if (i >= startOffset + daysInMonth) {
        dayNum = i - (startOffset + daysInMonth) + 1;
        cellMonth = month + 1;
        cellYear = year;
        if (cellMonth > 11) { cellMonth = 0; cellYear++; }
        isOther = true;
      } else {
        dayNum = i - startOffset + 1;
        cellMonth = month;
        cellYear = year;
      }

      const dateStr = `${cellYear}-${String(cellMonth+1).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`;
      const isToday = dateStr === todayStr;
      const dayEvents = events.filter(e => e.date === dateStr);

      let eventsHtml = '';
      const maxVisible = 3;
      dayEvents.slice(0, maxVisible).forEach(ev => {
        eventsHtml += `<div class="cal-event" data-title="${ev.title}" data-desc="${ev.description || ''}">${ev.title}</div>`;
      });
      if (dayEvents.length > maxVisible) {
        eventsHtml += `<div class="cal-event-more">+${dayEvents.length - maxVisible} więcej</div>`;
      }

      const classes = ['cal-day'];
      if (isOther) classes.push('other-month');
      if (isToday) classes.push('today');

      html += `<div class="${classes.join(' ')}" data-date="${dateStr}">
        <div class="cal-day-num">${dayNum}</div>
        ${eventsHtml}
      </div>`;
    }

    calGrid.innerHTML = html;

    calGrid.querySelectorAll('.cal-event').forEach(ev => {
      ev.addEventListener('click', function(e) {
        e.stopPropagation();
        const title = this.dataset.title;
        const desc = this.dataset.desc;
        alert(desc ? `📅 ${title}\n\n${desc}` : `📅 ${title}`);
      });
    });
  }

  function animateTurn(direction, callback) {
    if (isAnimating) return;
    isAnimating = true;

    try {
      pageTurnSound.currentTime = 0;
      pageTurnSound.play().catch(() => {});
    } catch (err) {}

    const outRotate = direction === -1 ? 100 : -100;
    const inRotate = direction === -1 ? -100 : 100;

    const outAnim = calWrap.animate([
      { transform: 'perspective(1800px) rotateX(0deg)', opacity: 1 },
      { transform: `perspective(1800px) rotateX(${outRotate}deg)`, opacity: 0 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      fill: 'forwards'
    });

    outAnim.onfinish = () => {
      callback();
      requestAnimationFrame(() => {
        const inAnim = calWrap.animate([
          { transform: `perspective(1800px) rotateX(${inRotate}deg)`, opacity: 0 },
          { transform: 'perspective(1800px) rotateX(0deg)', opacity: 1 }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          fill: 'forwards'
        });
        inAnim.onfinish = () => {
          outAnim.cancel();
          inAnim.cancel();
          isAnimating = false;
        };
      });
    };
  }

  document.getElementById('calPrev').addEventListener('click', function() {
    animateTurn(-1, () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  });

  document.getElementById('calNext').addEventListener('click', function() {
    animateTurn(1, () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  });

  document.getElementById('calToday').addEventListener('click', function() {
    animateTurn(1, () => {
      currentDate = new Date();
      currentDate.setDate(1);
      renderCalendar();
    });
  });

  renderCalendar();
})();