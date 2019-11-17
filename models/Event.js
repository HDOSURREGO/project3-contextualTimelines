const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		eventTitle: {
			type: String,
			required: true,
			minlength: 2
		},
		eventDate: {
			type: Date,
			required: true,
			default: 01 / 01 / 1900,
			minlength: 2
		},
		eventDescription: {
			type: String,
			required: true,
			minlength: 2
		},
		eventLinks: {
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
