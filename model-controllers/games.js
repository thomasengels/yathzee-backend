var gameSchema = require('../models/game');
var userController = require('./users');
var _ = require('underscore');
var email = require('../middleware/mailService');
var pusherService = require('../middleware/pusherService');

exports.getAllGames = function(cb){
	gameSchema.find({}, function(err, games){
		if(err) return cb(err);
		else{
			return cb(null, games);
		}
	});
};

exports.getGamesFrom = function(me, cb){
	gameSchema.find({players : me}, function(err, games){
		if(err) return cb(err);
		else{
			return cb(null, games);
		}
	});
};

exports.create = function(gameToCreate, cb){
	var game = new gameSchema({
		players : gameToCreate
	});

	
	email.sendMail(gameToCreate[0], gameToCreate[1]);

	
	game.save(game, cb);
};

exports.getGameById = function(gameId, cb){
	gameSchema.findById(gameId, function(err, game){
		if(err) return cb(err);
		else return cb(null, game);
	});
};

exports.updatedScore = function(gameId, scoresOfGame, cb){
	console.log("in controller");
	gameSchema.findByIdAndUpdate({_id : gameId}, { scores : scoresOfGame }, function(err, game){
		if(err) throw cb(err);
		else {
			for(var i = 0; i < game.players.lenght; i++){
				game.scores[i] = scoresOfGame[i];
			}
			calculateScores(scoresOfGame);
			pusherService.sendMoveDoneInGameNotification(game);
			console.log("send notification");
			return cb(null, game)
		};
	});
};

function calculateScores(scores){
	console.log(scores);

	scores["som"] = scores["Een"] + scores["Twee"] + scores["Drie"] + scores["Vier"] + scores["Vijf"] + scores["Zes"];

	return scores;
}