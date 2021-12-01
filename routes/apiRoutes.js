const db = require('../models');

module.export = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    }).catch((err) => {
      res.status(400);
    });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne(
      {
        _id: req.params.id,
      },
      {
        $push: {
          exercises: req.body,
        },
      }
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    }).catch((err) => {
      res.status(400);
    });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      }).catch((err) => {
        res.status(400);
      });
    });
};