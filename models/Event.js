const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 2
		},
		eventDate: {
			type: Date,
			required: true,
			minlength: 2
		},
		description: {
			type: String,
			required: true,
			minlength: 2
		},
		links: {
			type: Array,
			required: false
		}
	},

	{
		timestamps: true
	}
);

// "User" model --> "users" collection
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
