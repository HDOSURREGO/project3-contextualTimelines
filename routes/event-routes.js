const express = require("express");
const router = express.Router();

const Timeline = require("../models/Timeline");
const Event = require("../models/Event");

// ****************************************************************************************

// GET - to display the form to create a new event
// router.get("/event/new", (req, res, next) => {
// 	Timeline.find()
// 		.then(allTimelines => res.render("/new-event", { allTimelines }))
// 		.catch(err =>
// 			console.log("Error while displaying form for new Event: ", err)
// 		);
// });

// ****************************************************************************************

// POST - create an event
// <form action="/event/create" method="post">
router.post("/event/create", (req, res, next) => {
	// console.log('The data from the form: ', req.body);
	// the "value" from option gets saved inside req.body object
	Event.create(req.body)
		.then(newEvent => {
			console.log("NEW EVENT: ", newEvent);
			// res.redirect("/events");
			res.send(`You have created an event in the MongoDB: ${newEvent}`);
		})
		.catch(err => console.log("Error while creating a new event: ", err));
});

// GET route to display all the events
router.get("/events", (req, res, next) => {
	Event.find()
		.then(eventsFromDB => res.send(`You have ${eventsFromDB} in the MongoDB`))
		.catch(err => console.log("error while getting all the events: ", err));
});

// **************************************   **************************************************

// POST route to delete the event
// action="/events/{{this._id}}/delete"
// router.post("/events/:theId/delete", (req, res, next) => {
// 	Event.findByIdAndDelete(req.params.theId)
// 		.then(() => res.redirect("/events"))
// 		.catch(err => console.log("Error while deleting the event: ", err));
// });

// ****************************************************************************************

// GET route to display the form for updating the event
// router.get("/events/:theId/edit", (req, res, next) => {
// 	Event.findById(req.params.theId)
// 		.then(theEvent => {
// 			Timeline.find()
// 				.then(allTimelines => {
// 					// allAuthors.forEach(theTimeline => {
// 					// 	if (theBook.author.equals(theAuthor._id)) {
// 					// 		// create additional key in the author object to differentiate the author that wrote this book
// 					// 		// from all the other authors
// 					// 		theAuthor.isWriter = true;
// 					// 	}
// 					// });
// 					res.render("/editEvent", { theEvent, allTimelines });
// 				})
// 				.catch(err =>
// 					console.log("Error while getting all the timelines: ", err)
// 				);
// 		})
// 		.catch(err => console.log("Error while getting the event from DB: ", err));
// });

// ****************************************************************************************

// POST route to save the updates
{
	/* <form action="/books/{{theBook._id}}/update" method="post"> */
}
// router.post("/events/:id/update", (req, res, next) => {
// 	Event
// 		// find by id and pass the new req.body to replace previous document in the DB
// 		.findByIdAndUpdate(req.params.id, req.body)
// 		.then(updatedEvent => res.redirect(`/events/${updatedEvent._id}`))
// 		.catch(err => console.log("Error while updating the event: ", err));
// });

// ****************************************************************************************

// GET route for displaying the book details page
// http://localhost:3000/books/5c52542abbd9c887b58e24a7 <== this 'bookId' will change dynamically when we click on each book
// router.get("/events/:eventId", (req, res, next) => {
// 	Event.findById(req.params.eventId)
// 		.populate("timeline") // .populate("author") => we are saying: give me all the details related to the 'author' field in the book
// 		// (there's only author id there so what it does is-finds the rest
// 		// of information related to that author based on the id)
// 		.then(theEvent => {
// 			// console.log("Details page : ", theBook)
// 			res.render("/eventDetails", { theEvent });
// 		})
// 		.catch(err =>
// 			console.log("Error while getting the details of a event: ", err)
// 		);
// });

module.exports = router;
