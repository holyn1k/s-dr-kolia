document.getElementById('giftBtn').addEventListener('click', function() {
  const scream = document.getElementById('screamer');
  const screamVideo = document.getElementById('screamer-video');
  const bgMusic = document.getElementById('bg-music');

  // Остановить фоновую музыку
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  // Показать и запустить видео скримера
  scream.style.display = 'flex';
  screamVideo.currentTime = 0;
  screamVideo.play();

  screamVideo.onended = () => {
    scream.style.display = 'none';
  };
});

document.getElementById('secret').addEventListener('click', () => {
  alert("Ты нашёл пасхалку! 🎉 Код на Roblox: 'KolyaOP2025'");
});

document.getElementById('submit-payment').addEventListener('click', () => {
  const sum = parseInt(document.getElementById('amount').value, 10);
  if (isNaN(sum) || sum <= 0 || sum > parseInt(document.getElementById('amount').max || "1488")) {
    alert("Можно максимум 1488 руб");
    return;
  }
  document.getElementById('payment-form').style.display = 'none';
  document.getElementById('sms-form').style.display = 'block';
});

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
    document.body.innerHTML = '<div style="background:black;color:red;font-size:3em;text-align:center;padding:100px;">ВАС ВЗЛОМАЛИ</div>';
  } else {
    alert("Неверный код. Попробуйте снова.");
  }
});

// Воспроизвести фоновую музыку при первом клике
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) bgMusic.play();
}, { once: true });
