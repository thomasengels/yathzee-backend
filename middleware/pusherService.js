var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '204807',
  key: '12eadd40754c277d4d3b',
  secret: '0904cc16dfab7ab7c480',
  cluster: 'eu',
  encrypted: true
});

exports.sendNewGameNotification = function(game, res) {
	pusher.trigger('game','new', game);
};

exports.sendMoveDoneInGameNotification = function(game, res){
    pusher.trigger('game','changed', game);
}