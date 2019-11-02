const express = require("express");
const router = express.Router();

const Timeline = require("../models/Timeline");
const Event = require("../models/Event");

// ****************************************************************************************

// POST - create an event
// <form action="/event/create" method="post">
router.post("/event/create", (req, res, next) => {
	// console.log('The data from the form: ', req.body);
	// the "value" from option gets saved inside req.body object
	Event.create(req.body)
		.then(response => {
			res.json(response);
		})
		.catch(err => {
			res.json(err);
		});
});

// GET route to display all the events
router.get("/events", (req, res, next) => {
	Event.find()
		.then(eventsFromDB =>
			res.send(`You have these events in the Database: ${eventsFromDB} `)
		)
		.catch(err => console.log("error while getting all the events: ", err));
});

// **************************************   **************************************************

// POST route to delete the event
// action="/events/{{this._id}}/delete"
router.post("/events/:eventId/delete", (req, res, next) => {
	Event.findByIdAndDelete(req.params.eventId)
		.then(() => {
			res.json({
				message: `Event with ${req.params.eventId} has been deleted successfully.`
			});
		})
		.catch(err => {
			res.json(err);
		});
});

// ****************************************************************************************

// POST route to save the updates

/* <form action="/events/{{eventId}}/update" method="post"> */

router.post("/events/:eventId/update", (req, res, next) => {
	Event
		// find by id and pass the new req.body to replace previous document in the DB
		.findByIdAndUpdate(req.params.eventId, req.body)
		.then(() => {
			res.json({
				message: `Event with ${req.params.eventId} is updated successfully.`
			});
		})
		.catch(err => {
			res.json(err);
		});
});

// ****************************************************************************************

// GET route => to retrieve a specific event
router.get("/timelines/:timelineId/events/:eventId", (req, res, next) => {
	Event.findById(req.params.eventId)
		.then(theEvent => {
			res.json(theEvent);
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;
