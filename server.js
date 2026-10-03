const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const privateKey = process.env.CLIENT_PRIVATE_KEY;

app.get("/", (req, res) => {
    res.send("CampusAI backend is running!");
});

app.get("/token", (req, res) => {
    const token = jwt.sign(
        {
            sub: "campusai-user"
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "1h"
        }
    );

    res.json({ token });
});

app.listen(3000, () => {
    console.log("CampusAI backend running on port 3000");
});