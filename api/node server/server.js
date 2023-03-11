//server creaction
//1 https server module
const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const server = http.createServer((req, res) => {
  console.log("request has been made");
  //   console.log(req.method);
  //   console.log(req.url);
  let num = _.random(0, 20);
  //lodash examples
  const greet = _.once(() => {
    console.log("hellow");
  });
  greet();
  greet();
  console.log(num);
  let path = "./view";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }
  res.setHeader("Content-Type", "text/html ");
  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      res.write(fileData);
      res.end();
    }
  });
});

server.listen(3000, (req, res) => {
  console.log("server is listining on port 3000");
});
