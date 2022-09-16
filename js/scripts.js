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

document.addEventListener('DOMContentLoaded', function() {
    this.getElementById("load").classList.remove("display");
}, false);

// ——————————————————————————————————————————————————
// Console
// ——————————————————————————————————————————————————

var terminal = document.getElementById("terminal");
var terminalMain = terminal.querySelector(".main");
var consoleInput = terminal.querySelector("input");
var inputText = terminal.querySelector(".inputText")
var terminalArea = terminal.querySelector(".console");

var projects = [];
Array.from(document.getElementById("projects").querySelectorAll(".file")).forEach((file) => { projects.push(document.getElementById(file.dataset.file)); });

terminal.addEventListener("click", function() {
    consoleInput.focus();
});

consoleInput.addEventListener("input", function() {
    inputText.innerHTML = this.value;
});

consoleInput.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        var tag = createP(this.value)
        tag.classList.add("typed");
        terminalArea.appendChild(tag);

        consoleEvent(this.value);

        inputText.innerHTML = "";
        this.value = "";
        terminalMain.scrollTop = terminalMain.scrollHeight;
    }
});

function consoleEvent(content) {
    content = content.toLowerCase();
    contentSplit = content.split(" ");

    if (contentSplit[0] == "help") {
        terminalArea.appendChild(createP("Available commands:"));
        terminalArea.appendChild(createP("PROJECT $id"));
    } else if (contentSplit[0] == "project") {
        if (!openWindow(projects[parseInt(contentSplit[1])]))
            terminalArea.appendChild(createP("'" + content + "' does not exists."));
    } else {
        terminalArea.appendChild(createP("'" + contentSplit[0] + "' does not exists."));
    }
}

function createP(text) {
    var tag = document.createElement("p");
    var text = document.createTextNode(text);
    tag.appendChild(text);
    return tag;
}

var main = document.querySelector("main");

function windowPosition(target) {
    if (target.getAttribute("data-x") == null) {
        var x = parseInt(Math.random() * (main.clientWidth - target.clientWidth));
        var y = parseInt(Math.random() * (main.clientHeight - target.clientHeight));

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }
}