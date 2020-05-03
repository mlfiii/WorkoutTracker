const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema that governs the workouts collection

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {

                //Common fields between both cardio and resistance so they are required
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
                },
                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes"
                },
                //Fields that are not required.
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {

            virtuals: true
        }
    }
);

//Rather than add in a field directly, it is created virtually by pulling the total from all exerceises
workoutSchema.virtual("totalDuration").get(function () {

    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;