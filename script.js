const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// پیام‌های بخش احساسات
const feelingMessages = {
  tired: "قلبم، اگه خسته‌ای، یه کم به خودت فرصت بده. لازم نیست همیشه قوی باشی. همین که امروز رو گذروندی، کافیه. 💗",
  happy: "آخ که چه خوب! امیدوارم این لبخند کوچولو کلی بمونه. قشنگی لحظه‌هات رو برای خودت نگه دار. 🌷",
  quiet: "قلبم، یادت نره که تو دوست‌داشتنی هستی؛ حتی وقتی خودت اینو یادت می‌ره. بودنت به‌تنهایی ارزشمنده. 💕"
};

const feelingResult = document.getElementById("feelingResult");
const feelingText = feelingResult.querySelector("p");

document.querySelectorAll(".feeling-card").forEach((card) => {
  card.addEventListener("click", () => {
    const feeling = card.dataset.feeling;
    feelingText.textContent = feelingMessages[feeling];

    feelingResult.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  });
});

// نامه‌ها
const letters = [
  {
    title: "برای وقت‌های خستگی",
    text: "قلبم عزیزم،\n\nاگه امروز روز سختی بوده، اشکالی نداره. لازم نیست همین الان همه‌چیز رو درست کنی. یه کم استراحت کن، یه لیوان آب بخور و با خودت مهربون باش.\n\nتو بیشتر از چیزی که فکر می‌کنی ارزشمندی و قرار نیست هر روز بهترین روزت باشه.\n\nیه بغل مجازی بزرگ برای تو 💗"
  },
  {
    title: "برای وقت‌هایی که دلت گرفته",
    text: "قلبم،\n\nکاش می‌شد همه‌ی فکرهای شلوغت رو برای چند دقیقه کنار بذاری و فقط نفس راحت بکشی.\n\nلازم نیست برای ناراحت بودنت دلیل قانع‌کننده‌ای داشته باشی. احساساتت مهمن و تو حق داری درباره‌شون حرف بزنی.\n\nامیدوارم این چند خط یه ذره از سنگینی دلت کم کنه. 🌙"
  },
  {
    title: "یه پیام قشنگ برای تو",
    text: "سلام قشنگ‌ترین قلب دنیا! 💌\n\nاین یه یادآوری کوچولوئه که تو فقط به خاطر کارهایی که انجام می‌دی دوست‌داشتنی نیستی؛ خودِ تو، با همه‌ی سلیقه‌ها، فکرها، خنده‌ها و حتی روزهای ساکتت، ارزشمندی.\n\nامیدوارم امروز یه اتفاق کوچولو لبخند بیاره روی لبت.\n\nبا کلی مهر، برای قلبم 🌷"
  }
];

const modal = document.getElementById("letterModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

let lastFocusedElement = null;

function openLetter(index) {
  const letter = letters[index];
  if (!letter) return;

  lastFocusedElement = document.activeElement;
  modalTitle.textContent = letter.title;
  modalText.textContent = letter.text;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeLetter() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll(".letter-card").forEach((card) => {
  card.addEventListener("click", () => {
    openLetter(Number(card.dataset.letter));
  });
});

modalClose.addEventListener("click", closeLetter);
modalDone.addEventListener("click", closeLetter);

modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeLetter();
  }
});

// تمرین تنفس
const breathToggle = document.getElementById("breathToggle");
const breathingOrb = document.getElementById("breathingOrb");
const breathLabel = document.getElementById("breathLabel");
const breathInstruction = document.getElementById("breathInstruction");

let breathing = false;
let breathTimer = null;
let breathStartedAt = 0;function stopBreathing() {
  breathing = false;
  clearTimeout(breathTimer);
  breathTimer = null;

  breathingOrb.classList.remove("is-breathing");
  breathLabel.textContent = "نفس بکش";
  breathToggle.textContent = "شروع تمرین آرامش";
  breathInstruction.textContent = "هر وقت آماده بودی، می‌تونی دوباره شروع کنی. 🌸";
}

function runBreathingCycle() {
  if (!breathing) return;

  const elapsed = Date.now() - breathStartedAt;
  const phase = Math.floor((elapsed % 8000) / 4000);

  if (phase === 0) {
    breathLabel.textContent = "آروم نفس بکش";
    breathInstruction.textContent = "۴ ثانیه به‌آرومی دم بگیر...";
  } else {
    breathLabel.textContent = "آروم رها کن";
    breathInstruction.textContent = "۴ ثانیه به‌آرومی بازدم کن...";
  }

  breathTimer = setTimeout(runBreathingCycle, 250);
}

breathToggle.addEventListener("click", () => {
  if (breathing) {
    stopBreathing();
    return;
  }

  breathing = true;
  breathStartedAt = Date.now();

  breathingOrb.classList.add("is-breathing");
  breathToggle.textContent = "پایان تمرین";
  runBreathingCycle();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && breathing) {
    stopBreathing();
  }
});