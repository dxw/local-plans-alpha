const https = require('https')

var utils = {
  getCouncils: function(callback) {
    url = "https://local-authority-eng.register.gov.uk/records.json?page-size=5000"
    https.get(url, function (http_res) {
      var bodyChunks = [];
      return http_res.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        var json = JSON.parse(body);
        var councils = Object.keys(json).map(function(key) {
          return json[key].item[0]
        }).sort(function(a, b) {
          let comparison = 0;
          if (a["official-name"] > b["official-name"]) {
            comparison = 1;
          } else if (a["official-name"] < b["official-name"]) {
            comparison = -1;
          }
          return comparison;
        });
        callback(councils);
      })
    })
  }
}

module.exports = utils

