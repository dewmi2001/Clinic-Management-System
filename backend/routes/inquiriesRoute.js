const router = require("express").Router();
const Inquiry = require("../models/inquiriesModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a inquiry
router.post("/add-inquiry", authMiddleware, async (req, res) => {
  try {
    

    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    return res.send({ success: true, message: "Inquiry added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});


// update a inquiry
router.put("/update-inquiry/:id", authMiddleware, async (req, res) => {
    try {
      await Inquiry.findByIdAndUpdate(req.params.id, req.body);
      return res.send({ success: true, message: "Inquiry updated successfully" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  
  // delete a inquiry
  router.delete("/delete-inquiry/:id", authMiddleware, async (req, res) => {
    try {
      await Inquiry.findByIdAndDelete(req.params.id);
      return res.send({ success: true, message: "Inquiry deleted successfully" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  
  // get all inquiries
  router.get("/get-all-inquiries", authMiddleware, async (req, res) => {
    try {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.send({ success: true, data: inquiries });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  // get a inquiry by id
  router.get("/get-inquiry-by-id/:id", authMiddleware, async (req, res) => {
    try {
      const inquiry = await Inquiry.findById(req.params.id);
      return res.send({ success: true, data: inquiry });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

 

 
  
  module.exports = router;
  