const express = require("express");
const router = express.Router();
const db = require("../../models");

// /api/commnet/create 
// post comment route -> back to index
router.post("/create", (req, res, next) => {
   db.Test.create(req.body)
      .then(newComment => {
         console.log(newComment);
         res.redirect("/");
      // optionally return data created
      // res.json(newComment)
      })
      .catch(err => {
         res.status(500);
         next(err);
      });
});

module.exports = router;
var express = require("express");

var router = express.Router();
var burger = require("../models/index.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/index");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for burger.addBurger
  burger.create(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
