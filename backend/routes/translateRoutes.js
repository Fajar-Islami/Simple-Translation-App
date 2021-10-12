const route = require("express").Router();
const TranslateControllers = require("../controller/translateControllers");

route.post("/", TranslateControllers.postTranslate);

module.exports = route;
