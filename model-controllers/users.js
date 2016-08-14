var userSchema = require('../models/users');
var gameController = require('./games');
var notificationController = require('./notifications');
var _ = require('underscore');

exports.getUserByEmail = function(email, cb){
  userSchema.findOne({email : email}, function(err, user){
    if(err) return cb(err);
    else {
    	return cb(null, user);
    }
  });
};

exports.getUserById = function(userId, cb){
	userSchema.findById(userId, function(err, user){
		if(err) return cb(err);
		else return cb(null, user);
	});
};



exports.getAllUsers = function(cb){
	userSchema.find({}, function(err, users){
		if(err) return cb(err);
		else{
			return cb(null, users);
		}
	});
};

exports.getFriends = function(me, cb){
	var tempGamesArray = [];
	gameController.getGamesFrom(me, function(err, games){
		if(err) return cb(err);
		else{
			games.foreach(function(game){
			tempGamesArray.push(game.players);
			});

			tempGamesArray = _.uniq(tempGamesArray);

			return cb(null, _.filter(tempGamesArray, function(player){ return player !== me }));
		}
	});
};

exports.changePrivacySetting = function(email, cb){
	userSchema.findOne({email : email}, function(err, user){
		console.log(user);
		if(user.canOthersViewMyProfile){
			userSchema.update({ email : user.email}, {canOthersViewMyProfile : "false"}, cb);
		}else{
			userSchema.update({ email : user.email}, {canOthersViewMyProfile : "true"}, cb);
		}
	})
};

exports.getGamesWhereIdParticipates = function(userId, cb){
	gameController.getGamesFrom(userId, function(err, games){
		if(!err){
			return cb(null, games);
		}
		else{
			return cb(err, null);
		}
	});
};

exports.addNotification = function(userId, notification, cb){
	notificationController.create(notification, function(err, notification){
		if(!err){
			userSchema.findByIdAndUpdate(
		    userId,
		    {$push: {"notifications": notification}},
	    	{safe: true, upsert: true},
		    function(err, model) {
        		console.log(err);	
			});
			return cb(null, notification);
		}
		else{
			return cb(err, null);
		}
	});
};