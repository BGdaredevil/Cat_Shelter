const http = require("http");

const handler = require("./handlers");

// const parser = require("./utils/urlParser.js");

const port = 3030;

const server = http.createServer((req, res) => {
  //   console.log(req.method);
  //   console.log(parser(req).pathname);

  if (!handler(req, res)) {
    res.writeHead(404);
    res.write("404 - Not Found");
    res.end();
  }
});
console.log(`Server is listening on port ${port}...`);
server.listen(port);
