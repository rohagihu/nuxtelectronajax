var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/test", function(req, res) {
    console.log("aa");
    var query1 = request.body.firstName;
    var query2 = request.body.lastName;
    res.end("yes");
});
app.listen(3002, function() {
    console.log("Started on PORT 3002");
});

// function test() {
//     console.log("test");
// }

// test();

// const http = require("http");

// http.createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request
//         .on("error", err => {
//             console.error(err);
//         })
//         .on("data", chunk => {
//             body.push(chunk);
//         })
//         .on("end", () => {
//             body = Buffer.concat(body).toString();
//             console.log("ass");
//             // At this point, we have the headers, method, url and body, and can now
//             // do whatever we need to in order to respond to this request.
//         });
// }).listen(8080); // Activates this server, listening on port 8080.
