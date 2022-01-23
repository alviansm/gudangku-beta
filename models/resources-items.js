const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path:  path.resolve(__dirname, '../config/dotenv/.env')});

const url = process.env.DB_CONNECT;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	condition: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	quantityUnit: {
		type: String,
		required: true
	},
	manufacture: {
		type: String,
		required: false
	},
	urlImage: {
		type: String,
		required: false
	},
	love: {
		type: Array,
		required: false
	},
	OwnerId: {
		type: Array,
		required: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Items = mongoose.model('Items', ItemSchema);
 
// const item1 = new Items({
// 	name: "Cangkul", 
// 	description: "Alat untuk mencangkul, terbuat dari besi tuang.", 
// 	tags: "perkebunan", 
// 	price: 80000, 
// 	manufacture: "PT Sejahtera Abadi"
// });
// 
// 
// item1.save();

module.exports = Items;