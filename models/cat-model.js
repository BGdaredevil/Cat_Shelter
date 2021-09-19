const uniqid = require("uniqid");

class Cat {
  constructor(input) {
    this.id = uniqid();
    this.name = input.name;
    this.description = input.description;
    this.image = input.image;
    this.breed = input.breed;
  }

  set name(str) {
    let isValid = true;
    if (str.trim() === "") {
      isValid = false;
    }
    if (typeof str != "string") {
      isValid = false;
    }
    if (isValid) {
      this._name = str;
    } else {
      throw new Error("invalid name");
    }
  }

  get name() {
    return this._name;
  }

  set description(str) {
    let isValid = true;
    if (str.trim() === "") {
      isValid = false;
    }
    if (typeof str != "string") {
      isValid = false;
    }
    if (isValid) {
      this._description = str;
    } else {
      throw new Error("invalid description");
    }
  }

  get description() {
    return this._description;
  }

  set image(str) {
    let isValid = true;
    if (str.trim() === "") {
      isValid = false;
    }
    if (typeof str != "string") {
      isValid = false;
    }
    if (isValid) {
      this._image = str;
    } else {
      throw new Error("invalid image");
    }
  }

  get image() {
    return this._image;
  }

  set breed(str) {
    let isValid = true;
    if (str.trim() === "") {
      isValid = false;
    }
    if (typeof str != "string") {
      isValid = false;
    }
    if (isValid) {
      this._breed = str;
    } else {
      throw new Error("invalid breed");
    }
  }

  get breed() {
    return this._breed;
  }
}

module.exports = Cat;
