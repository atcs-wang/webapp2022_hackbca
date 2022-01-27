var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

const mysql = require('mysql');

const dbConfig = {
  host: 'soccerdb.calingaiy4id.us-east-2.rds-amazonaws.com',
  port: '3306',
  user: 'bcausr',
  password: '947dHFeu!ihn',
  database: 'hackbca_example',
  connectTimeout: 10000
}

let connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
  if (err)
    throw err;
  console.log("Connected to the MySQL Server!");
})

/* GET events "home" page - a list of all events. */
router.get('/', function(req, res, next) {
  res.render('events', { title: 'Events', style: "tables"});
});

router.get('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id
  let event_data = {
  event_id: event_id,
  event_name: "Opening Ceremony", 
  event_location: "Auditorium", 
  event_date: "May 1 (Sat)", 
  event_time: "10:30 AM", 
  event_duration: "30m", 
  event_type = "Main", 
  event_interest: "100",
  event_description: "Be there!"}

  res.render('event', { title: 'Event Details', styles: ["tables", "event"], event_id : event_id, event_data : event_data});
});

router.get('/create', function(req, res, next) {
  res.render('eventform', { title: 'Create Event', styles: ["newevent"]});
});

singleEventQuery = `
select event.event_id as event_id, 
	event_name, 
	event_duration, 
	event_type, 
	event_dt,
	DATE_FORMAT(event_dt, '%Y-%m-%d') as event_date_ymd,
	DATE_FORMAT(event_dt, '%b %d (%a)') as event_date,
	DATE_FORMAT(event_dt, '%l:%i %p') as event_time,
	event_location, 
	event_description
	event_interest
from 
	event LEFT JOIN (
		select count(*) event_interest, event_id 
        from event_user_registration
		group by event_id) as event_user_counts ON event.event_id = event_user_counts.event_id, event_location, event_type
where
	event.event_location_id = event_location.event_location_id
	and event.event_type_id = event_type.event_type_id
    and event.event_id = event_user_counts.event_id
	and event_id = ?
LIMIT 1`

connection.query(singleEventQuery, [event_id], (err, results) => {
  if (err)
    next(err);
  // render the page ! LOL
})
router.get('/:event_id/modify', function(req, res, next) {
  res.render('eventform', { title: 'Modify Event', styles: ["newevent"], event_id: event_id});
});

module.exports = router;
