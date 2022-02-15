SELECT
    event.event_id AS event_id,
    event_name,
    event_location_id,
    event_type_id,
    DATE_FORMAT (event_dt, '%m-%d-%Y') AS event_date_mdy,
    DATE_FORMAT (event_dt, '%l:%i %p') AS event_time,
    event_duration,
    event_description
FROM
    event
WHERE
    event.event_id = ?
LIMIT 1
