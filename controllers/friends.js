
const Post = require("../models/Post");
const User = require("../models/User");
const Friend = require("../models/Friends");

module.exports = {
  getFriendsList: async (req, res) => {
    try {
     
      res.render("friends-list.ejs")
    } catch (err) {
      console.log(err);
    }
  },  
  
  addFriend: async (req, res) => {
      try {

        await User.updateMany(
            { _id: req.params.id, _id: req.user.id},
            {
              $push: { friends:{friendId: req.params.id, friendStatus: 1} 
              },
            }
          );

        console.log("friend requested ");
        res.redirect(`/profile/${req.params.id}`);
      } catch (err) {
        console.log(err);
      }
    },
  
    acceptFriend: async (req, res) => {
      try {
       
        console.log("friend accepted ");
        //res.redirect(`/profile/${req.params.id}`); refresh friends page
      } catch (err) {
        console.log(err);
      }
    },

    // rejectFriend: async (req, res) => {

    // }

  };
