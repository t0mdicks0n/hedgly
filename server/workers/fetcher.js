var cheerio = require('cheerio');
var request = require('request');

var brokenLinks = [];
var testedLinks = {};

function fetcher (userUrl, callback, callingWebsite) {
	var depth = 0;
	var crawledNum = 0;

	var origCaller = userUrl;

	function recursiveCrawler (url, callback, callingWebsite) {
		requestWebsite(url, function(links) {
			parseLinks(links, function(extLinks, intLinks) {
				if (depth < 10) {
					depth++;
					for (var i = 0; i < extLinks.length; i++) {
						if (extLinks[i] in testedLinks) {
							continue;
						} else {
							if (isPath(extLinks[i])) {
								recursiveCrawler(callingWebsite + extLinks[i], callback, url);
								testedLinks[extLinks[i]] = extLinks[i];
							} else {
								if (callingWebsite.split('').slice(0, origCaller.length).join('') === origCaller) {
									recursiveCrawler(extLinks[i], callback, url);
								}
							}
						}
					}
				} else {
					return callback(brokenLinks);
				}
			});
		});
	}

	recursiveCrawler(userUrl, callback, userUrl);

}

// Helper functions, potentially good to break out
function requestWebsite (url1, callback) {
	request(url1, function(error, response, body) {
		console.log('Requesting ' + url1);
		if (response && response.statusCode === 200) {
			var $ = cheerio.load(body);
			var links = $('a');
			callback(links);
		} else if (response && response.statusCode === 404) {			
			brokenLinks.push(url1);
			console.log('Found a broken link! ' + url1);
		} else {
			// console.log('I did not return a response ', url1);
			
			// See if you can do something with these values.
			// www.playahead.se comes up here for example
		}
	});
}

function parseLinks (linkObj, callback) {
	var externalLinks = [];
	var internalLinks = [];
	for (var $linkElements in linkObj) {
		if (linkObj[$linkElements].attribs && ( isWebsite(linkObj[$linkElements].attribs.href) || isPath(linkObj[$linkElements].attribs.href) )){
			externalLinks.push(linkObj[$linkElements].attribs.href);
		}
	}
	callback(externalLinks, internalLinks);
}

function isWebsite (link) {
	var re = new RegExp('^(http|https)://', 'i');
	if(re.test(link)) {
		return true;
	} else {
		return false;
	}
}

function isPath (link) {
	var re = new RegExp('^(/[^/ ]*)+/?$', 'i');
	if(re.test(link)) {
		return true;
	} else {
		return false;
	}
}

module.exports.scraper = fetcher;