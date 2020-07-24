var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var data = {}

router.post('/generateId', function(req, res, next){
  let id = req.body.id;
  console.log(req.body)
  res.status(201).json({id : id});
})
router.get('/ninja', function(req, res, next){
  res.status(201).json({})
})
module.exports = router;
 