SELECT
    event.event_id AS event_id,
    event_name,
    event_duration,
    event_type,
    DATE_FORMAT (event_dt, '%Y-%m-%d') AS event_date_ymd,
    DATE_FORMAT (event_dt, '%b %d (%a)') AS event_date,
    DATE_FORMAT (event_dt, '%l:%i %p') AS event_time,
    event_location,
    event_description,
    event_interest
FROM
    event
    LEFT JOIN (
        SELECT
            COUNT(*) AS event_interest,
            event_id
        FROM
            event_user_registration
        GROUP BY
            event_id) AS event_user_counts ON event.event_id = event_user_counts.event_id,
    event_location,
    event_type
WHERE
    event.event_location_id = event_location.event_location_id
    AND event.event_type_id = event_type.event_type_id
