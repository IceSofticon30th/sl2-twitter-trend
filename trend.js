var Twitter = require('twitter');
var express = require('express');

var client = new Twitter(require('./keys.json'));

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/trend', function (req, res) {
  var keyword = req.query.keyword;
  
  console.log(keyword);
  
  res.end(keyword);
});

app.listen(process.env.PORT || 3000);

function searchTrend(callback) {
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log(tweets);
    }
    if (typeof callback == 'function') callback();
  });
}

var params = {q: ''};
client.get('search/tweets', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
  if (typeof callback == 'function') callback();
});