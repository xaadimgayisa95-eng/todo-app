function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("اكتب مهمة أولاً.");
        return;
    }

    const list = document.getElementById("taskList");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = text;

    span.onclick = function () {
        if (span.style.textDecoration === "line-through") {
            span.style.textDecoration = "none";
            span.style.color = "black";
        } else {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }
    };

    const del = document.createElement("button");
    del.innerText = "حذف";
    del.className = "delete-btn";

    del.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(del);

    list.appendChild(li);

    input.value = "";
}