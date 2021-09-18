// const path = require("path");
// const fs = require("fs");

const parser = require("../utils/urlParser.js");
const fsReader = require("../utils/fsReader.js");

const routes = {
  "add-breed": (inp, out, urlData) => {
    const method = inp.method;
    fsReader.read(out, method, "../views/addBreed.html");
  },
  "add-cat": (inp, out, urlData) => {
    const method = inp.method;
    fsReader.read(out, method, "../views/addCat.html");
  },
  // '/': (inp, out) => {},
};

module.exports = (req, res, urlInfo, tokens) => {
  const pathName = urlInfo.pathname;
  //   console.log(tokens);

  if (routes[tokens[0]]) {
    routes[tokens[0]](req, res, urlInfo);
    return false;
  }

  return true;
};
