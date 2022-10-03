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
        const checkOne = await Friend.find({
            requester: req.user.id, 
            recipient: req.params.id,
        })
        const checkTwo =  await Friend.find({
            requester: req.params.id, 
            recipient: req.user.id,
        })
        if(checkOne.length || checkTwo.length){
            throw 'Record already exists'
        } // add alert for user feedback
        


        await Friend.create({
          requester: req.user.id, 
          recipient: req.params.id,
          status: 1,
        });

        console.log("friend requested ");
      } catch (err) {
        console.log(err);
        
      }
      res.redirect(`/profile/${req.params.id}`);
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

