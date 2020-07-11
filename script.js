"use strict";
//	build scene
var loaded = 0;
var viewer = document.querySelector('.viewer');
var loader = document.querySelector('h2 span');
var images = [];
for (var i = 1; i <= 120; ++i) {
    var img = new Image();
    img.src = "//s3-us-west-2.amazonaws.com/s.cdpn.io/68939/360-" + ('00' + i).slice(-3) + ".jpg";
    img.onload = function () { return loader.innerText = Math.round(++loaded / 120 * 360) + "\u02DA"; };
    images.push(img);
    viewer.appendChild(img);
}

var threshold = 5;
var total = images.length - 1;
var frame = 0;
var impetus = new Impetus({
    source: document,
    update: function (x) {
        images[frame].classList.remove('active');
        frame = Math.floor(-x / threshold) % total;
        frame = frame <= 0 ? total + frame : frame;
        images[frame].classList.add('active');
    }
});
images[frame].classList.add('active');
//	cursor
addEventListener('mousedown', function (e) { return document.body.style.cursor = 'grabbing'; });
addEventListener('mouseup', function (e) { return document.body.style.cursor = 'grab'; });