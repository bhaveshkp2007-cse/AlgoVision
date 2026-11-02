// Stack logic - mirrors backend/visualizers.cpp Stack class
let stack = [];
let capacity = 8;

function showMessage(text, type) {
    let el = document.getElementById("message");
    el.textContent = text;
    el.className = "message " + (type || "");
}

function updateInfo() {
    let top = stack.length > 0 ? stack[stack.length - 1] : "Empty";
    document.getElementById("topVal").textContent = top;
    document.getElementById("sizeVal").textContent = stack.length + " / " + capacity;
    document.getElementById("isEmptyVal").textContent = (stack.length === 0 ? "Yes" : "No");
    document.getElementById("isFullVal").textContent = (stack.length >= capacity ? "Yes" : "No");
}

function render() {
    let box = document.getElementById("stackDisplay");
    box.innerHTML = "";
    if (stack.length === 0) {
        box.innerHTML = "<div style='text-align:center;color:#777;padding:30px;'>Stack is Empty (Top = -1)</div>";
        return;
    }
    let container = document.createElement("div");
    container.className = "stack-container";
    let stackBox = document.createElement("div");
    stackBox.className = "stack-box";
    for (let i = 0; i < stack.length; i++) {
        let item = document.createElement("div");
        item.className = "stack-item" + (i === stack.length - 1 ? " top" : "");
        item.textContent = stack[i];
        stackBox.appendChild(item);
    }
    container.appendChild(stackBox);
    let labels = document.createElement("div");
    labels.className = "stack-labels";
    labels.innerHTML = "<div><b>TOP</b> = index " + (stack.length - 1) + "</div><div>Size: " + stack.length + "</div><div>Capacity: " + capacity + "</div>";
    container.appendChild(labels);
    box.appendChild(container);
}

function push() {
    let input = document.getElementById("stackInput");
    let val = input.value.trim();
    if (val === "") {
        showMessage("Please enter a value to push", "error");
        return;
    }
    if (stack.length >= capacity) {
        showMessage("Stack Overflow! Capacity is " + capacity, "error");
        return;
    }
    stack.push(val);
    showMessage("Pushed '" + val + "' to stack", "success");
    input.value = "";
    updateInfo();
    render();
}

function pop() {
    if (stack.length === 0) {
        showMessage("Stack Underflow! Nothing to pop", "error");
        return;
    }
    let val = stack.pop();
    showMessage("Popped '" + val + "' from stack", "success");
    updateInfo();
    render();
}

function peek() {
    if (stack.length === 0) {
        showMessage("Stack is empty, nothing to peek", "error");
        return;
    }
    let val = stack[stack.length - 1];
    showMessage("Top element is '" + val + "' at index " + (stack.length - 1), "success");
    render();
}

function clearStack() {
    stack = [];
    showMessage("Stack cleared", "");
    updateInfo();
    render();
}

// Postfix evaluation: tokens separated by space
function evaluatePostfix() {
    let input = document.getElementById("postfixInput");
    let expr = input.value.trim();
    let out = document.getElementById("postfixResult");
    if (expr === "") { out.textContent = "Please enter postfix expression"; out.className="message error"; return; }
    let tokens = expr.split(/\s+/);
    let st = [];
    for (let t of tokens) {
        if (!isNaN(t) && t !== "") {
            st.push(parseFloat(t));
        } else if (["+", "-", "*", "/", "^", "%"].includes(t)) {
            if (st.length < 2) { out.textContent="Invalid expression: not enough operands for " + t; out.className="message error"; return; }
            let b = st.pop(), a = st.pop();
            let r = 0;
            if (t==="+") r=a+b;
            else if (t==="-") r=a-b;
            else if (t==="*") r=a*b;
            else if (t==="/") { if(b===0){ out.textContent="Error: Division by zero"; out.className="message error"; return;} r=a/b; }
            else if (t==="^") r=Math.pow(a,b);
            else if (t==="%") r=a%b;
            st.push(r);
        } else { out.textContent="Invalid token: " + t; out.className="message error"; return; }
    }
    if (st.length !== 1) { out.textContent="Invalid expression: extra operands"; out.className="message error"; return; }
    out.textContent = "Postfix Result: " + st[0];
    out.className="message success";
}

function evaluatePrefix() {
    let input = document.getElementById("prefixInput");
    let expr = input.value.trim();
    let out = document.getElementById("prefixResult");
    if (expr === "") { out.textContent = "Please enter prefix expression"; out.className="message error"; return; }
    let tokens = expr.split(/\s+/);
    let st = [];
    for (let i=tokens.length-1; i>=0; i--) {
        let t = tokens[i];
        if (!isNaN(t) && t !== "") {
            st.push(parseFloat(t));
        } else if (["+", "-", "*", "/", "^", "%"].includes(t)) {
            if (st.length < 2) { out.textContent="Invalid expression: not enough operands for " + t; out.className="message error"; return; }
            let a = st.pop(), b = st.pop();
            let r = 0;
            if (t==="+") r=a+b;
            else if (t==="-") r=a-b;
            else if (t==="*") r=a*b;
            else if (t==="/") { if(b===0){ out.textContent="Error: Division by zero"; out.className="message error"; return;} r=a/b; }
            else if (t==="^") r=Math.pow(a,b);
            else if (t==="%") r=a%b;
            st.push(r);
        } else { out.textContent="Invalid token: " + t; out.className="message error"; return; }
    }
    if (st.length !== 1) { out.textContent="Invalid expression"; out.className="message error"; return; }
    out.textContent = "Prefix Result: " + st[0];
    out.className="message success";
}

function switchCode(lang, btn) {
    document.querySelectorAll(".code-content").forEach(el=> el.style.display="none");
    document.getElementById("code-"+lang).style.display="block";
    document.querySelectorAll(".code-tab").forEach(b=> b.classList.remove("active"));
    btn.classList.add("active");
}

// init
updateInfo();
render();
