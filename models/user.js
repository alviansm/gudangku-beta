const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path:  path.resolve(__dirname, '../config/dotenv/.env')});

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	isSuperadmin: {
		type: Boolean,
		default: false,
		required: true
	},
	isUser: {
		type: Boolean,
		default: true,
		required: true
	},
	isGuest: {
		type: Boolean,
		default: false,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
