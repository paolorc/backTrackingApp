const http = require('http');
const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');
const fs = require('fs'),
  path = require('path');

const SocketIO = require('socket.io');


const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello, World!\n');

  //Habilitamos el CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'HEAD,GET,POST,PUT,PATCH,OPTIONS,DELETE'); //GET,PUT,POST,DELETE
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'x-access-token,Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.io = io;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
  };

  switch (req.method) {

    case 'OPTIONS':
      res.writeHead(204, headers);
      res.end();
      return;

      break;

    case "GET":
      if (req.url === "/") {
        res.end();
      }

      else if (req.url === "/apijs") {

        console.log('-->Se visito una pagina nueva..');
        res.writeHead(200, { 'Content-Type': 'Text/javascript' });
        var myReadStream = fs.createReadStream(__dirname + '/core/api.js');
        myReadStream.pipe(res);
      }

      else if (req.url === "/login.html") {
        console.log('-->Login page');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        var myReadStream = fs.createReadStream(__dirname + '/src/login.html', 'utf8');
        myReadStream.pipe(res);

      }

      else if (req.url === "/panel.html") {
        console.log('-->Panel page');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        var myReadStream = fs.createReadStream(__dirname + '/src/panel.html', 'utf8');
        myReadStream.pipe(res);

      }

      // Leemos archivos css desde src
      else if (req.url.match("\.css$")) {

        let cssPath = path.join(__dirname, 'src', req.url)
        // console.log(cssPath);
        var myReadStream = fs.createReadStream(cssPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        myReadStream.pipe(res);

      }

      // Leemos archivos png desde src
      else if (req.url.match("\.png$")) {

        let pngPath = path.join(__dirname, 'src', req.url)
        // console.log(pngPath);
        var myReadStream = fs.createReadStream(pngPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'image/png' });
        myReadStream.pipe(res);

      }

      // Leemos archivos js desde src
      else if (req.url.match("\.js$")) {

        let jsPath = path.join(__dirname, 'src', req.url)
        // console.log(jsPath);
        var myReadStream = fs.createReadStream(jsPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/javacsript' });
        myReadStream.pipe(res);

      }

      else if (req.url === "/listDataHeaderAdmin") {

        console.log('-->Se listo header panel..');
        adminController.listDataHeaderAdmin(req, res);
      }

      else if (req.url === "/listDataAdmin") {

        console.log('-->Se visito una pagina nueva..');
        adminController.listDataAdmin(req, res);
      }

      else {
        let idUser = "[0-9]+";
        let patt = new RegExp("/getSessionData/" + idUser);

        if (patt.test(req.url)) {
          patt = new RegExp(idUser);

          let user = patt.exec(req.url);
          mainController.listSessionData(req, res, user);
        }

      }


      break;

    case "POST":
      if (req.url === "/insertSessionVisit") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          mainController.insertSessionVisit(req, res, reqBody);
        });

      }

      else if (req.url === "/insertWebpageVisit") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          mainController.insertWebpageVisit(req, res, reqBody);
        });
      }

      else if (req.url === "/updateTimeOnPage") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          mainController.updateTimeOnPage(req, res, reqBody);
        });
      }

      else if (req.url === "/webpage/linkclicked") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          mainController.insertLinkClicked(req, res, reqBody);
        });
      }

      else if (req.url === "/admin/login") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          adminController.login(req, res, reqBody);
        });
      }

      break;

    case "PUT":
      if (req.url === "/") {
        res.end();
      }
      else if (req.url === "/updateTimeOnPage") {
        let reqBody = "";
        req.on("data", (data) => {
          reqBody += data;

          if (reqBody.length > 1e7) {//10MB

          }
        });
        req.on("end", () => {
          mainController.updateTimeOnPage(req, res, reqBody);
        });
      }

      break;

    case "DELETE":
      if (req.url === "/") {
        res.end();
      }
      else if (req.url === "/user") {
        mainController.listDataUserId(req, res);
      }

      break;

    default:

      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Pagina no encontrada..\n');

      break;

  }

});

const servidor = server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const io = SocketIO(servidor);

io.on('connection', function (socket) {
  console.log('-->SOCKET KEY: ' + socket.id);

  socket.on("disconnect", function () {
    console.log('DISCONNECT key: ' + socket.id);
    
  });


});