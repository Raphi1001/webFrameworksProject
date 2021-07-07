var express = require('express');
var cors = require('cors');
const User = require('./Users.js');
const { ConsoleReporter } = require('jasmine');

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/* DATABASE START */
var User1 = new User("max@mustermann.at", "11111111", "11111111", "Musterstraße 1", "Wien", "2010");
var User2 = new User("erica@musterfrau.at", "22222222", "22222222", "Musterstraße 2", "Deutschland", "1010");
var Users = [User1, User2];

var AuthenticationTokens = {};
var Highscores = { Harry: 50, Paul: 51, Raphi: 37, Noc: 422, Noc2: 422, Noc3: 421, Noc4: 72, asdasd: 31, lolo: 56, speta: 39, harry: 56, ich: 700 };
/* DATABASE END */


//POST route for login
app.post('/login', (req, res, next) => {
    const loginData = req.body;
    var newUser = new User(String(loginData.email), String(loginData.password));

    if (newUser.invalid) {
        res.status(400).json({
            message: "Invalid User Input"
        });
        return;
    }

    for (var i = 0; i < Users.length; ++i) {
        if (Users[i].email == newUser.email && Users[i].password == newUser.password) {
            let token = Math.floor(Math.random() * 99999);
            AuthenticationTokens[newUser.email] = token;
            res.status(200).json({
                message: "Login successfull",
                success: true,
                token: AuthenticationTokens[newUser.email],
                email: Users[i].email,
                adress: Users[i].adress,
                city: Users[i].city,
                postalCode: Users[i].postalCode
            });
            return;
        }
    }
    console.log("User not found");
    res.status(200).json({
        message: "Invalid email or password",
        success: false,
    });


});

app.post('/signUp', (req, res, next) => {
    const loginData = req.body;
    var newUser = new User(String(loginData.email), String(loginData.password), String(loginData.pwConfirm), String(loginData.adress), String(loginData.city), String(loginData.postalCode));
    if (newUser.invalid) {
        res.status(400).json({
            message: "Invalid User Input"
        });
        return;
    }

    for (var i = 0; i < Users.length; ++i) {
        if (Users[i].email == newUser.email) {
            console.log("Email already taken");
            res.status(200).json({
                message: "Email already taken"
            });
            return;
        }
    }

    Users.push(newUser);
    console.log("New User created successfully")
    res.status(200).json({
        message: "New User created successfully"
    });
});

app.post('/highscore', (req, res, next) => {

    const data = req.body;
    if (isNaN(data.points) || !data.username.match(/^[A-Za-z0-9ÄäÖöÜüß@.]*$/)) {
        res.status(400).json({
            message: "Invalid user input",
        });
        return;
    }


    console.log(data.username);
    console.log(data.points);

    if (!Highscores[data.username] || Highscores[data.username] < data.points) {
        Highscores[data.username] = data.points;
        console.log("Highscore updated successfull");
        res.status(200).json({
            message: "Highscore updated successfull",
            updated: true
        });
    } else {
        console.log("No new Highscore");
        res.status(200).json({
            message: "No new Highscore",
            updated: false
        });
    }
});


app.post('/verifyToken', (req, res, next) => {

    const data = req.body;
    if (isNaN(data.token)) {
        res.status(400).json({
            success: false
        });
        return;
    }

    for (var email in AuthenticationTokens) {
        if (AuthenticationTokens[email] == data.token) {

            console.log("Verfication successfull");
            res.status(200).json({
                success: true,
                email: email
            });
            return
        }
    }

    console.log("Verfication not successfull");
    res.status(200).json({
        success: false
    });
});

app.get('/getHighscoreList', (req, res, next) => {
    res.status(200).json({
        highscoreList: Highscores
    });
});

module.exports = app;