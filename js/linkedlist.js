// Linked List logic - mirrors backend/visualizers.cpp LinkedList class
let list = [];

function showMessage(text, type) {
    let el = document.getElementById("message");
    el.textContent = text;
    el.className = "message " + (type || "");
}

function updateInfo() {
    document.getElementById("sizeVal").textContent = list.length;
    document.getElementById("headVal").textContent = list.length > 0 ? list[0] : "NULL";
}

function render() {
    let box = document.getElementById("listDisplay");
    box.innerHTML = "";
    if (list.length === 0) {
        box.innerHTML = "<div style='text-align:center;color:#777;padding:20px;'>List is Empty (HEAD = NULL)</div>";
        return;
    }
    let container = document.createElement("div");
    container.className = "ll-container";
    let headLabel = document.createElement("div");
    headLabel.style.fontSize = "12px";
    headLabel.innerHTML = "<b>HEAD</b> &rarr;";
    headLabel.style.marginRight = "4px";
    container.appendChild(headLabel);

    for (let i = 0; i < list.length; i++) {
        let node = document.createElement("div");
        node.className = "ll-node";
        let data = document.createElement("div");
        data.className = "ll-data";
        data.textContent = list[i];
        let next = document.createElement("div");
        next.className = "ll-next";
        next.textContent = (i === list.length - 1 ? "NULL" : "next");
        node.appendChild(data);
        node.appendChild(next);
        container.appendChild(node);
        if (i < list.length - 1) {
            let arrow = document.createElement("div");
            arrow.className = "ll-arrow";
            arrow.textContent = "→";
            container.appendChild(arrow);
        }
    }
    box.appendChild(container);
}

function insertBeginning() {
    let input = document.getElementById("llInput");
    let val = input.value.trim();
    if (val === "") { showMessage("Enter a value", "error"); return; }
    list.unshift(val);
    showMessage("Inserted '" + val + "' at beginning (index 0)", "success");
    input.value = "";
    updateInfo(); render();
}

function insertEnd() {
    let input = document.getElementById("llInput");
    let val = input.value.trim();
    if (val === "") { showMessage("Enter a value", "error"); return; }
    list.push(val);
    showMessage("Inserted '" + val + "' at end (index " + (list.length - 1) + ")", "success");
    input.value = "";
    updateInfo(); render();
}

function insertAt() {
    let input = document.getElementById("llInput");
    let posInput = document.getElementById("llPosInput");
    let val = input.value.trim();
    let pos = parseInt(posInput.value);
    if (val === "") { showMessage("Enter a value", "error"); return; }
    if (isNaN(pos) || pos < 0 || pos > list.length) {
        showMessage("Invalid position. Must be 0 to " + list.length, "error");
        return;
    }
    list.splice(pos, 0, val);
    showMessage("Inserted '" + val + "' at position " + pos, "success");
    input.value = "";
    updateInfo(); render();
}

function deleteBeginning() {
    if (list.length === 0) { showMessage("List is empty", "error"); return; }
    let val = list.shift();
    showMessage("Deleted '" + val + "' from beginning", "success");
    updateInfo(); render();
}

function deleteEnd() {
    if (list.length === 0) { showMessage("List is empty", "error"); return; }
    let val = list.pop();
    showMessage("Deleted '" + val + "' from end", "success");
    updateInfo(); render();
}

function deleteAt() {
    let posInput = document.getElementById("llPosInput");
    let pos = parseInt(posInput.value);
    if (list.length === 0) { showMessage("List is empty", "error"); return; }
    if (isNaN(pos) || pos < 0 || pos >= list.length) {
        showMessage("Invalid position. Must be 0 to " + (list.length - 1), "error");
        return;
    }
    let val = list.splice(pos, 1)[0];
    showMessage("Deleted '" + val + "' from position " + pos, "success");
    updateInfo(); render();
}

function search() {
    let input = document.getElementById("searchInput");
    let val = input.value.trim();
    if (val === "") { showMessage("Enter value to search", "error"); return; }
    let pos = list.indexOf(val);
    if (pos === -1) {
        showMessage("Value '" + val + "' not found in list", "error");
    } else {
        showMessage("Found '" + val + "' at index " + pos, "success");
    }
}

function clearList() {
    list = [];
    showMessage("List cleared (HEAD = NULL)", "");
    updateInfo(); render();
}

updateInfo();
render();
