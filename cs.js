"use strict";

var process = false;
document.addEventListener('mousemove', function (e) {
    if (!process) {
        process = true;
        chrome.runtime.sendMessage({
                x: 1 - (e.pageX / window.innerWidth),
                y: e.pageY / window.innerHeight
                }, function(response) {
            process = false;
        });
    }
}, false);
