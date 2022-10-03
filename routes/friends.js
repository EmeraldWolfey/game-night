const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const friendsController = require("../controllers/friends");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/friendsList", ensureAuth, friendsController.getFriendsList);
router.post("/addfriend/:id", friendsController.addFriend);
router.put("/acceptfriend/:id", friendsController.acceptFriend);
// router.put("/rejectFriend/:id", friendsController.rejectFriend);
module.exports = router;
