var volumeLast = 1;

window.onload = function () {
    showPlay();
    showVolumeValue();
    setCutBorder('leftCutBorder');
    setCutBorder('rightCutBorder');
};

function setDefaultPlayerProp() {
    var player = document.getElementById('audio');
    player.pause();
    showPlay();
    player.currentTime = 0;
    showProgress();
    document.getElementById('leftCutBorder').style.left = 0 + 'px';
    document.getElementById('rightCutBorder').style.left = document.getElementById('progressing').offsetWidth + 'px';
}

function showPlay() {
    var canvas = document.getElementById('play-pause');
    if (canvas.getContext) {
        var play = canvas.getContext('2d');
        play.clearRect(0, 0, canvas.width, canvas.height);
        play.beginPath();
        play.moveTo(25, 12);
        play.lineTo(8, 3);
        play.lineTo(8, 22);
        play.fill();
    }
}

function showPause() {
    var canvas = document.getElementById('play-pause');
    if (canvas.getContext) {
        var play = canvas.getContext('2d');
        play.clearRect(0, 0, canvas.width, canvas.height);
        play.fillRect(6, 3, 7, 19);
        play.fillRect(16, 3, 7, 19);
    }
}

function playButtonClick() {
    var player = document.getElementById('audio');
    if (document.getElementById('mpfile').files[0]) {
        if (player.paused) {
            player.play();
        }
        else {
            player.pause();
        }
    }
}

function clickVolOffOn() {
    var player = document.getElementById('audio');
    var volEl = document.getElementById('volOffOn');
    if (player.volume > 0) {
        player.volume = 0;
        volEl.style.textDecoration = 'line-through';
    }
    else {
        if (volumeLast == 0) {
            player.volume = 1;
        }
        else {
            player.volume = volumeLast;
        }
        volEl.style.textDecoration = 'none';
    }
    showVolumeValue();
}

function showVolumeValue() {
    var player = document.getElementById('audio');
    var canvas = document.getElementById('volumeValue');
    if (canvas.getContext) {
        var volume = canvas.getContext('2d');
        volume.clearRect(0, 0, canvas.width, canvas.height);
        volume.fillStyle = '#5A5950';
        volume.fillRect(0, 0, player.volume * canvas.width, canvas.height);
    }
}

function clickVolume(e) {
    var player = document.getElementById('audio');
    var canvas = document.getElementById('volumeValue');
    if (!e) {
        e = window.event;
    }
    if (!(e.offsetX > canvas.clientWidth)) {
        player.volume = e.offsetX / canvas.clientWidth;
        volumeLast = player.volume;
        showVolumeValue();
    }
}

function showTime() {
    var timer = document.getElementById('timer');
    var player = document.getElementById('audio');
    var m = Math.floor(player.currentTime / 60);
    var s = Math.floor(player.currentTime % 60);
    timer.innerHTML = formatTime(2, m) + ':' + formatTime(2, s);
}

function formatTime(n, type) {
    var nz = "" + type;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
}

function showDuration() {
    var timer = document.getElementById('timer');
    var player = document.getElementById('audio');
    var m = Math.floor(player.duration / 60);
    var s = Math.floor(player.duration % 60);
    timer.innerHTML = formatTime(2, m) + ':' + formatTime(2, s);
}

function showProgress() {
    var player = document.getElementById('audio');
    var canvas = document.getElementById('progressing');
    var curPart = Math.floor(player.currentTime) / Math.floor(player.duration);
    if (canvas.getContext) {
        var progress = canvas.getContext('2d');
        progress.clearRect(0, 0, canvas.width, canvas.height);
        progress.fillRect(0, 0, curPart * canvas.width, canvas.height);
        progress.fillStyle = '#5A5950';
    }
}

function clickProgressBar(e) {
    var player = document.getElementById('audio');
    var canvas = document.getElementById('progressing');

    if (!e) {
        e = window.event;
    }
    player.currentTime = player.duration * (e.offsetX / canvas.clientWidth);
}

function simple_tooltip() {
    $('#progressing').each(function () {
        $("body").append("<div class='tooltip' id='tooltip'><p id='pTooltip'>" + +"</p></div>");
        var my_tooltip = $("#tooltip");
        var player = document.getElementById('player');
        $(this).removeAttr("title").mouseover(function () {
            if (document.getElementById('mpfile').files[0]) {
                my_tooltip.css({opacity: 0.8, display: "none"}).fadeIn(400);
            }
        }).mousemove(function (kmouse) {
            if (document.getElementById('mpfile').files[0]) {
                my_tooltip.css({left: kmouse.pageX - 15, top: getCoords(player).top - 15});
            }
        }).mousemove(function (e) {
            if (document.getElementById('mpfile').files[0]) {
                var player = document.getElementById('audio');
                var canvas = document.getElementById('progressing');

                if (!e) {
                    e = window.event;
                }
                var curTime = Math.floor(player.duration * (e.offsetX / canvas.clientWidth));
                var m = Math.floor(curTime / 60);
                var s = Math.floor(curTime % 60);

                document.getElementById('pTooltip').innerHTML = formatTime(2, m) + ':' + formatTime(2, s);
            }
        }).mouseout(function () {
            if (document.getElementById('mpfile').files[0]) {
                my_tooltip.fadeOut(400);
            }
        });
    });
}

$(document).ready(function () {
    simple_tooltip();
});

function setCutBorder(elemId) {
    var elem = document.getElementById(elemId);
    var progress = document.getElementById('progressing');
    var player = document.getElementById('audio');
    var time1 = document.getElementById('time1');
    var time2 = document.getElementById('time2');
    elem.onmousedown = function (e) {
        if (document.getElementById('mpfile').files[0]) {
            var borderCoords = getCoords(elem);
            var progressCoords = getCoords(progress);
            var shiftX = e.pageX - borderCoords.left;

            document.onmousemove = function (e) {
                var newLeft = e.pageX - shiftX - progressCoords.left;
                if (newLeft < 0) {
                    newLeft = 0;
                }
                var rightBorder = progress.offsetWidth - elem.offsetWidth;
                if (newLeft > rightBorder) {
                    newLeft = rightBorder;
                }
                elem.style.left = newLeft + 'px';
                if (elemId == 'leftCutBorder') {
                    time1.value = Math.floor(newLeft / progress.offsetWidth * player.duration);
                }
                if (elemId == 'rightCutBorder') {
                    time2.value = Math.floor((newLeft + elem.offsetWidth) / progress.offsetWidth * player.duration);
                }
            };

            document.onmouseup = function () {
                if (elemId == 'leftCutBorder') {
                    setTimingFirst();
                }
                else {
                    setTimingSecond();
                }
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        }
    };
}

function getCoords(elem) {
    var coords = elem.getBoundingClientRect();
    return {
        left: coords.left + pageXOffset,
        top: coords.top + pageYOffset
    };
}