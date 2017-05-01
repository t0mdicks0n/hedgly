var database = require('../database-mongo');
var dbInput = database.inputLinks;
var moment = require('moment')

var writeToDB = function(listOfLinks, givenUrl) {
	listOfLinks.forEach(function(link, index, array) {
		dbInput(link, givenUrl);
	})
};

var formatTimestamp = function(data, callback) {
	data.forEach(function(linkObj, index, array) {
		linkObj.created_at = String(moment(linkObj.created_at).fromNow());
	});
	return data;
}

module.exports.writeToDB = writeToDB;
module.exports.formatTimestamp = formatTimestamp;
