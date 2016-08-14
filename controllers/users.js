var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../model-controllers/users');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

router.get('/:email', function(req, res) {
    if (!req.params.email.includes("@")) {
        User.getUserById(req.params.email, function(err, user) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, {
                    "user": user
                });
            }
        });
    } else {
        User.getUserByEmail(req.params.email, function(err, user) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, {
                    "user": user
                });
            }
        });
    }
});


router.get('/', function(req, res) {
    User.getAllUsers(function(err, users) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "users": users
            });
        }
    });
});

router.get('/:email/friends', function(req, res) {
    Users.getFriends(req.params.email, function(err, users) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "friends": users
            });
        }
    });
});

router.put('/:email/changePrivacySetting', function(req, res) {
    User.changePrivacySetting(req.params.email, function(err, user) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "user": user
            });
        }
    });
});


router.get('/:id/games', function(req, res) {
    User.getGamesWhereIdParticipates(req.params.userId, function(err, games) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            console.log(games);
            sendJSONresponse(res, 200, {
                "games": games
            });
        }
    });
});

module.exports = router;