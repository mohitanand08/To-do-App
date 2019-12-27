// Mongoose module added
const mongoose = require('mongoose');
// Schema Structure
const todoSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});
// Collection
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
