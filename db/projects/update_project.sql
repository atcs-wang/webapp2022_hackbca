UPDATE
  project
SET
  project_name = ?,
  project_team = ?,
  project_location_id = ?,
  project_type_id = ?,
  project_session = ?,
  project_language = ?,
  project_description = ?
WHERE
  project_id = ?
