var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var fs              = require('fs');
var users           = require(path.join(__dirname, 'data/users.json'));
var bodyParser      = require('body-parser');

function forSend(obj) {
  var res = {};
  Object.keys(obj).map(function (key) { res[obj[key]['id']] = obj[key]; });
  return res;
}

function saveUsers() {
  fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(users), 'utf8', Function());
}

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  var uid = req.cookies.uid || req.query.uid;
  if (uid && uid in users) {
    res.sendFile(path.join(__dirname, 'html/index.html'));
  } else {
    res.send("Please use your link");
  }
});

app.get('/user', function (req, res) {
  var uid = req.cookies.uid || req.query.uid;
  if (uid && uid in users) {
    res.json(users[uid]);
  } else {
    res.status(400).send('no such user');
  }
});

app.get('/users', function (req, res) {
  var uid = req.cookies.uid || req.query.uid;
  if (uid && uid in users) {
    res.json(forSend(users));
  } else {
    res.status(400).send('no such user');
  }
});

app.post('/poll', function (req, res) {
  var uid = req.cookies.uid || req.body.uid;
  if (uid && uid in users) {
    if (req.body.status == 'y') {
      users[uid].status = 1;
      saveUsers();
      res.send("success");
    } else if (req.body.status == 'n') {
      users[uid].status = 3;
      saveUsers();
      res.send("success");
    } else if (req.body.status == 'm') {
      users[uid].status = 2;
      saveUsers();
      res.send("success");
    } else if (req.body.status == '0') {
      users[uid].status = 0;
      saveUsers();
      res.send("success");
    } else {
      res.status(400).send('no such status');
    }

  } else {
    res.status(400).send('no such user');
  }
});

app.listen(80, function(){
  console.log('Express server listening on port 80');
});
