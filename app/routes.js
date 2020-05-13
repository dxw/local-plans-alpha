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

router.post("/v3/plan-data", function (req, res) {
  var planData = require('./data/plans.json')
  var plan = planData.find(function(p) { 
    p["status"] == req.query["status-select"]
  })
  res.render('plan-data', { plan: plan })
})

router.get("/v3/plan-data", function (req, res) {
  var councils = require('./data/councils.json')
  var planData = require('./data/plans.json')
  var plans = planData.map(function (plan) {
    return [
      {
        html: `<a href='${plan['name']}'class='govuk-link'>${plan['name']}</a>`

      },
      {
        html: plan['status']
      },
      {
        html: `<a href='${plan['url']}'class='govuk-link'>${plan['planning-authority']}</a>`
      },
      {
        html: plan['policy-start-date']
      },
      {
        html: plan['policy-end-date']
      },
      {
        html: plan['category']
      }
    ]
  })

  res.render('v3/plan-data', { councils: councils, plans: plans });
})

module.exports = router
