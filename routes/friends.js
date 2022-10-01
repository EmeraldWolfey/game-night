const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const friendsController = require("../controllers/friends");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/friendsList", ensureAuth, friendsController.getFriendsList);
router.put("/acceptfriend/:id", friendsController.acceptFriend)
module.exports = router;
