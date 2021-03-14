//creating dependencies
const path = require("path");

//Routes
module.exports = (app) => {
    app.get("/", (req, res) =>{
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });

    app.get("/stats", (req, res) =>{
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });

    app.get("/exercise", (req, res) =>{
        res.sendFile(path.join(__dirname, "../public/exercise.html"))
    });
}