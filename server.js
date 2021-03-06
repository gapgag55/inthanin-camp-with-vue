var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    routes         = require('./backend')

var Firebase = require('firebase')

var config = {
    apiKey: "AIzaSyDPeOdjEBQpMlSwcswHdjm7KFEysvog8N0",
    authDomain: "inthanincamp.firebaseapp.com",
    databaseURL: "https://inthanincamp.firebaseio.com",
    projectId: "inthanincamp",
    storageBucket: "inthanincamp.appspot.com",
    messagingSenderId: "7627553732"
  };

var firebaseApp = Firebase.initializeApp(config)
var db = firebaseApp.database()

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));


var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.post('/students', function(req, res) {
  var students = db.ref('student')
  students.push(
    req.body
  )

  res.send({okay: true})
})

app.get('/admin', routes.admin);
app.post('/admin', function(req, res) {
  firebaseApp.auth().signInWithEmailAndPassword(req.body.username, req.body.password)
    .catch(function(error) {
        res.redirect('admin')
    })
    .then(function(user) {
      if( user ) {
        res.redirect('people')
      }
    });
})

app.get('/people', isAuthenticated, routes.people)
app.get('/students', function(req, res) {

  var students = db.ref('student').once('value', (snapshot) => {
    res.send({students: snapshot.val()})
  });
})

app.post('/passStudent', function(req, res) {
  console.log('student/' + req.body.key + '/pass');
  var students = db.ref('student/' + req.body.key).update({ pass: !req.body.pass})
})

function isAuthenticated(req, res, next) {
  var user = firebaseApp.auth().currentUser;
  if (user !== null) {
    next();
  } else {
    res.redirect('/admin');
  }
}

app.listen(process.env.PORT);
console.log('Magic happens on port ' + process.env.PORT);