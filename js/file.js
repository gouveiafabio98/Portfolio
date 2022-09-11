var files = document.getElementsByClassName('file');
var activeFile = null;


document.addEventListener("click", function(e) {
    if (e.target.classList.contains('file')) {
        if (e.target.classList.contains("selected")) {
            let newWindow = document.getElementById(e.target.dataset.file);
            newWindow.classList.add("display");
            activeWindows.push(newWindow);
            zWindow();
        } else {
            if (!Array.from(files).includes(e)) {
                if (activeFile != null && activeFile.classList.contains('selected'))
                    activeFile.classList.remove('selected');
            }
            e.target.classList.add('selected');
            activeFile = e.target;
        }
    } else {
        if (activeFile != null) {
            activeFile.classList.remove('selected');
            activeFile = null;
        }
    }
});

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

const phrases = [
    'scan 4568...',
    'dest..65.2.4',
    'sphere..43.2.4',
    'EXT..8765',
    'BIT..1254',
    'XAV..4414',
    'exit 4568',
    'restarting process'
]

const el = document.querySelector('#globe .text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1500)
    })
    counter = (counter + 1) % phrases.length
}

next()

// ——————————————————————————————————————————————————
// FLIP PATH
// ——————————————————————————————————————————————————

/*var paths = document.querySelector('svg').children;

Array.from(paths).forEach((path) => {
    path.path = path.getTotalLength();
    path.style.strokeDasharray = path.path;
    path.style.strokeDashoffset = path.path;
    path.inc = path.path / 500;

    path.animation = setInterval(pathAnimation, 5, path);
});

function pathAnimation(path) {
    if (path.style.strokeDashoffset > 0) {
        if (path.style.strokeDashoffset > 1)
            path.style.strokeDashoffset -= path.inc;
        else {
            path.style.strokeDashoffset = 0;
            clearInterval(path.animation);
            path.classList.add("active");
        }
    }
}*/

// ——————————————————————————————————————————————————
// CHART
// ——————————————————————————————————————————————————

var chart = document.getElementById('chart').children;

Array.from(chart).forEach((collumn) => {
    collumn.bar = collumn.querySelector('.bar');
    collumn.value = collumn.querySelector('.value');

    collumn.txtEffect = new TextScramble(collumn.value);

    chartLoad(collumn);
});

function chartLoad(e) {
    var nHeight = (Math.random() * 100).toFixed(2);
    e.bar.style.height = nHeight + "%";
    e.txtEffect.setText(nHeight + "%");
    setTimeout(chartLoad, 2000, e);
}

// ——————————————————————————————————————————————————
// WINDOWS CLOSE
// ——————————————————————————————————————————————————

var windows = document.getElementById("window").children;

Array.from(windows).forEach((window) => {
    /* FIX SIZE TITLE */
    if (window.querySelector('.title .name').clientWidth + 64 >= window.clientWidth) {
        window.querySelector('.title').classList.add("full");
    } else {
        window.querySelector('.title').classList.remove("full");
    }

    /* CLOSE */
    window.querySelector(".close").addEventListener("click", function() {
        let window = this.parentElement.parentElement
        window.classList.remove("display");
        arrayRemove(activeWindows, window);
    });

    window.querySelector(".main").addEventListener("click", function() {
        upWindow(activeWindows.indexOf(this.parentElement));
    });

    window.querySelector(".title").addEventListener("click", function() {
        upWindow(activeWindows.indexOf(this.parentElement));
    });
});

// ——————————————————————————————————————————————————
// WINDOWS Z-INDEX
// ——————————————————————————————————————————————————

activeWindows = Array.from(document.querySelectorAll(".window.display"));

zWindow();

function zWindow() {
    activeWindows.forEach((window, i) => {
        window.style.zIndex = i;
    });
}

function upWindow(index) {
    activeWindows.push(activeWindows.splice(index, 1)[0]);
    zWindow();
}

function arrayRemove(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}