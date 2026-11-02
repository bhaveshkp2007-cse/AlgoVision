// HashMap logic - mirrors backend/visualizers.cpp HashMap class
// Separate Chaining, hash = sum of char codes % capacity
let capacity = 8;
let table = [];
let entryCount = 0;

function initTable() {
    table = [];
    for (let i = 0; i < capacity; i++) table.push([]);
    entryCount = 0;
}

function hashFunction(key) {
    let sum = 0;
    for (let i = 0; i < key.length; i++) sum += key.charCodeAt(i);
    return sum % capacity;
}

function showMessage(text, type) {
    let el = document.getElementById("message");
    el.textContent = text;
    el.className = "message " + (type || "");
}

function updateStats() {
    document.getElementById("statSize").textContent = entryCount;
    document.getElementById("statCapacity").textContent = capacity;
    document.getElementById("statLoadFactor").textContent = (entryCount / capacity).toFixed(2);
}

function render() {
    let tbody = document.getElementById("hashBody");
    tbody.innerHTML = "";
    for (let i = 0; i < capacity; i++) {
        let tr = document.createElement("tr");
        let tdIdx = document.createElement("td");
        tdIdx.textContent = i;
        let tdEntries = document.createElement("td");
        if (table[i].length === 0) {
            tdEntries.textContent = "(empty)";
            tdEntries.style.color = "#777";
        } else {
            tdEntries.innerHTML = table[i].map(e => "<b>" + e.key + "</b> : " + e.value).join(" &rarr; ");
        }
        let tdCount = document.createElement("td");
        tdCount.textContent = table[i].length;
        tr.appendChild(tdIdx);
        tr.appendChild(tdEntries);
        tr.appendChild(tdCount);
        tbody.appendChild(tr);
    }
    updateStats();
}

function insert() {
    let keyInput = document.getElementById("keyInput");
    let valInput = document.getElementById("valInput");
    let key = keyInput.value.trim();
    let value = valInput.value.trim();
    if (key === "") { showMessage("Please enter a key", "error"); return; }
    if (value === "") value = "0";
    let idx = hashFunction(key);
    // check duplicate
    for (let i = 0; i < table[idx].length; i++) {
        if (table[idx][i].key === key) {
            let old = table[idx][i].value;
            table[idx][i].value = value;
            showMessage("Updated key '" + key + "' at bucket " + idx + ": " + old + " -> " + value, "success");
            render();
            return;
        }
    }
    // check collision for message
    let isCollision = table[idx].length > 0;
    table[idx].push({ key: key, value: value });
    entryCount++;
    if (isCollision) {
        showMessage("Inserted (" + key + "," + value + ") at bucket " + idx + " (Collision handled by chaining)", "success");
    } else {
        showMessage("Inserted (" + key + "," + value + ") at bucket " + idx, "success");
    }
    render();
}

function search() {
    let keyInput = document.getElementById("keyInput");
    let key = keyInput.value.trim();
    if (key === "") { showMessage("Enter key to search", "error"); return; }
    let idx = hashFunction(key);
    for (let i = 0; i < table[idx].length; i++) {
        if (table[idx][i].key === key) {
            showMessage("Found key '" + key + "' at bucket " + idx + " with value: " + table[idx][i].value, "success");
            return;
        }
    }
    showMessage("Key '" + key + "' not found (checked bucket " + idx + ")", "error");
}

function removeKey() {
    let keyInput = document.getElementById("keyInput");
    let key = keyInput.value.trim();
    if (key === "") { showMessage("Enter key to delete", "error"); return; }
    let idx = hashFunction(key);
    for (let i = 0; i < table[idx].length; i++) {
        if (table[idx][i].key === key) {
            table[idx].splice(i, 1);
            entryCount--;
            showMessage("Deleted key '" + key + "' from bucket " + idx, "success");
            render();
            return;
        }
    }
    showMessage("Key '" + key + "' not found, nothing deleted", "error");
}

function clearMap() {
    initTable();
    showMessage("HashMap cleared, all buckets empty", "");
    render();
}

function loadExample() {
    initTable();
    let examples = [["Alice","25"],["Bob","30"],["Charlie","22"],["Bhavesh","20"]];
    for (let e of examples) {
        let idx = hashFunction(e[0]);
        table[idx].push({ key: e[0], value: e[1] });
        entryCount++;
    }
    showMessage("Loaded example: Alice, Bob, Charlie, Bhavesh", "success");
    render();
}

function switchCode(lang, btn) {
    document.querySelectorAll(".code-content").forEach(el=> el.style.display="none");
    document.getElementById("code-"+lang).style.display="block";
    document.querySelectorAll(".code-tab").forEach(b=> b.classList.remove("active"));
    btn.classList.add("active");
}

initTable();
render();
