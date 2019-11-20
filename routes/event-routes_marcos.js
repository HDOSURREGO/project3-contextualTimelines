const express = require("express");
const router = express.Router();

const Timeline = require("../models/Timeline");
const Event = require("../models/Event");

// ****************************************************************************************

// POST - create an event
router.post("/event/create/:timelineId", (req, res, next) => {
	console.log("The data from the form Create Event: ", req.body);
	// the "value" from option gets saved inside req.body object
	Event.create(req.body)
		.then(response => {
			console.log(response);
			// attachedEvent2Timeline(req.params.timelineId, response._id);
			Timeline.findById(req.params.timelineId)
				.populate("events")
				.then(timelineFromDb => {
					console.log("the timeline from db ============== ", timelineFromDb);
					timelineFromDb.events.push(response._id);
					timelineFromDb
						.save()
						.then(updatedTimeline => {
							Timeline.populate(updatedTimeline, { path: "events" })
								.then(theTimeline => {
									console.log("+++++++++++++++++++++++", theTimeline);
									// Event.create;
									res.json(theTimeline);
								})
								.catch(err => res.status(400).json(err));
						})
						.catch(err => {
							res.status(400).json(err);
						});
				})
				.catch(err => {
					res.status(400).json(err);
				});
		})
		.catch(err => {
			res.json(err);
		});
});

// attachedEvent2Timeline = (timelineId, eventId) => {};

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
router.get("/timeline/event/:eventId", (req, res, next) => {
	Event.findById(req.params.eventId)
		.then(theEvent => {
			console.log("this is the event details ----- ", theEvent);
			res.json(theEvent);
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;
