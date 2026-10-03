const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const privateKey = fs.readFileSync("./client_private_key.pem", "utf8");

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