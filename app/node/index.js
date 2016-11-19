var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/build/index.html');
	res.sendFile(__dirname + '/auth.html');			//	MUST REMOVE !!!
    //res.send('It is just API Server...');
});

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, accept, authorization');
    next();
});

//------------------------------------------------------------------------
var jwt = require('jsonwebtoken');
var secret = 'f3oLigPb3vGCg9lgL0Bs97wySTCCuvYdOZg9zqTY32o';

var token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });

setInterval(function(){
	token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });
	}, 1000 * 60 * 60);

app.get('/api/auth', function(req, res) {
	return res.send(token);
});

//------------------------------------------------------------------------
app.post('/api/login', function(req, res) {
	var UsersModel = require('./mongo').UsersModel;
    UsersModel.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) {
            res.send({error: err.message});
        } 
		if (user) {
			if (user.pass == req.body.pass) {
				//console.log(user);
				res.send(token);
			} else {
				res.status(403).send({ 
					success: false, 
					message: 'No such pass.' 
				});
			}
		} else {
			res.status(403).send({ 
				success: false, 
				message: 'No such user.' 
			});
		}

    });
});

//------------------------------------------------------------------------
app.get('/api/users/get', function(req, res) {
	var agent = req.headers.authorization;
	//console.log('agent - ' + agent);
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			//console.log(decoded);
			var UsersModel = require('./mongo').UsersModel;
			return UsersModel.find(function (err, users) {
				if (!err) {
					return res.send(users);
				} else {
					res.statusCode = 500;
					return res.send({error: 'Server error'});
				}
			});
		}
	});
});

//------------------------------------------------------------------------
app.get('/api/audit/get', function(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var AuditModel = require('./mongo').AuditModel;
			return AuditModel.find(function (err, users) {
				if (!err) {
					return res.send(users);
				} else {
					res.statusCode = 500;
					return res.send({error: 'Server error'});
				}
			}).sort({date: -1}); 
		}
	});
});

app.post('/api/audit/add', function(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var AuditModel = require('./mongo').AuditModel;
			var date = new Date().toJSON().slice(0, 10);
			var time = new Date().toTimeString().slice(0, 8);
			AuditModel.create({
					id: req.body.id,
					name: req.body.name,
					date: date + ' ' + time,
					ip: req.ip,
					description: req.body.description
				},
				function (err, audit) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send(audit);
					}
				});
		}
	});	
});

//------------------------------------------------------------------------
app.get('/api/items/get', function(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var ItemsModel = require('./mongo').ItemsModel;
			return ItemsModel.find(function (err, users) {
				if (!err) {
					return res.send(users);
				} else {
					res.statusCode = 500;
					return res.send({error: 'Server error'});
				}
			}).limit(1000);
		}
	});
});

app.get('/api/items/findByName/:name', function(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var ItemsModel = require('./mongo').ItemsModel;
			ItemsModel.find({
				"name": new RegExp(req.params.name, 'i')
			}, function (err, items) {
				if (err) {
					res.send({error: err.message});
				} else {
					console.log('mongo - ' + items.length);
					res.send(items);
				}
			});
		}
	});
});

app.get('/api/items/findByPhone/:name', function(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var ItemsModel = require('./mongo').ItemsModel;
			ItemsModel.find({
				"phone": new RegExp(req.params.name)
			}, function (err, items) {
				if (err) {
					res.send({error: err.message});
				} else {
					console.log('mongo - ' + items.length);
					res.send(items);
				}
			});
		}
	});
});