SELECT
  project_id,
  project_name,
  project_team,
  project_location,
  project_type,
  project_session,
  project_language,
  project_description
FROM
  project,
  project_location,
  project_type
WHERE
  project.project_location_id = project_location.project_location_id
  AND project.project_type_id = project_type.project_type_id
  AND project.project_id = ?
LIMIT 1
