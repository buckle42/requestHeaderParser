// server.js
// where your node app starts

// init project
const express = require('express')
const ipware = require('ipware')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get('/whoami', (request, response) => {
  // requests remote headers and splits into array based on comma
  var ipaddress = request.headers['x-forwarded-for'].split(',');
  // selects first ip address from array
  ipaddress = ipaddress[0];
  var language = request.get('accept-language').split(',');
  language = language[0];
  // there's probably a more elegant way to do this
  var software = request.get('User-Agent').split('(');
  software = software[1].split(')');
  software = software[0];
  // JSON output of required variables
  var ipJSON = {
    "ipaddress":ipaddress,
    "language":language,
    "software":software
  }
  response.send(JSON.stringify(ipJSON));
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
  // check string for unix or natural date
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
