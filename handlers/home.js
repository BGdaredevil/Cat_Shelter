// const path = require("path");
// const fs = require("fs");

const parser = require("../utils/urlParser.js");
const fsReader = require("../utils/fsReader.js");
const homeView = require("./viewEngine.js").homeView;

const routes = {
  "/": (inp, out, urlData) => {
    const method = inp.method;
    // fsReader.read(out, method, "../views/home/index.html");
    homeView(out);
  },
  // '/': (inp, out) => {},
};

module.exports = (req, res) => {
  const urlInfo = parser(req);
  const pathName = urlInfo.pathname;

  if (routes[pathName]) {
    routes[pathName](req, res, urlInfo);
    return false;
  }

  return true;
};
