const express = require('express');
const router = express.Router();

/* GET home route. */
router.get('/', function(req, res, next) {
  res.json({message: "root route working", data:[]})
});

module.exports = router;
