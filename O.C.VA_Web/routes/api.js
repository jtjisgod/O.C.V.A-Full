var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
var fs = require('fs');
var sha256 = require('sha256');
var request = require('request');

/* GET users listing. */
router.get('/checkUrl', function (req, res, next) {
  try {
    // console.log(req.query);
    var url = req.query.url;
    url = url.toString().replace("https://", "").replace("http://", "");
    if (!url) {
      res.status(403).send({
        code: 403,
        message: "Please enter Url."
      });
      return;
    }
    else if (url.indexOf("/") >= 0) {

      res.status(403).send({
        code: 403,
        message: "Url not allowed."
      });
      return;
    }
    else if (url.indexOf(".") < 0) {

      res.status(403).send({
        code: 403,
        message: "Invalid url."
      });
      return;
    }
    else {
      req.session.requestUrl = "http://" + url;
      req.session.checkSum = sha256(url + new Date());
      res.status(200).send({
        code: 200,
        message: "Valid url."
      });
      return;
    }

  }
  catch (e) {
    next(e);
  }


});

router.get("/checkSum", function (req, res, next) {
  console.log(req.session.requestUrl + '/ocva.txt?time=' + Date.now());
  request.get({
    url: req.session.requestUrl + '/ocva.txt?time=' + Date.now()
    // url: req.protocol + '://secure.c.i' + '/api/user/profile',
    // headers: req.headers
  }, function (err, res2, body) {
    console.log(body);

    try {
      // res.render("www/" + filename, { title: 'CICERON', filename: filename, user: JSON.parse(body), url: urlencode(fullUrl), req: req, param });
      if (body == req.session.checkSum) {
        res.status(200).send({
          code: "200",
          message: "success"
        });

        // console.log(req.protocol + "://" + global.apiUrl + '/sethex.php?url=' + req.session.requestUrl + "&hex=" + req.session.checkSum);

        // request({ url: req.protocol + "://" + global.apiUrl + '/sethex.php?url=' + req.session.requestUrl + "&hex=" + req.session.checkSum },
        //   function (err, res3, body2) {
        //     console.log(body2);
        //     if (JSON.parse(body2).status) {
        //       res.status(200).send({
        //         code: "200",
        //         message: "success"
        //       });
        //     }
        //     else {
        //       res.status(403).send({
        //         code: "403",
        //         message: "error"
        //       });
        //     }
        //   }
        // );
      }
      else {
        res.status(403).send({
          code: "403",
          message: "error"
        });
      }
    } catch (error) {
      next(error);
      // res.render("www/" + filename, { title: 'CICERON', filename: filename, user: null, url: urlencode(fullUrl), req: req, param });
    }
  });
});

router.get("/attack", function (req, res, next) {
  var hex = req.session.checkSum;
  var url = req.session.requestUrl;
  var type = req.query.type;

  request({ url: req.protocol + "://" + global.apiUrl + '/attack.php?url=' + url + "&hex=" + hex + "&type=" + type },
    function (err, res3, body2) {
      req.session.percent = 0;
      // res.send(body2);
      res.status(200).send({
        code: "200",
        message: "success"
      });

    }
  );

});

router.get("/progress", function (req, res, next) {
  var hex = req.session.checkSum;

  request({ url: req.protocol + "://" + global.apiUrl + '/progress.php?hex=' + hex },
    function (err, res3, body2) {
      req.session.percent += Math.floor((Math.random() * 10) + 1);

      res.status(200).send({
        status: req.session.percent >= 100 ? 2 : 1,
        percent: req.session.percent >= 100 ? 100 : req.session.percent
      });

      // res.send(body2);

    }
  );

});

router.get("/getInfo", function (req, res, next) {
  var hex = req.session.checkSum;

  request({ url: req.protocol + "://" + global.apiUrl + '/getInfo.php?hex=' + hex },
    function (err, res3, body2) {

      res.send({info: body2});

      // res.status(200).send({
      //   status: req.session.percent >= 100 ? 2 : 1,
      //   percent: req.session.percent
      // });
    }
  );

});



router.get("/select", function (req, res, next) {
  console.log(req.query.type);
  try {
    req.session.type = req.query.type;
    res.send({
      code: "200",
      message: "success"
    });

  }
  catch (e) {
    res.status(403).send({
      code: "403",
      message: "error"
    });
  }
})

module.exports = router;
