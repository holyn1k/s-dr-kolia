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

// Воспроизвести фоновую музыку при первом клике
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) bgMusic.play();
}, { once: true });
