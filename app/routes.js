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
  var councils = require('./data/councils.json')
  var planData = require('./data/plans.json')
  var queryKeys = Object.keys(req.body).filter(function(k,v) {
    return req.body[k] !== ''
  })
  var queries = queryKeys.reduce(function(map, k) {
    map[k] = req.body[k];
    return map;
  }, {});

  var plans = planData.filter(function(item) {
    for (var key in queries) {
      if (item[key] === undefined || item[key] != queries[key]) {
        return false;
      }
    }
    return true;
  }).map(function (plan) {
    return [
      {
        html: `<a href="${plan['document-url']}" class='govuk-link'>${plan['name']} </a>`

      },
      {
        html: plan['status']
      },
      {
        html: `<a href="${plan['url']}" class='govuk-link'>${plan['planning-authority']} </a>`
      },
      {
        html: plan['policy-start-date']
      },
      {
        html: plan['policy-end-date']
      },
      {
        html: plan['category']
      },
      {
        html: plan['unit-type']
      },
      {
        html: plan['unit']
      }
    ]
  })

  res.render('v3/plan-data', { councils: councils, plans: plans, queries: queries })
})

router.get("/v3/plan-data", function (req, res) {
  var councils = require('./data/councils.json')
  var planData = require('./data/plans.json')
  var plans = planData.map(function (plan) {
    return [
      {
        html: `<a href='${plan['document-url']}'class='govuk-link'>${plan['name']}</a>`

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
      },
      {
        html: plan['unit-type']
      },
      {
        html: plan['unit']
      }
    ]
  })

  res.render('v3/plan-data#search', { councils: councils, plans: plans, queries: {} });
})

module.exports = router
