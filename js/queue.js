// Queue logic - mirrors backend/visualizers.cpp Queue class
let queue = [];
let capacity = 8;

function showMessage(text, type) {
    let el = document.getElementById("message");
    el.textContent = text;
    el.className = "message " + (type || "");
}

function updateInfo() {
    let front = queue.length > 0 ? queue[0] : "Empty";
    document.getElementById("frontVal").textContent = front;
    document.getElementById("sizeVal").textContent = queue.length + " / " + capacity;
    document.getElementById("isEmptyVal").textContent = (queue.length === 0 ? "Yes" : "No");
    document.getElementById("isFullVal").textContent = (queue.length >= capacity ? "Yes" : "No");
}

function render() {
    let box = document.getElementById("queueDisplay");
    box.innerHTML = "";
    if (queue.length === 0) {
        box.innerHTML = "<div style='text-align:center;color:#777;padding:20px;'>Queue is Empty (Front = -1, Rear = -1)</div>";
        return;
    }
    let container = document.createElement("div");
    container.className = "queue-container";
    // Front label
    let frontLabel = document.createElement("div");
    frontLabel.style.fontSize = "12px";
    frontLabel.style.marginRight = "6px";
    frontLabel.innerHTML = "<b>FRONT</b> &rarr;";
    container.appendChild(frontLabel);

    for (let i = 0; i < queue.length; i++) {
        let item = document.createElement("div");
        item.className = "queue-item" + (i === 0 ? " front" : "");
        item.textContent = queue[i];
        container.appendChild(item);
        if (i < queue.length - 1) {
            let arrow = document.createElement("div");
            arrow.className = "queue-arrow";
            arrow.textContent = "→";
            container.appendChild(arrow);
        }
    }
    let rearLabel = document.createElement("div");
    rearLabel.style.fontSize = "12px";
    rearLabel.style.marginLeft = "6px";
    rearLabel.innerHTML = "&rarr; <b>REAR</b>";
    container.appendChild(rearLabel);

    box.appendChild(container);
}

function enqueue() {
    let input = document.getElementById("queueInput");
    let val = input.value.trim();
    if (val === "") {
        showMessage("Please enter a value to enqueue", "error");
        return;
    }
    if (queue.length >= capacity) {
        showMessage("Queue Overflow! Capacity is " + capacity, "error");
        return;
    }
    queue.push(val);
    showMessage("Enqueued '" + val + "' at rear", "success");
    input.value = "";
    updateInfo();
    render();
}

function dequeue() {
    if (queue.length === 0) {
        showMessage("Queue Underflow! Nothing to dequeue", "error");
        return;
    }
    let val = queue.shift();
    showMessage("Dequeued '" + val + "' from front", "success");
    updateInfo();
    render();
}

function front() {
    if (queue.length === 0) {
        showMessage("Queue is empty, no front element", "error");
        return;
    }
    showMessage("Front element is '" + queue[0] + "'", "success");
}

function clearQueue() {
    queue = [];
    showMessage("Queue cleared", "");
    updateInfo();
    render();
}

updateInfo();
render();
