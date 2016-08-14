var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Game = require('../model-controllers/games');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('', function(req, res, next) {
  if (typeof req.body === 'undefined' || typeof req.body.newGame === 'undefined' || req.body.newGame === null){
    res.status(400).send({response: "Failed", message : "Json invalid"});
  }
  else{
    Game.create(req.body.newGame, function(err, newGame) {
      if (err) {
          res.status(500).send({
              response: "Failed",
              message: "Could not create new game"
          });
      } else {
        res.status(201).send({response: "Success", game: newGame});
      }
    });
  }
});

router.get('/:gameId', function(req, res){
  Game.getGameById(req.params.gameId, function(err, game){
    if(err){
      sendJSONresponse(res, 404, err);
    }
    else{
      sendJSONresponse(res, 200,{"game" : game});
    }
  });
});


router.get('/', function(req, res){
  Game.getAllGames(function(err, games){
    if(err){
      sendJSONresponse(res, 404, err);
    }
    else{
      sendJSONresponse(res, 200, {"games" : games});
    }
  });
});

router.put('/:gameId/scores', function(req, res){
  console.log(req.body.scores);
  Game.updatedScore(req.params.gameId, req.body.scores, function(err, game){
    if(err){
      sendJSONresponse(res, 404, err);
    }
    else{
    sendJSONresponse(res, 200,{"game" : game});
    }
  });
});

module.exports = router;