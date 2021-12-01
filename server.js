const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const Workout = require("./schema")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout_db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

// Routes to the page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.post("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", async (req, res) => {
    try {
      const workout = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);
  
      res.json(workout);
    } catch (err) {
      res.json(err);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    try {
      const workout = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]).sort({ day: -1 });
  
      res.json(workout);
    } catch (err) {
      res.json(err);
    }
  });

  app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => res.json(err));
  });

  app.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
      { _id: req.params.id },
      {
        $push: { exercises: req.body },
      }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => res.json(err));
  });



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
})