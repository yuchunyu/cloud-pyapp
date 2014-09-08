var express = require('express');
var router = express.Router();
var pagePyApp = require('./pagePyApp'); 

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});
router.get('/opus/:id', pagePyApp.gotoOpus);
router.post('/opus/insertApp', pagePyApp.insertApp);
router.post('/opus/postAnswer', pagePyApp.updateApp);

module.exports = router;
