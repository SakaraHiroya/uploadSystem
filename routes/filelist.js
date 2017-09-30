var express = require('express');
var router = express.Router();
var finalhandler = require('finalhandler')
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var configFileToken = require('../config');

var index = serveIndex('./upload/', {
    'icons': true
})
var serve = serveStatic('./upload/');

var undefindToken = 'undefind';
var configToken = configFileToken.configToken;

router.get('/', function (req, res, next) {
    
    var tokenid = req.query.token;
    if (tokenid === configToken) {
        var done = finalhandler(req, res)
        serve(req, res, function onNext(err) {
            if (err) return done(err)
            index(req, res, done)
        })
    } else {
        if (tokenid === undefindToken) {
            res.render('filetoken');
        }else{
            res.end(JSON.stringify('403 Forbidden, Token Error'));
        }
    }
})

router.use('/', express.static('./upload/'));
module.exports = router;