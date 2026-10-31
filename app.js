const translations = {
  fr: {
    eyebrow:"AU CŒUR DU SÉNÉGAL",heroTitle:'Le savoir commence<br><em>au Daara.</em>',heroText:"Découvrez les daaras et écoles coraniques près de chez vous. Le lien entre les familles, les enseignants et le savoir.",explore:"Explorer les daaras",findKicker:"VOTRE RECHERCHE",findTitle:"Trouver un daara",searchLabel:"Nom du daara ou enseignant",searchPlaceholder:"Ex. Daara Serigne...",regionLabel:"Région",allRegions:"Toutes les régions",searchButton:"Rechercher",popular:"Populaire :",discoverKicker:"DÉCOUVRIR",discoverTitle:"Explorez par besoin",cat1:"Daaras",cat1desc:"Apprentissage du Coran",cat2:"Écoles coraniques",cat2desc:"Établissements & madrasas",cat3:"Enseignants",cat3desc:"Trouver un enseignant",cat4:"Soutenir un daara",cat4desc:"Contribuer à sa mission",nearKicker:"À DÉCOUVRIR",nearTitle:"Les daaras en vedette",previewBadge:"APERÇU",emptyTitle:"Votre communauté commence ici",emptyText:"Les profils des daaras et enseignants apparaîtront ici dès que le répertoire sera connecté. Pour le moment, nous préparons un espace clair et fiable pour tous.",notifyButton:"Être informé du lancement",joinKicker:"ENSEMBLE POUR LE SAVOIR",joinTitle:"Vous représentez un daara ?",joinText:"Préparez-vous à présenter votre établissement aux familles du Sénégal.",navHome:"Accueil",navSearch:"Recherche",navDaaras:"Les daaras",navProfile:"Profil",footer:"Pensé au Sénégal, pour le Sénégal."
  },
  ar: {
    eyebrow:"في قلب السنغال",heroTitle:'العلم يبدأ<br><em>في الدار.</em>',heroText:"اكتشف المحاظر والمدارس القرآنية القريبة منك. منصة تجمع الأسر والمعلمين وطلاب العلم.",explore:"اكتشف المحاظر",findKicker:"ابدأ البحث",findTitle:"ابحث عن محظرة",searchLabel:"اسم المحظرة أو المعلم",searchPlaceholder:"مثال: محظرة الشيخ...",regionLabel:"المنطقة",allRegions:"جميع المناطق",searchButton:"بحث",popular:"الأكثر بحثًا:",discoverKicker:"اكتشف",discoverTitle:"تصفح حسب حاجتك",cat1:"المحاظر",cat1desc:"تعليم القرآن الكريم",cat2:"المدارس القرآنية",cat2desc:"المدارس والمعاهد",cat3:"المعلمون",cat3desc:"ابحث عن معلم",cat4:"ادعم محظرة",cat4desc:"ساهم في رسالتها",nearKicker:"اكتشف",nearTitle:"محاظر مميزة",previewBadge:"معاينة",emptyTitle:"مجتمعك يبدأ من هنا",emptyText:"ستظهر ملفات المحاظر والمعلمين هنا بعد ربط دليل المدارس. نعمل الآن على إعداد مساحة واضحة وموثوقة للجميع.",notifyButton:"أخبرني عند الإطلاق",joinKicker:"معًا من أجل العلم",joinTitle:"هل تمثل محظرة؟",joinText:"استعد لتعريف الأسر في السنغال بمؤسستك.",navHome:"الرئيسية",navSearch:"بحث",navDaaras:"المحاظر",navProfile:"الملف الشخصي",footer:"صُنع في السنغال، من أجل السنغال."
  }
};
let language = "ar";
const $ = (selector) => document.querySelector(selector);
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next === "ar" ? "ar" : "fr";
  document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  document.body.dir = next === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = translations[next][el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = translations[next][el.dataset.i18nPlaceholder];
    if (value !== undefined) el.placeholder = value;
  });
  $("#languageToggle").textContent = next === "fr" ? "عربي" : "Français";
  $("#languageToggle").setAttribute("aria-label", next === "fr" ? "Passer en arabe" : "Passer en français");
}
$("#languageToggle").addEventListener("click", () => setLanguage(language === "fr" ? "ar" : "fr"));
$("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#searchInput").value.trim();
  const region = $("#regionSelect") ? $("#regionSelect").value : "";
  const message = language === "fr"
    ? "Recherche préparée : " + (query || "tous les profils") + (region ? " · Région : " + region : "") + ". Le répertoire sera connecté dans une prochaine étape."
    : "تم تجهيز البحث: " + (query || "جميع الملفات") + (region ? " · المنطقة: " + region : "") + ". سيتم ربط دليل البيانات في مرحلة لاحقة.";
  showAppMessage(message);
});
function showAppMessage(message) {
  let toast = $("#appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "app-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(window.__senDaaraToastTimer);
  window.__senDaaraToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    $("#searchInput").value = button.dataset.query;
    $("#searchForm").requestSubmit();
  });
});
document.querySelectorAll("[data-category]").forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    if (button.dataset.category === "daara") { window.location.href = "daara-admin.html"; return; }
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.classList.remove("is-selected");
      card.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    const names = {daara:"المحاظر",school:"المدارس القرآنية",teacher:"المعلمون والخدمات",support:"دعم المحاظر"};
    const frenchNames = {daara:"Daaras",school:"Écoles coraniques",teacher:"Enseignants et services",support:"Soutenir un daara"};
    showAppMessage(language === "fr" ? frenchNames[button.dataset.category] + " : cette rubrique sera activée après connexion des données." : "اخترت قسم " + names[button.dataset.category] + ". سيتم تفعيله عند ربط البيانات.");
  });
});
function showComingSoon() {
  showAppMessage(language === "fr" ? "Cette fonctionnalité sera disponible dans une prochaine version." : "ستتوفر هذه الميزة في مرحلة قادمة من التطبيق.");
}
$("#notifyButton")?.addEventListener("click", showComingSoon);
$("#notifyTop")?.addEventListener("click", showComingSoon);
$("#joinButton")?.addEventListener("click", showComingSoon);
$("#navProfile")?.addEventListener("click", showComingSoon);
$("#profileTop")?.addEventListener("click", showComingSoon);
$("#navDiscover")?.addEventListener("click", () => $("#searchInput")?.focus());
$("#navJobs")?.addEventListener("click", showComingSoon);
$("#navNotifications")?.addEventListener("click", showComingSoon);
document.querySelectorAll("[data-show-all]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  showAppMessage(language === "fr" ? "Le répertoire complet sera disponible après connexion de la base de données." : "سيظهر الدليل الكامل بعد ربط قاعدة البيانات.");
}));
