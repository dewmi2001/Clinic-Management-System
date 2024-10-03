const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
   
    named: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },

    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inquiries",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("replies", replySchema);
