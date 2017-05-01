var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/hedgly');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var linkSchema = mongoose.Schema({
  link: {type: String, unique: true},
  website: {type: String, unique: false},
  created_at: {type: String, unique: false}
});

linkSchema.plugin(uniqueValidator);
var ScrapedLink = mongoose.model('ScrapedLink', linkSchema);

var inputLinks = function(inputLink, inputWebsite) {
  var d = new Date();
  var dataInput = new ScrapedLink({
    link: inputLink, 
    website: inputWebsite,
    created_at: d
  });

  dataInput.save(function (err) {
    if (err) {
      // return console.log(err);
    }
  });
}

var selectAll = function(callback, query) {
  if (query === undefined) {
    query = {};
  }
  ScrapedLink.find(query, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.inputLinks = inputLinks;
module.exports.selectAll = selectAll;