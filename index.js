var http = require('http')
var fs = require('fs')
var rcswitch = require('rcswitch')
var rcswitchDataPin = 0

var server = http.createServer(function(req, res) {
  console.log("Request: " + req.url)
  var url = require('url').parse(req.url, true)

  if (url.pathname == '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)

  } else if (url.pathname == '/data') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'value' : "This message came from the server using AJAX! Such technology is sure to take off!" }))

  } else if (url.pathname == '/on') {
    rcswitch.enableTransmit(rcswitchDataPin)
    rcswitch.switchOn(url.query.group, Number(url.query.switch))
    res.writeHead(204)
    res.end()
  
  } else if (url.pathname == '/off') {
    rcswitch.enableTransmit(rcswitchDataPin)
    rcswitch.switchOff(url.query.group, Number(url.query.switch))
    res.writeHead(204)
    res.end()
  }
})

server.listen(8000)
