const parser = require("../utils/urlParser.js");
const fsReader = require("../utils/fsReader.js");

const routes = {
  styles: (inp, out, urlData) => {
    const method = inp.method;
    fsReader.read(out, method, ".." + urlData.pathname);
  },
  images: (inp, out, urlData) => {
    const method = inp.method;
    fsReader.read(out, method, ".." + urlData.pathname);
  },
  // '/': (inp, out) => {},
};

module.exports = (req, res) => {
  const urlInfo = parser(req);
  const pathName = urlInfo.pathname;
  if (pathName.includes("styles")) {
    routes["styles"](req, res, urlInfo);
    return false;
  }

  if (pathName.includes("images")) {
    routes["images"](req, res, urlInfo);
    return false;
  }

  return true;
};
