
var uid = getCookie('uid') || findGetParameter('uid');

if (!getCookie('uid')) {
  setCookie('uid', uid, {expires: 1e10})
}

var user = '';

get('/user', function (data) {
  user = JSON.parse(data);
  document.getElementById('username').innerHTML = user.name;
});

countDown = new NixieDisplay();
countDown.id = 'countdown';
countDown.charCount = 8;
countDown.extraGapsWidths[3] = 20;
countDown.extraGapsWidths[5] = 20;
countDown.extraGapsWidths[1] = 20;
countDown.urlCharsetImage = '/zm1082_l1_09bdm_62x150_8b.png';
countDown.charWidth = 62;
countDown.charHeight = 150;
countDown.extraGapsWidths[3] = 20;
countDown.extraGapsWidths[5] = 20;
countDown.charGapWidth = 0;
document.getElementById(countDown.id).parentNode.style.background = "white";
document.getElementById(countDown.id).parentNode.style.border = "none";
countDown.init();
var bdd = new Date("12/03/2016 17:00");
startTime();

function updateTime() {
  var timeDiff = bdd.getTime() - new Date().getTime();
  var days = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
  timeDiff -= days * (1000 * 3600 * 24);
  var hours = Math.ceil(timeDiff / (1000 * 3600)) - 1;
  timeDiff -= hours * (1000 * 3600);
  var minutes = Math.ceil(timeDiff / (1000 * 60)) - 1;
  timeDiff -= minutes * (1000 * 60);
  var seconds = Math.ceil(timeDiff / (1000)) - 1;
  countDown.setText(timeToStirng(days) +
                     timeToStirng(hours) +
                     timeToStirng(minutes) +
                     timeToStirng(seconds));
}
function timeToStirng(time) {
  if (time < 10) {
    return '0' + time.toString();
  }
  return time.toString();
}
function startTime() {
  updateTime();
  setTimeout(startTime, 1000);
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function get(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      callback(xhr.responseText);
      delete xhr;
    }
  }
}
