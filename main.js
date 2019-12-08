// Require all packages, models and other files
const httpStatusCode = require("http-status-codes");
const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const router = require("./routes/router");

//Database related
const mongoose = require("mongoose");
const MongoDB = require("mongodb").MongoClient;
const db = mongoose.connection;
const dbURL = "mongodb://localhost:27017";
const dbName = "wasProjekti";
// Set app port number and to use express
const port = 3000;
const app = express();


app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded());

initDB();

// Routes
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

//Initialize database
function initDB() {

    MongoDB.connect(dbURL, (error, client) => {
        if (error) {
            console.log(error);
        }

        let db = client.db(dbName);

        //Create collections
        db.createCollection("users", (err) => {
            if (err) throw err;
        });

        db.createCollection("reservations", (err) => {
            if (err) throw err;
        });
    });

    mongoose.connect(
        "mongodb://localhost:27017/wasProjekti",
        { useNewUrlParser: true }
    );

    db.once("open", () => {
        console.log("Successfully connected to MongoDB using Mongoose!")
        
    });

};