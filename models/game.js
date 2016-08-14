var mongoose = require('mongoose');

var moveSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    dices: [Number],
    scoreCategorieName: String,
    score: Number
});

var yathzeeTypeScore = new mongoose.Schema({
    scoreType: String,
    score: Number
});

var scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    scores: [yathzeeTypeScore]
});

var gameSchema = new mongoose.Schema({
    state: {
        type: String,
        default: "invited"
    },
    finished: {
        type: Boolean,
        default: false
    },
    players: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        required: true,
    },
    moves: [moveSchema],
    scores: [scoreSchema]
});

module.exports = mongoose.model('Game', gameSchema);