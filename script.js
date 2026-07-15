function sayHello() {
    alert("🎉 مبروك! أنت تتعلم البرمجة خطوة بخطوة مع ChatGPT.");
}

function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString("ar");

    document.getElementById("time").innerHTML =
        "🕒 الوقت الآن: " + time;
}

updateTime();
setInterval(updateTime, 1000);