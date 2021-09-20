const home = require("./home.js");
const staticFiles = require("./staticFiles.js");
const parser = require("../utils/urlParser.js");
// const fsReader = require("../utils/fsReader.js");
const cats = require("../handlers/cats.js");

const routes = {
  "/": (inp, out, urlData, tokens) => {
    return home(inp, out, urlData);
  },
  content: (inp, out, urlData, tokens) => {
    return staticFiles(inp, out, urlData);
  },
  cats: (inp, out, urlData, tokens) => {
    return cats(inp, out, urlData, tokens);
  },
  "favicon.ico": (inp, out, urlData, tokens) => {
    return staticFiles(inp, out, urlData, tokens);
  },
  // '/': (inp, out, urlData) => {},
};

function mainRouter(req, res) {
  const urlInfo = parser(req);
  const pathName = urlInfo.pathname;
  const urlTokens = pathName.match(/[^\/]+/g);
  let firstToken;
  // console.log(urlTokens);
  if (urlTokens === null) {
    firstToken = "/";
  } else {
    firstToken = urlTokens.shift();
  }

  console.log(firstToken + " _-_-_-_ " + pathName);

  if (routes[firstToken]) {
    routes[firstToken](req, res, urlInfo, urlTokens);
    return true;
  }

  return false;
}

module.exports = mainRouter;
