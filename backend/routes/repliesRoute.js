const router = require("express").Router();
const Reply = require("../models/repliesModel");
const Inquiry = require("../models/inquiriesModel")
const authMiddleware = require("../middlewares/authMiddleware");

// add a reply
// add a reply
router.post("/add-reply", authMiddleware, async (req, res) => {
  try {
    const newReply = new Reply(req.body);

    // Specify the associated inquiry's ID
    newReply.inquiryId = req.body.inquiryId;

    await newReply.save();

    // Update the associated inquiry's replies array
    const inquiry = await Inquiry.findById(req.body.inquiryId);
    inquiry.replies.push(newReply._id);
    await inquiry.save();

    return res.send({ success: true, message: "Reply added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update a reply
router.put("/update-reply/:id", authMiddleware, async (req, res) => {
    try {
      await Reply.findByIdAndUpdate(req.params.id, req.body);
      return res.send({ success: true, message: "reply updated successfully" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  
  // delete a reply
  router.delete("/delete-reply/:id", authMiddleware, async (req, res) => {
    try {
      await Reply.findByIdAndDelete(req.params.id);
      return res.send({ success: true, message: "reply deleted successfully" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  
  // get all replies
  router.get("/get-all-replies", authMiddleware, async (req, res) => {
    try {
      const replies = await Reply.find().sort({ createdAt: -1 });
      return res.send({ success: true, data: replies });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

  
 // Get replies by inquiry ID
router.get("/get-replies-by-inquiry/:inquiryId", async (req, res) => {
  try {
    const inquiryId = req.params.inquiryId;
    console.log(inquiryId)
    const replies = await Reply.find({ inquiryId }).sort({ createdAt: -1 });
    console.log(replies);
    return res.send({ success: true, data: replies });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});


 
  
  module.exports = router;
  