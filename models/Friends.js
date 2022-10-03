const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Number,
    enums: [
        1, // 'requested'
        2, // 'friends'
    ]
  },

});

module.exports = mongoose.model("Friends", FriendsSchema);