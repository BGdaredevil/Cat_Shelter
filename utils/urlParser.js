const url = require("url");

const baseURL = "http://localhost:3030";

module.exports = (req) => {
  const completeURLinfo = new URL(baseURL + req.url);
  return {
    urlObj: completeURLinfo,
    pathname: completeURLinfo.pathname,
  };
};
