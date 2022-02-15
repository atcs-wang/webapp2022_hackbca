var express = require("express");
var router = express.Router();
var db = require("../db/db");

const fs = require("fs");
const path = require("path");

let projectsQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/select_projects.sql"),
  "utf-8"
);

router.get("/", async function (req, res, next) {
  try {
    let results = await db.queryPromise(projectsQuery);
    console.log(results);
    res.render("projects", {
      title: "Projects",
      style: "tables",
      projects: results,
    });
  } catch (err) {
    next(err);
  }
});

let locationsQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/select_project_locations.sql"),
  "utf-8"
);
let typesQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/select_project_types.sql"),
  "utf-8"
);

router.get("/create", async function (req, res, next) {
  try {
    let locations = await db.queryPromise(locationsQuery);
    let types = await db.queryPromise(typesQuery);

    res.render("projectform", {
      title: "Create Project",
      style: "newevent",
      project_locations: locations,
      project_types: types,
    });
  } catch (err) {
    next(err);
  }
});

let singleProjectQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/select_project_single.sql"),
  "utf-8"
);

router.get("/:project_id", async function (req, res, next) {
  try {
    let project_id = req.params.project_id;
    let results = await db.queryPromise(singleProjectQuery, [project_id]);
    let project_data = results[0];
    res.render("project", {
      title: "Project Details",
      styles: ["tables", "event"],
      project_id: project_id,
      project_data: project_data,
    });
  } catch (err) {
    next(err);
  }
});

let singleProjectForm = fs.readFileSync(
  path.join(__dirname, "../db/projects/select_project_single_form.sql"),
  "utf-8"
);

router.get("/:project_id/modify", async function (req, res, next) {
  try {
    let project_id = req.params.project_id;
    let locations = await db.queryPromise(locationsQuery);
    let types = await db.queryPromise(typesQuery);
    let results = await db.queryPromise(singleProjectForm, [project_id]);
    let project_data = results[0];

    res.render("projectform", {
      title: "Modify Project",
      style: "newevent",
      project_locations: locations,
      project_types: types,
      project: project_data,
    });
  } catch (err) {
    next(err);
  }
});

let insertProjectQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/insert_project.sql"),
  "utf-8"
);

router.post("/", async function (req, res, next) {
  try {
    let results = await db.queryPromise(insertProjectQuery, [
      req.body.project_name,
      req.body.project_team,
      req.body.project_location_id,
      req.body.project_type_id,
      req.body.project_session,
      req.body.project_language,
      req.body.project_description,
    ]);

    let project_id_inserted = results.insertId;
    res.redirect(`/projects/${project_id_inserted}`);
  } catch (err) {
    next(err);
  }
});

let updateProjectQuery = fs.readFileSync(
  path.join(__dirname, "../db/projects/update_project.sql"),
  "utf-8"
);

router.post("/:project_id", async function (req, res, next) {
  try {
    console.log(req.params);
    let results = await db.queryPromise(updateProjectQuery, [
      req.body.project_name,
      req.body.project_team,
      req.body.project_location_id,
      req.body.project_type_id,
      req.body.project_session,
      req.body.project_language,
      req.body.project_description,
      req.params.project_id,
    ]);

    res.redirect(`/projects/${req.params.project_id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
