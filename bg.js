"use strict";

var icon_size = 19 * window.devicePixelRatio,
    eye_radius = Math.round(icon_size / 5),
    pupil_radius = Math.round(eye_radius / 2),
    max_x_delta = icon_size - 4 * eye_radius,
    max_y_delta = icon_size - 2 * eye_radius,
    max_pupil_delta = eye_radius - pupil_radius,
    time = window.performance.now();

var canvas = document.createElement('canvas');
canvas.width = icon_size;
canvas.height = icon_size;
var ctx = canvas.getContext('2d');

function showEyes(x, y, sleep) {
    ctx.clearRect(0, 0, icon_size, icon_size);

    var eye_x = icon_size - eye_radius - max_x_delta * x,
        eye_y = eye_radius + max_y_delta * y,
        pupil_delta_x = max_pupil_delta * x,
        pupil_delta_y = max_pupil_delta * y;

    for(var i = 0; i < 2; i++) {
        var eye_xx = eye_x - i * (2 * eye_radius - 1);

        ctx.strokeStyle = ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(eye_xx, eye_y, eye_radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = ctx.fillStyle = sleep ? "grey" : "red";
        ctx.beginPath();
        ctx.arc(eye_xx - pupil_delta_x, eye_y + pupil_delta_y, pupil_radius, 0, Math.PI * 2);
        ctx.fill();
    }

    var imageData = ctx.getImageData(0, 0, icon_size, icon_size);
    chrome.browserAction.setIcon({
        imageData: imageData
    });
}

function processRequest(request) {
    var x = Math.min(request.x, 1),
        y = Math.min(request.y, 1),
        t2 = window.performance.now();
    if (t2 - time > 1/60) {
        time = t2;
        showEyes(x, y);
    }
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(processRequest);
});

chrome.runtime.onSuspend.addListener(function() {
    showEyes(0, 0, true);
});

showEyes(0, 0, true);
