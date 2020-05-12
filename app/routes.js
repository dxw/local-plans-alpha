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
  var planData = require('./data/plans.json')
  var plans = planData.map(function (plan) {
    return [
      {
        html: plan['name']
      },
      {
        html: plan['status']
      },
      {
        html: "<a href='#'>plan['planning-authority']</a>"
      },
      {
        html: plan['policy-start-date']
      },
      {
        html: plan['policy-end-date']
      }
    ]
  })

  res.render('v3/plan-data', { councils: councils, plans: plans });
})

module.exports = router
