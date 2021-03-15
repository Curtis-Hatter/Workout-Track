// const { json } = require("express");
// const { Mongoose } = require("mongoose");
const Workout = require("../models/workout");
// const express = require("express");
// const app = express();
const mongoose = require("mongoose");

module.exports = (app) =>{

    app.post("/api/workouts", (req,res)=>{
        // console.log(req.body);
        Workout.create(req.body).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err =>{
            res.status(400).json(err);
        })
    })


    // WAS GOING TO IMPLEMENT AGGREGATE HERE BUT IT JUST BECAME CUMBERSOME 
    // THE IDEA WAS TO PULL THE INFORMATION AS AN AGGREGATE: UNWIND THE EXERCISES ARRAY AND $SUM 
    // THE DURATIONS BUT RAN INTO A PROBLEM WITH TRYING TO RECONSTRUCT IT BACK OR "REWIND" (hehe) 
    // THE UNWIND OPERATION. 
    app.get("/api/workouts", (req,res) =>{
        Workout.find().sort({_id:1}).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })

    app.put("/api/workouts/:id" , (req,res) =>{
        // For some reason I can't put in multiple requests on FindOne and Update
        // SCRAPING PRETTY CODE THAT I THOUGHT WOULD WORK HERE AND GOING WITH UGLY CODE
        // Workout.findOneAndUpdate({ _id: req.params.id }, ({$push: {exercises: req.body}},{$inc: {totalDuration: req.body.duration}})).then(updatedWorkout =>{
        //     res.json(updatedWorkout);
        // }).catch(err => {
        //     res.status(400).json(err);
        // })

        // UGLY CODE HERE
        Workout.findOneAndUpdate({ _id: req.params.id }, {$push: {exercises: req.body}}).then(() =>{
            Workout.findOneAndUpdate({ _id: req.params.id }, {$inc: {totalDuration: req.body.duration}})
            .then(updatedWorkout =>{
                res.json(updatedWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            })
        }).catch(err => {
            res.status(400).json(err);
        })
    })


    // AGGREGATE UNWIND RETURN AN OBJECT TO BE ACCESSED RATHER THAN AN ARRAY TO BE IMPLEMENTED INTO THE
    // REST OF THE FRONT. THOUGHT I COULD DECONSTRUCT THE DATABASE AND RECONSTRUCT IT BUT DOCUMENTATION
    // IS ROUGH AND NOT ENOUGH EXAMPLES. STACK OVERFLOW IS TOO SPECIFIC IN QUESTIONS TO REALLY GET A GOOD
    // GRASP ON HOW TO RECONSTRUCT WHAT'S RETURN FROM THE AGGREGATE DATABASE. I GAVE UP AND JUST FOUND A WORK
    // AROUND.
    // app.get("/sum/:id" , (req, res) => {
    //     // console.log(req.params.id)
    //     var id = mongoose.Types.ObjectId(req.params.id);
    //     // console.log(Workout);
    //     // ObjectId("604e90c3b993b94750211f4d")
    //     // console.log(`ObjectId(${id})`)
    //     Workout.aggregate(
    //         [ 
    //             {$match: {_id: id} },
    //             {$unwind: "$exercises"},
    //             {
    //                 $group: {
    //                     _id: "$day",
    //                     totalDuration: {$sum: "$exercises.duration"}
    //                 }
    //             }
    //             // {totalDuration: {$sum: "$duration"}}
    //             // {$group: {_id: "$day", totalDuration: {$sum: "$duration"}}}
                
    //         ],
    //     function(err, result){
    //         if (err) {
    //           res.send(err);
    //         } else {
    //           res.json(result);
    //         }
    //       }
    //     )
    // })

    app.get("/api/workouts/range", (req,res) =>{
        Workout.find().sort({_id:1}).then(dbWorkout =>{
            // console.log(dbWorkout);
            if(dbWorkout.length > 7){
                // console.log(dbWorkout.splice(8));
                res.json(dbWorkout.splice(8));
            }
            else{
                res.json(dbWorkout);
            }
        }).catch(err => {
            res.status(400).json(err);
        })
    })

}