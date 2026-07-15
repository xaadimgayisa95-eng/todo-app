document.getElementById("startBtn").onclick = function () {
    window.location.href = "search.html";
};

document.getElementById("searchBtn").onclick = function () {
    window.location.href = "search.html";
};

document.getElementById("notificationBtn").onclick = function () {
    alert("الإشعارات ستكون متاحة قريبًا.");
};

document.querySelectorAll(".category-card").forEach((card) => {
    card.onclick = function () {
        window.location.href = "search.html";
    };
});

document.querySelectorAll(".teacher-card button").forEach((btn) => {
    btn.onclick = function (e) {
        e.stopPropagation();
        window.open("https://wa.me/221700000000", "_blank");
    };
});

document.querySelectorAll(".teacher-card").forEach((card) => {
    card.onclick = function () {
        window.location.href = "teacher.html";
    };
});

document.querySelectorAll(".bottom-nav div")[0].onclick = function () {
    window.location.href = "index.html";
};

document.querySelectorAll(".bottom-nav div")[1].onclick = function () {
    window.location.href = "search.html";
};

document.querySelectorAll(".bottom-nav div")[2].onclick = function () {
    alert("المفضلة قريبًا.");
};

document.querySelectorAll(".bottom-nav div")[3].onclick = function () {
    alert("الحساب الشخصي قريبًا.");
};