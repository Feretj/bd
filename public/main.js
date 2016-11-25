
var uid = getCookie('uid') || findGetParameter('uid');

if (!getCookie('uid')) {
  setCookie('uid', uid, {expires: 1e10})
}

var user = {};
var users = {};

get('/user', function (data) {
  user = JSON.parse(data);
  document.getElementById('username').innerHTML = user.name;
  if (user.status == '3') {
    document.getElementById('buttons').classList.add("hidden");
    document.getElementById('no').classList.remove("hidden");
  } else if (user.status != '0') {
    document.getElementById('buttons').classList.add("hidden");
    document.getElementById('yes').classList.remove("hidden");
  }
  document.querySelectorAll('.option').forEach(function (btn) {
    btn.onclick = poll;
  });
  document.querySelectorAll('.change').forEach(function (btn) {
    btn.onclick = change;
  });
}, {uid: uid});

get('/users', function (data) {
  users = JSON.parse(data);
  Object.keys(users).map(function (key) {
    var html = '<a class="user" href ="' + users[key].vk + '">' + users[key].name + ' ' + users[key].surname + '</a><br />';
    if (users[key].status == 0) {
      document.getElementById('col0').innerHTML += html;
    } else if (users[key].status == 1) {
      document.getElementById('col1').innerHTML += html;
    } else if (users[key].status == 2) {
      document.getElementById('col2').innerHTML += html;
    } else if (users[key].status == 3) {
      document.getElementById('col3').innerHTML += html;
    } else {
      console.log("Error: bad user:");
      console.log(users[key]);
    }
  });
}, {uid: uid});

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

function get(url, callback, data) {
  var params = '?'
  if (data) {
    Object.keys(data).map(function (key) { params += key + '=' + data[key] + '&'; });
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url + params, true);
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

function post(url, callback, data) {
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(json);
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

function poll(event) {
  post('/poll', function(data) {
    console.log(data);
    document.getElementById('buttons').classList.add("hidden");
    if (event.target.id == 'n') {
      document.getElementById('no').classList.remove("hidden");
    } else {
      document.getElementById('yes').classList.remove("hidden");
    }
  }, {uid: uid, status: event.target.id});
}

function change() {
  post('/poll', function(data) {
    console.log(data);
    document.getElementById('yes').classList.add("hidden");
    document.getElementById('no').classList.add("hidden");
    document.getElementById('buttons').classList.remove("hidden");
  }, {uid: uid, status: 0});
}
