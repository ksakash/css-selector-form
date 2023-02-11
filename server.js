const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/public", express.static("./public"));

app.listen(3000);
console.log("listening on http://localhost:3000");



