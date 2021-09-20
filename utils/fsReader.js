const fs = require("fs");
const { resolve } = require("path");
const path = require("path");

const fileTypes = {
  html: "text/html",
  css: "text/css",
  ico: "image/ico",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
};

const read = (outStream, method, loc) => {
  const filepath = path.normalize(path.join(__dirname, loc));
  const fileStream = fs.createReadStream(filepath);

  const type = loc.split(".").pop();

  fileStream.on("open", () => {
    outStream.writeHead(200, "OK", { "Content-type": fileTypes[type] });
    fileStream.pipe(outStream);
  });

  fileStream.on("error", (err) => {
    outStream.writeHead(404, "ERROR", { "Content-type": fileTypes[type] });
    outStream.end(err);
  });

  // console.log("found it " + filepath);
};

const readView = (loc) => {
  const filepath = path.normalize(path.join(__dirname, loc));
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  read,
  readView,
};
