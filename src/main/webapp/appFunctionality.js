var time1, time2;
var user = 'Гість';

function enterUser() {
    var login = document.getElementById('login').value;
    if (login === '') {
        user = 'Гість';
    }
    user = login;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function downloadSong() {
    var file = document.getElementById('mpfile').files[0];
    if (file) {
        var player = document.getElementById('audio');
        var usersLog = document.getElementById('usersLog');
        var fileUrl = URL.createObjectURL(file);
        player.setAttribute('src', fileUrl);
        var time = new Date();
        usersLog.value = usersLog.value + time.getHours() + ':' + time.getMinutes() + ' ' + user + ' завантажив файл ' + file.name + '\n';
    }
    document.getElementById('time1').value = '';
    document.getElementById('time2').value = '';
}

function setTimingFirst() {
    var player = document.getElementById('audio');
    var tempTime1 = document.getElementById('time1');
    var mpfile = document.getElementById('mpfile');
    if (mpfile.value !== "") {
        if (tempTime1.value !== '') {
            tempTime1 = +tempTime1.value;
            var leftBorder = document.getElementById('leftCutBorder');
            if (tempTime1 < 0 || tempTime1 > player.duration || !isNumeric(tempTime1) || (time2 !== undefined && tempTime1 > time2)) {
                document.getElementById('errorMessage').innerHTML = 'Ліва часова межа невірна!';
                document.getElementById('time1').value = '';
                time1 = undefined;
                leftBorder.style.left = 0 + 'px';
            }
            else {
                time1 = tempTime1;
                var progress = document.getElementById('progressing');
                leftBorder.style.left = time1 / player.duration * progress.offsetWidth + 'px';
            }
        }
    }
    else {
        document.getElementById('errorMessage').innerHTML = 'Загузіть файл!';
        tempTime1.value = '';
    }
}

function setTimingSecond() {
    var player = document.getElementById('audio');
    var tempTime2 = document.getElementById('time2');
    var mpfile = document.getElementById('mpfile');
    if (mpfile.value !== "") {
        if (tempTime2.value !== '') {
            tempTime2 = +tempTime2.value;
            var rightBorder = document.getElementById('rightCutBorder');
            var progress = document.getElementById('progressing');
            if (!isNumeric(tempTime2) || tempTime2 < 0 || tempTime2 > player.duration || tempTime2 < time1) {
                document.getElementById('errorMessage').innerHTML = 'Права часова межа невірна!';
                document.getElementById('time2').value = '';
                rightBorder.style.left = progress.offsetWidth - rightBorder.offsetWidth + 'px';
            }
            else {
                time2 = tempTime2;
                rightBorder.style.left = (time2 / player.duration * progress.offsetWidth) + 'px';
            }
        }
    }
    else {
        document.getElementById('errorMessage').innerHTML = 'Загрузіть файл!';
        tempTime2.value = '';
    }
}

function checkBounds() {
    var player = document.getElementById('audio');
    if (player.currentTime < time1 || player.currentTime > time2) {
        player.currentTime = time1;
        player.pause();
    }
}

function returnFullVersion() {
    if (document.getElementById('mpfile').value === "") {
        document.getElementById('errorMessage').innerHTML = 'Файл не вибрано!';
    }
    else {
        var player = document.getElementById('audio');
        player.pause();
        player.currentTime = 0;
        player.removeAttribute('ontimeupdate');
        player.setAttribute('ontimeupdate', 'showTime(); showProgress()');
        document.getElementById('errorMessage').innerHTML = '';
    }
}

function cutSong() {
    var timeElem1 = document.getElementById('time1');
    var timeElem2 = document.getElementById('time2');
    if (document.getElementById('mpfile').value === "") {
        document.getElementById('errorMessage').innerHTML = 'Файл не вибрано!';
    }
    else {
        if ((time1 !== undefined && time2 !== undefined) && (timeElem1.value !== "" && timeElem2.value !== "")) {
            var player = document.getElementById('audio');
            player.pause();
            player.currentTime = time1;
            player.removeAttribute('ontimeupdate');
            player.setAttribute('ontimeupdate', 'showTime(); showProgress(); checkBounds()');
            document.getElementById('errorMessage').innerHTML = '';
        }
        else {
            document.getElementById('errorMessage').innerHTML = 'Відсутня або невірна одна з часових меж!';
            if (time1 === undefined) {
                timeElem1.value = '';
            }
            if (time2 === undefined) {
                timeElem2.value = '';
            }
        }
    }
}

function writeLogFile(log) {
    var xml = new XMLHttpRequest();
    var url = 'http://localhost:63342/DimasTask/src/main/resources/log.txt';
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            alert(xml.responseText);
        }
        else alert('fuck you');
    };
    xml.open("GET", url, true);
    xml.send();
}