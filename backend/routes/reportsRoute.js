const router = require("express").Router();
const Patient = require("../models/patientsModel");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/get-reports", authMiddleware, async (req, res) => {
  try {
    const allPatients = await Patient.find();
    const recentlyDeletedPatients = await Patient.findRecentlyDeleted();

    const patientsCount = allPatients.length;
    const recentlyDeletedCount = recentlyDeletedPatients.length;

   
    
    res.send({
        success: true,
        data: {
          patients: {
            patientsCount,
            recentlyDeletedCount,
          },
        },
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
