const bgMusic = document.getElementById('bg-music');
const giftBtn = document.getElementById('giftBtn');

// Включаем музыку только после первого клика/тапа
function enableMusic() {
  bgMusic.loop = true;
  bgMusic.play().catch(() => {
    console.warn("Автоплей музыки заблокирован браузером");
  });

  document.removeEventListener('click', enableMusic);
  document.removeEventListener('touchstart', enableMusic);
}
document.addEventListener('click', enableMusic);
document.addEventListener('touchstart', enableMusic);

// Убегающая кнопка "Получить подарок"
giftBtn.addEventListener('mousemove', (e) => {
  const rect = giftBtn.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  if (Math.abs(offsetX - centerX) < 50 && Math.abs(offsetY - centerY) < 50) {
    let moveX = (offsetX < centerX) ? 20 : -20;
    let moveY = (offsetY < centerY) ? 20 : -20;

    let newLeft = giftBtn.offsetLeft + moveX;
    let newTop = giftBtn.offsetTop + moveY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = rect.width;
    const btnHeight = rect.height;

    if (newLeft < 0) newLeft = 0;
    if (newLeft + btnWidth > windowWidth) newLeft = windowWidth - btnWidth;
    if (newTop < 0) newTop = 0;
    if (newTop + btnHeight > windowHeight) newTop = windowHeight - btnHeight;

    giftBtn.style.position = 'absolute';
    giftBtn.style.left = newLeft + 'px';
    giftBtn.style.top = newTop + 'px';
  }
});

// Скример и музыка
giftBtn.addEventListener('click', function () {
  const scream = document.getElementById('screamer');
  const screamVideo = document.getElementById('screamer-video');

  bgMusic.pause();
  bgMusic.currentTime = 0;

  scream.style.display = 'flex';
  screamVideo.play();

  screamVideo.onended = () => {
    scream.style.display = 'none';
    document.getElementById('payment-form').style.display = 'block';

    bgMusic.play().catch(() => {});
  };
});

// Пасхалка
document.getElementById('secret').addEventListener('click', () => {
  alert("Ты нашёл пасхалку! 🎉 Код на Roblox: 'KolyaOP2025'");
});

// Форма оплаты
document.getElementById('submit-payment').addEventListener('click', () => {
  const sum = parseInt(document.getElementById('amount').value, 10);
  if (isNaN(sum) || sum <= 0 || sum > parseInt(document.getElementById('amount').max || "1488")) {
    alert("Можно максимум 1488 руб");
    return;
  }
  document.getElementById('payment-form').style.display = 'none';
  document.getElementById('sms-form').style.display = 'block';
});

// Красные окна
function createRedWindows(count = 10) {
  for (let i = 0; i < count; i++) {
    const win = document.createElement('div');
    win.textContent = 'ВЗЛОМАНО!';
    win.style.position = 'fixed';
    win.style.backgroundColor = 'red';
    win.style.color = 'white';
    win.style.fontWeight = 'bold';
    win.style.fontSize = '20px';
    win.style.border = '3px solid black';
    win.style.padding = '15px';
    win.style.zIndex = 9999;
    win.style.cursor = 'pointer';

    win.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    win.style.left = Math.random() * (window.innerWidth - 150) + 'px';
    win.style.width = '150px';
    win.style.textAlign = 'center';

    win.addEventListener('click', () => win.remove());

    document.body.appendChild(win);
  }
}

// Тряска мышки (замена курсора)
function shakeCursor() {
  document.body.style.cursor = 'none';

  let fakeCursor = document.createElement('div');
  fakeCursor.style.position = 'fixed';
  fakeCursor.style.width = '20px';
  fakeCursor.style.height = '20px';
  fakeCursor.style.backgroundColor = 'white';
  fakeCursor.style.borderRadius = '50%';
  fakeCursor.style.zIndex = '10000';
  fakeCursor.style.pointerEvents = 'none';
  document.body.appendChild(fakeCursor);

  window.addEventListener('mousemove', (e) => {
    const shakeX = e.clientX + (Math.random() * 20 - 10);
    const shakeY = e.clientY + (Math.random() * 20 - 10);
    fakeCursor.style.left = shakeX + 'px';
    fakeCursor.style.top = shakeY + 'px';
  });
}

// Обработка смс-кода и эффект взлома
document.getElementById('submit-sms').addEventListener('click', () => {
  const code = document.getElementById('sms-code').value;
  const sum = document.getElementById('amount').value;

  if (code === "148852") {
    alert("🎉 Ваша сумма " + sum + " руб поступит через 10 рабочих лет!");
  } else if (code === "228") {
    document.getElementById('sms-form').style.display = 'none';
    document.getElementById('payment-form').style.display = 'block';
    document.getElementById('amount').max = 999999;
    alert("💰 Хакерский режим включён. Введите любую сумму.");
  } else if (code === sum) {
    document.body.classList.add('hack-mode');
    document.body.innerHTML = `
      <div class="glitch-text">ВАС ВЗЛОМАЛИ</div>
      <div class="glitch-sub">Данные отправлены в Roblox Corp...</div>
    `;

    createRedWindows(15);
    shakeCursor();
  } else {
    alert("Неверный код. Попробуйте снова.");
  }
});
