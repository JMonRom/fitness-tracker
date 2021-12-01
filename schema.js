const mongoose = require("mongoose");
const Schema = mongoose.Schema

 const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true, //removes white space
            },
            type: {
                type: String,
                trim: true
            },
            weight: {
                type: Number,
                default: 0,
            },
            sets: {
                type: Number,
                default: 0,
            },
            reps: {
                type: Number,
                default: 0,
            },
            duration: {
                type: Number,
                default: 0,
            },
            distance: {
                type: Number,
                default: 0,
            }
        }
    ]
})

const Workout= mongoose.model("Workout", workoutSchema)
module.exports = Workout;