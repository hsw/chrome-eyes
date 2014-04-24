"use strict";

var port = chrome.runtime.connect({name: "mousemove"}),
    old_x = -1,
    old_y = -1;

document.addEventListener('mousemove', function (e) {
    var x = 1 - (e.clientX / window.innerWidth),
        y = e.clientY / window.innerHeight;

    if (Math.abs(x - old_x) + Math.abs(y - old_y) > 0.01) {
        old_x = x;
        old_y = y;
        port.postMessage({
            x: x,
            y: y
        });
    }
}, false);
