const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path:  path.resolve(__dirname, '../config/dotenv/.env')});

const PermissionSchema = new mongoose.Schema({
	create: {
		type: String,
		required: true
	},
	read: {
		type: String,
		required: false
	},
	write: {
		type: String,
		required: true
	},
	delete: {
		type: String,
		required: true
	}
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
