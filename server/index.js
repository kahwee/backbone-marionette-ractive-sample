var express = require('express');
var glob = require('glob');
var fs = require('fs');
var async = require('async');
var app = express();
var path = require('path');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
var clientPath = path.resolve(__dirname + '/../client');
app.set('views', clientPath);
app.use(express.static(clientPath));

app.get('/', function(req, res) {

	glob(clientPath + '/ractive/**/_*.ractive', function(err, filePaths) {
		async.map(filePaths, function(filePath, cb) {
			var contents = fs.readFileSync(filePath);
			var name = path.basename(filePath, '.ractive');
			cb(null, {
				name: name.substr(1),
				contents: encodeURIComponent(contents.toString())
			});
		}, function(err, ractiveTemplates) {
			res.render('index', {
				ractiveTemplates: ractiveTemplates
			});
		});
	});
});

app.listen(3000);