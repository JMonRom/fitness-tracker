const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true, 
        required: 'Enter exercise'
      },
      name: {
        type: String,
        trim: true,
        required: 'Enter exercise name'
      },
      duration: {
        type: Number,
        required: 'Enter exercise duration'
      },
      distance: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      weight: {
        type: Number
      }
    }
  ]
})

const Workout= mongoose.model("Workout", workoutSchema)
module.exports = Workout;