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

// --- Circular Queue ---
let cqCapacity = 6;
let cqArr = new Array(cqCapacity).fill(null);
let cqFront = -1, cqRear = -1, cqSize = 0;

function cqShow(msg, type) {
    let el = document.getElementById("cqMessage");
    el.textContent = msg;
    el.className = "message " + (type||"");
}
function cqUpdateInfo() {
    document.getElementById("cqFrontVal").textContent = cqFront;
    document.getElementById("cqRearVal").textContent = cqRear;
    document.getElementById("cqSizeVal").textContent = cqSize + " / " + cqCapacity;
}
function cqRender() {
    let box = document.getElementById("cqDisplay");
    box.innerHTML = "";
    if (cqSize === 0) { box.innerHTML="<div style='text-align:center;color:#777;padding:15px;'>Circular Queue is Empty</div>"; return; }
    let cont = document.createElement("div");
    cont.className="queue-container";
    for (let i=0;i<cqCapacity;i++) {
        let item = document.createElement("div");
        item.style.minWidth="50px";
        item.style.textAlign="center";
        let isOccupied = false;
        if (cqSize>0) {
            // check if i is between front and rear circularly
            let idx = cqFront;
            for (let c=0;c<cqSize;c++) {
                if (idx===i) { isOccupied=true; break; }
                idx=(idx+1)%cqCapacity;
            }
        }
        if (isOccupied) {
            item.className="queue-item";
            if (i===cqFront) item.className+=" front";
            item.textContent = cqArr[i];
        } else {
            item.className="queue-item";
            item.style.backgroundColor="#eee";
            item.style.color="#999";
            item.textContent="empty";
            item.style.borderStyle="dashed";
        }
        let wrap = document.createElement("div");
        wrap.style.textAlign="center";
        wrap.style.fontSize="11px";
        wrap.innerHTML = "["+i+"]";
        let col = document.createElement("div");
        col.appendChild(item);
        col.appendChild(wrap);
        cont.appendChild(col);
    }
    box.appendChild(cont);
}
function cqEnqueue() {
    let input = document.getElementById("cqInput");
    let val = input.value.trim();
    if (val===""){ cqShow("Enter a value","error"); return; }
    if (cqSize>=cqCapacity){ cqShow("Circular Queue is Full","error"); return; }
    if (cqFront===-1){ cqFront=0; cqRear=0; }
    else { cqRear=(cqRear+1)%cqCapacity; }
    cqArr[cqRear]=val;
    cqSize++;
    cqShow("Enqueued '"+val+"' at index "+cqRear,"success");
    input.value="";
    cqUpdateInfo(); cqRender();
}
function cqDequeue() {
    if (cqSize===0){ cqShow("Circular Queue is Empty","error"); return; }
    let val = cqArr[cqFront];
    cqArr[cqFront]=null;
    cqShow("Dequeued '"+val+"' from index "+cqFront,"success");
    if (cqSize===1){ cqFront=-1; cqRear=-1; }
    else { cqFront=(cqFront+1)%cqCapacity; }
    cqSize--;
    cqUpdateInfo(); cqRender();
}
function cqFrontFn() {
    if (cqSize===0){ cqShow("Queue is empty","error"); return; }
    cqShow("Front element is '"+cqArr[cqFront]+"' at index "+cqFront,"success");
}
function cqRearFn() {
    if (cqSize===0){ cqShow("Queue is empty","error"); return; }
    cqShow("Rear element is '"+cqArr[cqRear]+"' at index "+cqRear,"success");
}
function cqClear() {
    cqArr = new Array(cqCapacity).fill(null);
    cqFront=-1; cqRear=-1; cqSize=0;
    cqShow("Circular Queue cleared","");
    cqUpdateInfo(); cqRender();
}

// --- Priority Queue ---
// smaller number = higher priority
let pqList = [];
function pqShow(msg,type){
    let el=document.getElementById("pqMessage");
    el.textContent=msg;
    el.className="message "+(type||"");
}
function pqRender(){
    let box=document.getElementById("pqDisplay");
    box.innerHTML="";
    if(pqList.length===0){ box.innerHTML="<div style='text-align:center;color:#777;padding:15px;'>Priority Queue is Empty</div>"; return; }
    let cont=document.createElement("div");
    cont.className="queue-container";
    // already sorted by priority
    for(let i=0;i<pqList.length;i++){
        let item=document.createElement("div");
        item.className="queue-item" + (i===0 ? " front" : "");
        item.innerHTML = pqList[i].value + "<br><span style='font-size:11px;'>p="+pqList[i].priority+"</span>";
        cont.appendChild(item);
        if(i<pqList.length-1){
            let arr=document.createElement("div"); arr.className="queue-arrow"; arr.textContent="→";
            cont.appendChild(arr);
        }
    }
    box.appendChild(cont);
}
function pqInsert(){
    let vInput=document.getElementById("pqVal");
    let pInput=document.getElementById("pqPri");
    let val=vInput.value.trim();
    let pri=parseInt(pInput.value.trim());
    if(val===""){ pqShow("Enter value","error"); return; }
    if(isNaN(pri)){ pqShow("Enter valid priority number","error"); return; }
    pqList.push({value:val, priority:pri});
    // sort ascending: smaller priority first
    pqList.sort((a,b)=> a.priority - b.priority);
    pqShow("Inserted '"+val+"' with priority "+pri,"success");
    vInput.value=""; pInput.value="";
    pqRender();
}
function pqDelete(){
    if(pqList.length===0){ pqShow("Priority Queue is Empty","error"); return; }
    let removed=pqList.shift();
    pqShow("Deleted highest priority: '"+removed.value+"' (p="+removed.priority+")","success");
    pqRender();
}
function pqClear(){
    pqList=[];
    pqShow("Priority Queue cleared","");
    pqRender();
}

function switchCode(lang, btn) {
    document.querySelectorAll(".code-content").forEach(el=> el.style.display="none");
    document.getElementById("code-"+lang).style.display="block";
    document.querySelectorAll(".code-tab").forEach(b=> b.classList.remove("active"));
    btn.classList.add("active");
}

updateInfo();
render();
cqUpdateInfo(); cqRender(); pqRender();
