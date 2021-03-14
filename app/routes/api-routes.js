const Workout = require("../models/workout");
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

module.exports = (app) =>{

    app.post("/api/workouts", (req,res)=>{
        // console.log(req.body);
        Workout.create(req.body).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err =>{
            res.status(400).json(err);
        })
    })

    app.get("/api/workouts", (req,res) =>{
        Workout.find().sort({_id:1}).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })

    app.put("/api/workouts/:id" , (req,res) =>{
        // const id = req.params.id;
        // console.log(req.body);
        // const body = req.body;
        // res.send("Hello!");
        // console.log(Workout.findOne({_id: req.params.id}))
        Workout.findOneAndUpdate({ _id: req.params.id }, {$push: {exercises: req.body}}).then(updatedWorkout =>{
            res.json(updatedWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })

    // app.get("/sum/:id" , (req, res) => {
    //     Workout.aggregate([ {$match: {_id : req.params.id}},
    //         {
    //             $group:{_id: "$day"}
    //         }
    //     ],
    //     function(err, result){
    //         if (err) {
    //           res.send(err);
    //         } else {
    //           res.json(result);
    //         }
    //       }
    //     )
    // })

}