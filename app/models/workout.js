const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        // totalDuration:{
        //     type: Number,
        //     default: 0
        // },
        exercises: [{
            type: {type: String},
            name: {type: String},
            duration: {type:Number, default: 0},
            weight: {type:Number, default: 0},
            reps: {type:Number, default: 0},
            sets: {type:Number, default: 0},
            distance: {type:Number, default: 0}
        }]
    }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;