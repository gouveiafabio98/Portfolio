let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.onresize = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

startTime();

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function refreshIFrame(element) {
    element.src = element.src;
}

// ——————————————————————————————————————————————————
// Console
// ——————————————————————————————————————————————————

var terminal = document.getElementById("terminal");
var terminalMain = terminal.querySelector(".main");
var consoleInput = terminal.querySelector("input");
var inputText = terminal.querySelector(".inputText")
var terminalArea = terminal.querySelector(".console");

terminal.addEventListener("click", function() {
    consoleInput.focus();
});

consoleInput.addEventListener("input", function() {
    inputText.innerHTML = this.value;
});

consoleInput.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        var tag = document.createElement("p");
        tag.classList.add("typed");
        var text = document.createTextNode(this.value);
        tag.appendChild(text);
        terminalArea.appendChild(tag);

        consoleEvent(this.value);

        inputText.innerHTML = "";
        this.value = "";

        terminalMain.scrollTop = terminalMain.scrollHeight;
    }
});

function consoleEvent(content) {
    content = content.toLowerCase();

    if (content == "help") {
        var tag = document.createElement("p");

        var text = document.createTextNode("Available commands:");
        tag.appendChild(text);
        terminalArea.appendChild(tag);

        tag = document.createElement("p");
        text = document.createTextNode("PROJECT $id");
        tag.appendChild(text);
        terminalArea.appendChild(tag);
    } else if (content.startsWith("project ")) {
        /* --- */
    } else {
        var tag = document.createElement("p");

        var text = document.createTextNode("'" + content + "' does not exists.");
        tag.appendChild(text);
        terminalArea.appendChild(tag);
    }
    terminalArea.appendChild(document.createElement("br"));
}