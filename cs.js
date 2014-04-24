"use strict";

var process = false;
document.addEventListener('mousemove', function (e) {
    if (!process) {
        process = true;
        chrome.runtime.sendMessage({
                x: 1 - (e.clientX / window.innerWidth),
                y: e.clientY / window.innerHeight
                }, function() {
            process = false;
        });
    }
}, false);
