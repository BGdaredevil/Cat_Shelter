const fs = require("fs");
const path = require("path");

const formidable = require("../node_modules/formidable");

const validateFileExt = (file) => {
  const type = file.type.split("/").pop();
  const validFiles = ["png", "jpg", "jpeg", "bmp"];
  if (!validFiles.includes(type)) {
    return true;
  }
  console.log(file.name);
};

const getData = (input) => {
  const form = formidable.IncomingForm();
  form.uploadDir = `${__dirname}/../uploads`;
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024;
  form.keepExtensions = true;
  // console.log(form);

  return new Promise((resolve, reject) => {
    form.parse(input, (err, field, file) => {
      const theData = { fields: field };
      if (err) {
        reject(err);
      }

      if (validateFileExt(file.upload)) {
        fs.unlinkSync(file.upload.path);
        reject("invalid file");
        return;
      }
      const filename = file.upload.name.replace(/\s/g, "-");
      fs.renameSync(file.upload.path, path.join(__dirname, `../content/images/${filename}`));
      theData.image = path.join(__dirname, `../content/images/${filename}`);
      resolve(theData);
    });
  });
};

const parser = { getData };

module.exports = parser;
