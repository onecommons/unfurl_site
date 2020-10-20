// import { Terminal } from './xterm.js';
// import { FitAddon } from './xterm-addon-fit.js';

var toggle = true;
var totalTime = 0;
var TICK = 33;
var TIMESTEP = 33;
var time = 33;
var pos = 0;
var timer;
var data;
var term;

// Thanks http://stackoverflow.com/a/2998822
function zeroPad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}

function scrub() {
   setPercent = document.getElementById('scrubber').value;
   time = (setPercent / 100) * totalTime;
   restart(time);
}

function buildTimeString(millis) {
    hours   = zeroPad(Math.floor(millis / (1000 * 60 * 60)), 2);
    millis -= hours * (1000 * 60 * 60)
    minutes = zeroPad(Math.floor(millis / (1000 * 60)), 2);
    millis -= minutes * (1000 * 60);
    seconds = zeroPad(Math.floor(millis / 1000), 2);
    if (+hours)
        return hours + ':' + minutes + ':' + seconds;
    else
        return minutes + ':' + seconds;
}

function advance() {
    document.getElementById('scrubber').value =
                               Math.ceil((time / totalTime) * 100);
    timestr = buildTimeString(time);
    document.getElementById("beforeScrubberText").innerHTML =
                                                           timestr;
    for (; pos < data.length; pos++) {
        if (data[pos][1] <= time) {
            term.write(eval(data[pos][0]));
        } else {
            break;
        }
    }

    if (pos >= data.length) {
        clearInterval(timer);
    }

    time += TIMESTEP;
}

function pause(test) {
    if (!toggle && test) {
        return;
    }
    if (toggle) {
        clearInterval(timer);
        toggle = !toggle;
    } else {
       timer = setInterval(advance, TICK);
       toggle = !toggle;
    }
}

function setSpeed() {
    speed = document.getElementById('speed').value;
    if (speed == 0) {
        TIMESTEP = TICK;
    } else if (speed < 0) {
        TIMESTEP = TICK / -speed;
    } else {
        TIMESTEP = TICK * speed;
    }
}

function restart(millis) {
    clearInterval(timer);
    term.reset();
    time = millis;
    pos = 0;
    toggle = true;
    timer = setInterval(advance, TICK);
}

function run(data_, cols, rows) {
    data = data_;
    term = new Terminal({
      screenKeys: true,
      cols: cols || 80,
      rows: rows || 20,
      // rendererType: "dom"
    });
    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    totalTime = data[data.length - 1][1];
    timestr = buildTimeString(totalTime);
    document.getElementById("afterScrubberText").innerHTML = timestr;
    term.open(document.getElementById('terminal'));
    fitAddon.fit();
    timer = setInterval(advance, TICK);
}
