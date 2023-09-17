var express = require('express');
var router = express.Router();
const getcount = require('../components/getcount')
const newcount = require('../components/newcount')
/* GET home page. */
router.get('/', function(req, res, next) {


  if (process.env.NODE_ENV === "development"){
    res.status(200).json(
      {
        count: "prod"
      }
    );
  } else{
      res.status(200).json(
        {
          "count": r
        }
      )
  }

});

module.exports = router;
