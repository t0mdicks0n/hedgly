var express = require('express');
var bodyParser = require('body-parser');
var links = require('../database-mongo');
var fetcher = require('./workers/fetcher.js');
var scrape = fetcher.scraper;
var helpers = require('./utils');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/search', function (req, res) {
  res.end();
  console.log(req.body.searchUrl + ' was searched for by the user');
  scrape(req.body.searchUrl, function(result) {
    helpers.writeToDB(result, req.body.searchUrl.split('.')[1]);
  });
});

app.get('/links/:website/', function (req, res) {
  console.log('get ', req.params)
  var getQuery = {'website': req.params.website};

  if (req.params.website === 'total') {
    getQuery = {};
  }

  links.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(helpers.formatTimestamp(data));
    }
  }, getQuery);
});

app.get('/websites', function (req, res) {
  console.log('get ', req.params)

  links.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      variationOfWebsites = [];
      for (var i = 0; i < data.length; i++) {
        if (variationOfWebsites.indexOf(data[i].website) === -1) {
          variationOfWebsites.push(data[i].website);
        }
      }
      res.send(variationOfWebsites);
    }
  }, {});
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});