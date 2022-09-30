const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
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
  };