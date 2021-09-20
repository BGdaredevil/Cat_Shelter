const db = require("../db/db-controller.js");
const fsReader = require("../utils/fsReader.js");

const homeView = (res) => {
  const catCardPath = "../views/home/catCard.html";
  const homeBasePath = "../views/home/homeBase.html";

  const cardsArr = [];

  db.getCatList().then((cats) => {
    // console.log(cats);
    let catsCards = cats.map((cat) => {
      //   console.log(cat);
      const catCard = fsReader.readView(catCardPath);
      catCard.then((card) => {
        card = card.replace("{{catImageRef}}", "/content/images/" + cat._image.split("\\").pop());
        card = card.replace("{{catBreed}}", cat._breed);
        card = card.replace("{{catDescription}}", cat._catDescription);
        card = card.replaceAll("{{catId}}", cat.id);
        cardsArr.push(card);
        // console.log(card);
      });
      return catCard;
    });
    // console.log(catsCards);
    Promise.allSettled(catsCards).then((results) => {
      results = cardsArr;
      //   results = results.map((r) => r.value);
      results = results.join("");
      //   console.log(results);
      //   console.log(results);
      fsReader.readView(homeBasePath).then((homeV) => {
        homeV = homeV.replace("{{catsListItems}}", results);
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(homeV);
        res.end();
      });
    });
  });
};

module.exports = {
  homeView,
};
