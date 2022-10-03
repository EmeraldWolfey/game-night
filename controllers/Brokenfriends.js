// const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Friend = require("../models/Friends");

module.exports = {
  getFriendsList: async (req, res) => {
    try {
      // const user = await User.aggregate([
      //   { "$lookup": {
      //     "from": Friend.collection.name,
      //     "let": { "friends": "$friends" },
      //     "pipeline": [
      //       { "$match": {
      //         "recipient": mongoose.Types.ObjectId(req.user.id),
      //         "$expr": { "$in": [ "$_id", "$$friends" ] }
      //       }},
      //       { "$project": { "status": 1 } }
      //     ],
      //     "as": "friends"
      //   }},
      //   { "$addFields": {
      //     "friendsStatus": {
      //       "$ifNull": [ { "$min": "$friends.status" }, 0 ]
      //     }
      //   }}
      // ]);
      // console.log(user)
      res.render("friends-list.ejs")
    } catch (err) {
      console.log(err);
    }
  },  
  
  addFriend: async (req, res) => {
      try {
      
        const senderDoc = await Friend.findOneAndUpdate(
          {requester: req.user.id, recipient: req.params.id},
          {$set: {status: 1}},
          {upsert: true, new: true}
        )


        // await User.findOneAndUpdate(
        //   {_id: req.user.id},
        //   {$push: {friends: {
        //     user: req.params.id,
        //     status: 1
        //   }}}
        // )
        // await User.findOneAndUpdate(
        //   {_id: req.params.id},
        //   {$push: {friends: {
        //     user: req.user.id,
        //     status: 2
        //   }}}
        // )

        // const updateSender = await User.findOneAndUpdate(
        //   {_id: req.user.id},
        //   {$push: senderDoc._id}
        // )

        // const updateReceiver = await User.findOneAndUpdate(
        //   {_id: req.params.id},
        //   {$push: receiverDoc._id}
        // )

        console.log("friend requested ");
        res.redirect(`/profile/${req.params.id}`);
      } catch (err) {
        console.log(err);
      }
    },
  
    acceptFriend: async (req, res) => {
      try {
        Friend.findOneAndUpdate(
          {requester: req.user.id, recipient: req.params.id},
          {$set: {status: 3}}
        )
        Friend.findOneAndUpdate(
          {requester: req.params.id, recipient: req.user.id},
          {$set: {status: 3}}
        )
        console.log("friend accepted ");
        //res.redirect(`/profile/${req.params.id}`); refresh friends page
      } catch (err) {
        console.log(err);
      }
    },

    // rejectFriend: async (req, res) => {

    // }

  };

