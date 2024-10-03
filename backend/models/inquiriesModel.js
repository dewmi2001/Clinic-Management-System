const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    
    ifname: {
      type: String,
      required: true,
    },
    ilname: {
      type: String,
      required: true,

    },
    iemail: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
   
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "replies",
      },
    ],

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

module.exports = mongoose.model("inquiries", inquirySchema);
