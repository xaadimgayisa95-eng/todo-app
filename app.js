const translations = {
  fr: {
    eyebrow:"AU CŒUR DU SÉNÉGAL",heroTitle:'Le savoir commence<br><em>au Daara.</em>',heroText:"Découvrez les daaras et écoles coraniques près de chez vous. Le lien entre les familles, les enseignants et le savoir.",explore:"Explorer les daaras",findKicker:"VOTRE RECHERCHE",findTitle:"Trouver un daara",searchLabel:"Nom du daara ou enseignant",searchPlaceholder:"Ex. Daara Serigne...",regionLabel:"Région",allRegions:"Toutes les régions",searchButton:"Rechercher",popular:"Populaire :",discoverKicker:"DÉCOUVRIR",discoverTitle:"Explorez par besoin",cat1:"Daaras",cat1desc:"Apprentissage du Coran",cat2:"Écoles coraniques",cat2desc:"Établissements & madrasas",cat3:"Enseignants",cat3desc:"Trouver un enseignant",cat4:"Soutenir un daara",cat4desc:"Contribuer à sa mission",nearKicker:"À DÉCOUVRIR",nearTitle:"Les daaras en vedette",previewBadge:"APERÇU",emptyTitle:"Votre communauté commence ici",emptyText:"Les profils des daaras et enseignants apparaîtront ici dès que le répertoire sera connecté. Pour le moment, nous préparons un espace clair et fiable pour tous.",notifyButton:"Être informé du lancement",joinKicker:"ENSEMBLE POUR LE SAVOIR",joinTitle:"Vous représentez un daara ?",joinText:"Préparez-vous à présenter votre établissement aux familles du Sénégal.",navHome:"Accueil",navSearch:"Recherche",navDaaras:"Les daaras",navProfile:"Profil",footer:"Pensé au Sénégal, pour le Sénégal."
  },
  ar: {
    eyebrow:"في قلب السنغال",heroTitle:'العلم يبدأ<br><em>في الدار.</em>',heroText:"اكتشف المحاظر والمدارس القرآنية القريبة منك. منصة تجمع الأسر والمعلمين وطلاب العلم.",explore:"اكتشف المحاظر",findKicker:"ابدأ البحث",findTitle:"ابحث عن محظرة",searchLabel:"اسم المحظرة أو المعلم",searchPlaceholder:"مثال: محظرة الشيخ...",regionLabel:"المنطقة",allRegions:"جميع المناطق",searchButton:"بحث",popular:"الأكثر بحثًا:",discoverKicker:"اكتشف",discoverTitle:"تصفح حسب حاجتك",cat1:"المحاظر",cat1desc:"تعليم القرآن الكريم",cat2:"المدارس القرآنية",cat2desc:"المدارس والمعاهد",cat3:"المعلمون",cat3desc:"ابحث عن معلم",cat4:"ادعم محظرة",cat4desc:"ساهم في رسالتها",nearKicker:"اكتشف",nearTitle:"محاظر مميزة",previewBadge:"معاينة",emptyTitle:"مجتمعك يبدأ من هنا",emptyText:"ستظهر ملفات المحاظر والمعلمين هنا بعد ربط دليل المدارس. نعمل الآن على إعداد مساحة واضحة وموثوقة للجميع.",notifyButton:"أخبرني عند الإطلاق",joinKicker:"معًا من أجل العلم",joinTitle:"هل تمثل محظرة؟",joinText:"استعد لتعريف الأسر في السنغال بمؤسستك.",navHome:"الرئيسية",navSearch:"بحث",navDaaras:"المحاظر",navProfile:"الملف الشخصي",footer:"صُنع في السنغال، من أجل السنغال."
  }
};
let language = "fr";
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
  const region = $("#regionSelect").value;
  const msg = language === "fr"
    ? "Le répertoire sera disponible après la connexion des données. " + (query ? "Recherche préparée : " + query + ". " : "") + (region ? "Région : " + region + "." : "")
    : "سيصبح الدليل متاحًا بعد ربط قاعدة البيانات. " + (query ? "عبارة البحث: " + query + ". " : "") + (region ? "المنطقة: " + region + "." : "");
  $("#notice").textContent = msg;
  $("#results").scrollIntoView({behavior:"smooth",block:"start"});
});
document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    $("#searchInput").value = button.dataset.query;
    $("#searchForm").requestSubmit();
  });
});
document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    const categoryNames = {daara:"Daaras",school:"Écoles coraniques",teacher:"Enseignants",support:"Soutenir un daara"};
    const categoryNamesAr = {daara:"المحاظر",school:"المدارس القرآنية",teacher:"المعلمون",support:"دعم المحاظر"};
    $("#notice").textContent = language === "fr" ? categoryNames[button.dataset.category] + " : cette rubrique sera activée lors de la prochaine étape." : categoryNamesAr[button.dataset.category] + " : سيتم تفعيل هذا القسم في المرحلة القادمة.";
    $("#results").scrollIntoView({behavior:"smooth",block:"start"});
  });
});
function showComingSoon() {
  $("#notice").textContent = language === "fr" ? "Cette fonctionnalité sera disponible dans une prochaine version de SenDaara." : "ستتوفر هذه الميزة في إصدار قادم من SenDaara.";
  $("#results").scrollIntoView({behavior:"smooth",block:"start"});
}
$("#notifyButton").addEventListener("click", showComingSoon);
$("#joinButton").addEventListener("click", showComingSoon);
$("#navProfile").addEventListener("click", showComingSoon);