/*
**  Nuxt
*/

// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();

const http = require("http");
const { Nuxt, Builder } = require("nuxt");
let config = require("./nuxt.config.js");
config.rootDir = __dirname; // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);
const server = http.createServer(nuxt.render);
// Build only in dev mode
if (config.dev) {
	builder.build().catch(err => {
		console.error(err); // eslint-disable-line no-console
		process.exit(1);
	});
}
// Listen the server
server.listen();
const _NUXT_URL_ = `http://localhost:${server.address().port}`;
console.log(`Nuxt working on ${_NUXT_URL_}`);

/*
** Electron
*/
let win = null; // Current window
const electron = require("electron");
const path = require("path");
const app = electron.app;
const newWin = () => {
	win = new electron.BrowserWindow({
		icon: path.join(__dirname, "static/icon.png")
	});
	win.maximize();
	win.on("closed", () => (win = null));
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require("electron-devtools-installer");
		installExtension(VUEJS_DEVTOOLS.id)
			.then(name => {
				console.log(`Added Extension:  ${name}`);
				win.webContents.openDevTools();
			})
			.catch(err => console.log("An error occurred: ", err));
		// Wait for nuxt to build
		const pollServer = () => {
			http.get(_NUXT_URL_, res => {
				if (res.statusCode === 200) {
					win.loadURL(_NUXT_URL_);
				} else {
					setTimeout(pollServer, 300);
				}
			}).on("error", pollServer);
		};
		pollServer();
	} else {
		return win.loadURL(_NUXT_URL_);
	}
};

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post("/test", function(req, res) {
// 	console.log("aa");
// 	var query1 = request.body.firstName;
// 	var query2 = request.body.lastName;
// 	res.end("yes");
// });

app.on("ready", newWin);
app.on("window-all-closed", () => app.quit());
app.on("activate", () => win === null && newWin());

var express = require("express");
// var bodyParser = require("body-parser");
var appE = express();
var cors = require("cors");

appE.use(cors());

appE.options("*", cors()); // include before other routes

appE.post("/", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify({ a: 1 }));
});

appE.listen(8080, function() {
	console.log("Example app listening on port 8080!");
});

//create a server object:
// http.createServer(function(req, res) {
// 	// res.write("Hello World!"); //write a response to the client
// 	// res.end(); //end the response
// 	appE.get("/", function(req, res) {
// 		// res.setHeader("Content-Type", "application/json");
// 		res.send("Rendering file");
// 	});

// res.send(JSON.stringify({ a: 1 }));
// }).listen(8080); //the server object listens on port 8080
