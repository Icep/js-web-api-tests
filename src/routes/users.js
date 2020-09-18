var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var schema = require("./validation");
var logger = require("../logger");

const users = [];

/* GET users listing. */
router.get("/", function (req, res) {
  logger.debug("Getting user list");
  res.send(users);
});

/* POST a new user */
router.post("/", function (req, res) {
  logger.debug("Creating user", req.body);
  const userData = schema.validate(req.body);
  if (!userData.error) {
    logger.debug("User data passed schema validation");
    const id = crypto.randomBytes(16).toString("hex");
    const newUser = { ...userData.value, id };
    users.push(newUser);
    res.status(201).send({ id });
  } else {
    logger.warn("Could not create user, invalid data", userData.error);
    res.status(400).send({ errors: userData.error.details[0].message });
  }
});

/* GET a user by id */
router.get("/:id", function (req, res) {
  logger.debug(`Looking for user ${req.params.id}`);
  const u = users.find((v) => v.id === req.params.id);
  if (u) {
    res.status(200).send(u);
  } else {
    res.status(404).send("");
  }
});

/* DELETE a user by id */
router.delete("/:id", function (req, res) {
  logger.debug(`Deleting user ${req.params.id}`);
  const ix = users.findIndex((v) => v.id === req.params.id);

  if (ix >= 0) {
    users.splice(ix, 1);
    res.status(202).send("");
  } else {
    res.status(404).send("");
  }
});

/* POST a user update */
router.post("/:id", function (req, res) {
  logger.debug(`Update user ${req.params.id}`);
  const userData = schema.validate(req.body);
  if (!userData.error) {
    const ix = users.findIndex((v) => v.id === req.params.id);
    if (ix > 0) {
      const newUser = { ...userData.value, id: req.params.id };
      users[ix] = newUser;
      res.status(200).send({ id: req.params.id });
    } else {
      res.status(404).send("");
    }
  } else {
    res.status(400).send({ errors: userData.error.details[0].message });
  }
});

module.exports = router;
