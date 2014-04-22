var express = require('express');
var app = express();
var path = require('path');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
var clientPath = path.resolve(__dirname + '/../client');
app.set('views', clientPath);
app.use(express.static(clientPath));

app.get('/', function(req, res) {
	res.render('index', {
		's': 's'
	});
});

app.listen(3000);