//const debug = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const express = require('express');
const http = require('http');
const url = require('url');
const fs = require('fs');
const dt = require('./middleware/datemodule'); // calls datemodule.js - stores object as "dt"
const logger = require('./middleware/logger'); // calls logger.js - stores object as "logger"
const auth = require('./middleware/auth'); // calls auth.js - stores object as "auth"
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express(); // this is an object returned from the top-level express function

//console.log(__filename);
//console.log(__dirname);
console.log(dt.myDateTime());  // test call to the datetime module

app.set('view engine', 'pug'); // load view enging "pug" - to return html markup to the client
app.set('views', './views'); // optional, this is the default

/* middleware either takes a request object and returns a response or passes the control to another middleware function */
//app.use(logger);
//app.use(auth);
app.use(express.json());  /* returns a middleware function that reads the request
body and if there is a json object in the body, it will parse the body into a json
object and set req.body property.. */
app.use(express.static('public'));
app.use('/api/courses', courses);  // for any routes that start with /api/course - use courses module/router
app.use('/', home);  // for any routes that go to "/" - use the home module/router

//const hostname = '127.0.0.1';
//const port = 8080;

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*
fs.readFile('index.html', (err, html) => {    // confirm and create the html file that will be used in the client response..
  console.log('I am checking for the index.html file now...');
  if(err){
    console.log('---it appears that index.html does not exist---');
    throw err; //throw error if index.html doesn't exist
  }
      const server = http.createServer((req, res) => {
        console.log('I am creating the http server object now...');
        //res.writeHead(200, {'Content-type' : 'text/css'});
        //var fileContents = fs.readFileSync('./example.css', {encoding: 'utf8'});
        //res.write(fileContents);
        //res.end();

        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');  // response to requestor (client)...
        res.write(html);
        res.write("The date and time is currently: " + "</br>" + "</br>"+ dt.myDateTime() + "</br>" + "</br>");
        console.log("I just finished writing to html file...");
      if (req.url) {
          //console.log('CSS Function Read At: ' + dt.myDateTime());
          console.log('I am confirming that req.url is true here...');
      }

      ### this was commented out ###
        if (req.url === './styles.css') {
          res.writeHead(200, {'Content-type' : 'text/css'});
          var fileContents = fs.readFileSync('./styles.css', {encoding: 'utf8'});
          res.write(fileContents);
          console.log('CSS Function Read At: ' + dt.myDateTime());
        }

        // parse the url, separate into host, path and search, log output
        //var u = url.parse(req.url, true); // if url exists, parse the path
        //console.log("Hostname = " + u.host + "</br>");
        //console.log("Path = " + u.pathname + "</br>");
        //console.log("Search = " + u.search) + "</br>";
        //console.log("Month = " + u.query.month);
        //res.write("Year: " + u.query.year + "</br> Month: " + u.query.month + "</br> Day: " + u.query.day + "</br> Full Path: ");
        res.write(req.url);
        console.log("Im about to call the res.end function..");
        res.end();
        console.log("I finished calling the res.end funtion...");
      });

      server.listen(port, hostname, () => {
        var i = 0;
        console.log('Server started on port ' + port);
        console.log("I am in the server.listen function..: " + i);
        i++;
        console.log('The value of i is : ' + i);
      });
}); // end of fs.readFile function...
*/

/*


function css(request, response) {
  if (request.url === 'views/styles.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./styles.css', {encoding: 'utf8'});
    response.write(fileContents);
    console.log('CSS Function Read At: ' + dt.myDateTime());
  }
}
*/
/*
// Append date and time to log file
fs.appendFile('log.txt', "Server started at : " + dt.myDateTime() + "\r\n", function (err) {
  if (err) throw err;
  //console.log('Timestamp: ' + dt.myDateTime())
  console.log('I just finished appending the log file..');;
});
*/
console.log('I am waiting for something to happen...');
