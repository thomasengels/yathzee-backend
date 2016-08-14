var notificationSchema = require('../models/notifications');

exports.create = function(notification, cb){
	var item = new notificationSchema({
		detail : notification.detail,
		gameId : notification.gameId
	});

	item.save(item, cb);
};

exports.setSeen = function(id, cb){
	notificationSchema.update({_id: id}, {seen : true}, cb);
};