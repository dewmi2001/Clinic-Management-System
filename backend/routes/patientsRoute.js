const router = require("express").Router();
const Patient = require("../models/patientsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a patient
router.post("/add-patient", authMiddleware, async (req, res) => {
  try {
     
    // Check if a patient with the same ID card number already exists
    const existingPatient = await Patient.findOne({ id: req.body.id });

    if (existingPatient) {
      return res.send({ success: false, message: "ID card number already exists." });
    }

    const newPatient = new Patient(req.body);
    await newPatient.save();
    return res.send({ success: true, message: "Patient added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update a patint
router.put("/update-patient/:id", authMiddleware, async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Patient updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// delete a patient
router.delete("/delete-patient/:id", authMiddleware, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get all patients
router.get("/get-all-patients", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: patients });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
// get a book by id
router.get("/get-patient-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    return res.send({ success: true, data: patient });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
