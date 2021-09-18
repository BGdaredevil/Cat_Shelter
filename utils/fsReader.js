const fs = require("fs");
const path = require("path");

const fileTypes = {
  html: "text/html",
  css: "text/css",
  ico: "image/ico",
};

const read = (outStream, method, loc) => {
  const filepath = path.normalize(path.join(__dirname, loc));
  const fileStream = fs.createReadStream(filepath);

  const type = loc.split(".").pop();

  //   console.log("-------------" + filepath);

  fileStream.on("open", () => {
    outStream.writeHead(200, "OK", { "Content-type": fileTypes[type] });
    fileStream.pipe(outStream);
  });

  fileStream.on("error", (err) => {
    outStream.writeHead(404, "ERROR", { "Content-type": fileTypes[type] });
    outStream.end(err);
  });

  console.log("found it " + filepath);
};

module.exports = {
  read,
};
