var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
var url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/scan');
  // res.render('index', { title: 'Express' });
});

router.get('/scan', function (req, res, next) {
  viewFile("main", req, res);
});

router.get('/main', function (req, res, next) {
  res.redirect('/scan');
  // viewFile("main", req, res);
});

router.get('/select', function (req, res, next) {
  viewFile("select", req, res);
});

router.get('/prove', function (req, res, next) {
  viewFile("prove", req, res);
});

router.get('/progress', function (req, res, next) {
  viewFile("progress", req, res);
});


var viewFile = function (filename, req, res, param) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.path;

  res.render(filename,
    {
      req: req,
      filename: filename,
      url: fullUrl,
      encodedUrl: urlencode(fullUrl),
      param
    }
  );

}

module.exports = router;
