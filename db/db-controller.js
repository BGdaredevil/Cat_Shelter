const fs = require("fs");
const path = require("path");

const pathToBreeds = path.normalize(path.join(__dirname, "./breeds.json"));
const pathToCats = path.normalize(path.join(__dirname, "./cats.json"));

const promiseFsReadFile = (p) => {
  return new Promise((res, rej) => {
    fs.readFile(p, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        rej(err);
      }
      res(JSON.parse(data));
    });
  });
};

const getBreedsList = () => {
  return promiseFsReadFile(pathToBreeds);
};

const addBreed = (breed) => {
  return getBreedsList()
    .then((br) => {
      if (!br.includes(breed)) {
        br.push(breed);
      }
      return br;
    })
    .then((br) => {
      fs.writeFile(pathToBreeds, JSON.stringify(br), "utf8", (e) => console.error(e));
    });
};

const removeBreed = (breed) => {
  return getBreedsList()
    .then((br) => {
      br = br.filter((x) => x != breed);
      return br;
    })
    .then((br) => {
      fs.writeFile(pathToBreeds, JSON.stringify(br), "utf8", (e) => console.error(e));
    });
};

const getCatList = () => {
  return promiseFsReadFile(pathToCats);
};

const addCat = (cat) => {
  return getCatList()
    .then((c) => {
      c.push(cat);
      return c;
    })
    .then((cc) => fs.writeFile(pathToCats, JSON.stringify(cc), "utf8", (e) => console.error(e)));
};

const removeCat = (catId) => {
  return getCatList()
    .then((cats) => {
      cats = cats.filter((c) => c.id != catId);
      return cats;
    })
    .then((c) => fs.writeFile(pathToCats, JSON.stringify(c), "utf8", (e) => console.error(e)));
};

const db = { getBreedsList, addBreed, removeBreed, getCatList, addCat, removeCat };

module.exports = db;
