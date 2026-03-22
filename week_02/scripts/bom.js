const input = document.querySelector("#favchap");
const button = document.querySelector("#addChapter");
const list = document.querySelector("#list");

button.addEventListener("click", function () {

    if (input.value === "") {
        alert("Please enter a chapter");
        input.focus();
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = input.value;
    deleteBtn.textContent = "❌";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    deleteBtn.addEventListener("click", function () {
        list.removeChild(li);
    });

    input.value = "";
    input.focus();
});