document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
        alert("🚀 قريبًا ستفتح هذه الفئة.");
    });
});

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
        alert("📖 سيتم فتح صفحة المعلم قريبًا.");
    });
});