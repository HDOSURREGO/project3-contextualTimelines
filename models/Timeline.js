const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timelineSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2
		},
		events: [
			{
				type: Schema.Types.ObjectId,
				ref: "Event"
			}
		]
	},

	{
		timestamps: true
	}
);

// "User" model --> "users" collection
const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
