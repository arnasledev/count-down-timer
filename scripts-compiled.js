'use strict';

var cookieName = 'countDownTimer_v001';
var countDownTime = 60 * 5; // 5 minutes
var cookieExpTime = 30; // in days

var currentUserCookie = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
var timestampNow = Math.floor(new Date() / 1000);
var timeLeft = countDownTime;

var variablesToShow = { days: false, hours: true, minutes: true, seconds: true };

if (currentUserCookie) {
    var cookieValue = currentUserCookie[2];
    if (cookieValue) {
        timeLeft = countDownTime - (timestampNow - cookieValue);
    } else {
        initNewCountDownCookie(cookieExpTime);
    }
} else {
    initNewCountDownCookie(cookieExpTime);
}

function initNewCountDownCookie(expire) {
    var expireTime = new Date();
    expireTime.setTime(expireTime.getTime() + expire * 24 * 60 * 60 * 1000);
    var cookieExpire = " expires=" + expireTime.toUTCString();

    document.cookie = cookieName + '=' + timestampNow + '; ' + cookieExpire + '; path=/';
}

function getCountDownValue() {
    if (timeLeft > 0) {
        var timers = {
            days: Math.floor(timeLeft / (60 * 60 * 24)),
            hours: Math.floor(timeLeft % (60 * 60 * 24) / (60 * 60)),
            minutes: Math.floor(timeLeft % (60 * 60) / 60),
            seconds: Math.floor(timeLeft % 60)
        };

        var _template = '';
        Object.keys(variablesToShow).map(function (value) {
            if (variablesToShow[value]) {
                var ending = value === Object.keys(variablesToShow)[Object.keys(variablesToShow).length - 1] ? '' : ':';
                _template += '<span class="countDownTimer_' + value + '">' + timers[value] + ending + '</span>';
            }
        });

        timeLeft -= 1;
        writeToNode(_template);
        return setTimeout(function () {
            return getCountDownValue(timeLeft);
        }, 1000);
    }

    var template = '';
    Object.keys(variablesToShow).map(function (value) {
        if (variablesToShow[value]) {
            var ending = value === Object.keys(variablesToShow)[Object.keys(variablesToShow).length - 1] ? '' : ':';
            template += '<span class="countDownTimer_' + value + '">0' + ending + '</span>';
        }
    });

    alert('Time is up!');
    return writeToNode(template);
}

function startNewSession() {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    timeLeft = countDownTime;
    return initNewCountDownCookie(cookieExpTime);
}

function writeToNode(template) {
    document.getElementById('countDownTimer').innerHTML = template;
}

if (timeLeft > 0) {
    getCountDownValue(timeLeft);
} else {
    startNewSession();
    getCountDownValue(timeLeft);
}