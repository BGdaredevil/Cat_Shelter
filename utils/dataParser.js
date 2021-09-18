const qs = require("querystring");
// const concat = require("concat-stream");

// const getData = (input) => {
//   let data = [];
//   input.on("data", (a) => data.push(a));
//   input.on("end", () => {
//     let rawData = Buffer.concat(data).toString();
//     console.log(rawData);
//   });
// };

const getData = (input) => {
  let data = [];
  input.on("data", (a) => data.push(a));
  input.on("end", () => {
    let rawData = Buffer.concat(data).toString();
    const dataa = qs.parse(rawData);
    console.log(dataa);
    // console.log(rawData);
  });

  //   Buffer.concat(input, (buffer) => {
  //     const data = qs.parse(buffer.toString());
  //     console.log(data);
  //   });
};

const parser = { getData };

module.exports = parser;
