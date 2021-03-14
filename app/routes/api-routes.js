const Workout = require("../models/workout");
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

module.exports = (app) =>{

    app.post("/api/workouts", (body,res)=>{
        Workout.create(body).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err =>{
            res.status(400).json(err);
        })
    })

    app.get("/api/workouts", (req,res) =>{
        Workout.find().sort({_id:-1}).then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })

    app.put("/api/workouts/:id" , (req,res) =>{
        // const id = req.params.id;
        const body = req.body;
        Workout.findOneAndUpdate({ _id: req.params.id }, body).then(updatedWorkout =>{
            res.json(updatedWorkout);
        }).catch(err => {
            res.status(400).json(err);
        })
    })

}