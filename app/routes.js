const express = require('express')
const router = express.Router()
const utils = require('./utils')

// Add your routes here - above the module.exports line

router.get("/v2/organisation", function (req, res) {
  utils.getCouncils(function(councils) {
    res.render('v2/organisation', { councils: councils });
  })
})

module.exports = router
