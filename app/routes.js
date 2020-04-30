const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get("/v2/organisation", function (req, res) {
  var councils = require('./data/councils.json')
  res.render('v2/organisation', { councils: councils });
})

module.exports = router
