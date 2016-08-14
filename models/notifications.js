var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
	detail : {
		type: String,
		required: true
	},
	gameId : {
		type: String,
		required : true
	},
	seen : {
		type: Boolean,
		required : true,
		default : false
	}
});

module.exports = mongoose.model('notification', notificationSchema);