var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var fs              = require('fs');
var users           = require(path.join(__dirname, 'data/users.json'));

function forSend(obj) {
  var res = {};
  Object.keys(obj).map(function (key) { res[obj[key]['id']] = obj[key]; });
  return res;
}

function saveUsers() {
  fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(users), 'utf8', Function());
}

var app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  var uid = req.cookies.uid || req.query.uid;
  if (uid && uid in users) {
    res.sendFile(path.join(__dirname, 'html/index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'html/noinvite.html'))
  }
});
app.get('/user', function (req, res) {
  var uid = req.cookies.uid || req.query.uid;
  if (uid && uid in users) {
    res.json(users[uid]);
;  } else {
    res.status(404).json({error: 'no such user'});
  }
});

app.listen(1337, function(){
  console.log('Express server listening on port 1337');
});
