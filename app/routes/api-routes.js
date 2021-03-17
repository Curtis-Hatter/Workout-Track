const Workout = require("../models/workout");
module.exports = (app) =>{

    app.post("/api/workouts", (req,res)=>{
        // console.log(req.body);
        Workout.create(req.body).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err =>{
            res.status(400).json(err);
        })
    })

    // use aggregate to add total duration while sending it to front end
    app.get("/api/workouts", (req,res) =>{
        // Workout.find().sort({_id:1}).then(dbWorkout =>{
        //     res.json(dbWorkout);
        // }).catch(err => {
        //     res.status(400).json(err);
        // })
        Workout.aggregate(
            [ 
                {$addFields: {
                    totalDuration: {$sum: "$exercises.duration"}}}
            ],
        function(err, result){
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          })
    })

    app.put("/api/workouts/:id" , (req,res) =>{
        
        Workout.findOneAndUpdate({ _id: req.params.id }, {$push: {exercises: req.body}}).then((updatedWorkout) =>{
            res.json(updatedWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })


    // AGGREGATE UNWIND RETURN AN OBJECT TO BE ACCESSED RATHER THAN AN ARRAY TO BE IMPLEMENTED INTO THE
    // REST OF THE FRONT. THOUGHT I COULD DECONSTRUCT THE DATABASE AND RECONSTRUCT IT BUT DOCUMENTATION
    // IS ROUGH AND NOT ENOUGH EXAMPLES. STACK OVERFLOW IS TOO SPECIFIC IN QUESTIONS TO REALLY GET A GOOD
    // GRASP ON HOW TO RECONSTRUCT WHAT'S RETURN FROM THE AGGREGATE DATABASE. I GAVE UP AND JUST FOUND A WORK
    // AROUND.

    /* HOLY JUNK ACTUALLY GOT IT TO WORK NO WORRIES!!! */
    app.get("/api/workouts/range", (req,res) =>{

        Workout.aggregate(
            [ 
                {$addFields: {
                    totalDuration: {$sum: "$exercises.duration"}}},
                {$limit : 7}    
            ],
        function(err, result){
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          })
    })

}