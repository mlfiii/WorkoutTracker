const Workout = require("../models/workout.js")

module.exports = function (app) {

    //Gets
    app.get("/api/workouts", function (req, res) {

        //Pull all of the workouts from collecxtion
        Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    //Pull the range of workouts
    app.get("/api/workouts/range", function (req, res) {
        Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    //Posts

    //Store a new worout to collection
    app.post("/api/workouts", function (req, res) {
        Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            })
    });


    app.post("/api/workouts/range", function (req, res) {
        Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            })
    });


    //Puts
    //Updates a specific workout by pushing into the array.
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        //Updates the id specified and pulled from params.
        Workout.findByIdAndUpdate(
            //Takes the submitted ID 
            params.id,
            //Used to push new data to array.
            { $push: { exercises: body } },
            //Runs validators based on the model provided.
            { new: true, runValidators: true }
        )
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            })
    });
}