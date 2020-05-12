const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get("/v2/organisation", function (req, res) {
  var councils = require('./data/councils.json')
  res.render('v2/organisation', { councils: councils });
})

router.get("/v3/organisation", function (req, res) {
  var councils = require('./data/councils.json')
  res.render('v3/organisation', { councils: councils });
})

router.get("/v3/plan-data", function (req, res) {
  var councils = require('./data/councils.json')
  res.render('v3/plan-data', { councils: councils });
})

router.get("/v3/plan-data", function (req, res) {
  var plans = require('./data/plans.json')
  res.render('v3/plan-data', { plans: plans });
})

module.exports = router
