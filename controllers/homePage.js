const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");




router.get("/groups", withAuth, async (req, res) => {
    try {
        res.render("groupsPage");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get("/events", withAuth, async (req, res) => {
    try {
        res.render("eventsPage");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/login", async (req, res) => {
    try {
      if (req.session.loggedIn) {
        res.redirect("/");
        return;
      } else {
        res.render("login");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get("/signup", async (req, res) => {
    try {
      if (req.session.loggedIn) {
        res.redirect("/");
      } else {
        res.render("signup");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });