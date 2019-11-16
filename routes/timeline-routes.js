const express = require("express");
const router = express.Router();

// require Author model in order to use it for CRUD
const Timeline = require("../models/Timeline");
const Event = require("../models/Event");

// ****************************************************************************************

// GET - to display the form for Creating the authors
// router.get("/timeline/new", (req, res, next) => {
// 	// make sure you see all the folders that are inside the "views" folder,
// 	// you don't have to specify "views" folder tho
// 	// in res.render() we don't use '/' 🚨 before we put the the path to the hbs file we want to render
// 	res.render("author-views/new-author");
// });

// ****************************************************************************************

// POST route to create a new timeline in the DB
{
	/* <form action="/timeline/create" method="post"> */
}
router.post("/timeline/create", (req, res, next) => {
	console.log("THE TIMELINE: ", req.body);
	Timeline.create({
		timelineName: req.body.timelineName,
		events: []
	})
		.then(response => {
			res.json(response);
		})
		.catch(err => {
			res.json(err);
		});
});

// ****************************************************************************************
router.get("/timelines", (req, res, next) => {
	Timeline.find()
		.then(timelinesFromDB => {
			console.log("the timelines >>>>>> ", timelinesFromDB);
			res.status(200).json(timelinesFromDB);
		})
		.catch(err => console.log("error while getting all the timelines: ", err));
});

// GET all events for the timeline
router.get("/timelines/:timelineId", (req, res, next) => {
	Timeline.find()
		.populate("events")
		.then(timelinesFromDB => res.status(200).json(timelinesFromDB))
		.catch(err => {
			console.log("Error while getting the timelines from the DB: ", err);

			res.status(500).json(err);
		});
});
// in order to use routes anywhere else in this application, we have to export them

router.post("/timeline/addEvent/:timelineId", (req, res, next) => {
	Timeline.findById(req.params.timelineId)
		.then(timelineFromDb => {
			timelineFromDb.events.push(req.body.eventId);
			timelineFromDb
				.save()
				.then(updatedTimeline => {
					// res.status(200).json(updatedTimeline);
					Event.create;
				})
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});

module.exports = router;
