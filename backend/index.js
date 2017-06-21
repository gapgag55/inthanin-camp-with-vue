exports.index = function (req, res) {
  res.render('index');
}

exports.admin = function(req, res) {
  res.render('admin');
}

exports.people = function(req, res) {
  res.render('people');
}