const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Grievance = require("../models/GrievanceModel");
const verifyToken = require("../middleware/verifyToken");


// ================= CREATE =================
router.post("/", verifyToken, async (req, res) => {
  try {
    const grievance = new Grievance({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: "Pending",
      userId: new mongoose.Types.ObjectId(req.user.id) // ✅ IMPORTANT
    });

    await grievance.save();
    res.json(grievance);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating grievance" });
  }
});


// ================= GET + SEARCH =================
router.get("/", verifyToken, async (req, res) => {
  try {
    const { search } = req.query;

    const userId = new mongoose.Types.ObjectId(req.user.id);

    let query = { userId };

    if (search) {
      query = {
        userId,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ]
      };
    }

    const data = await Grievance.find(query);
    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching grievances" });
  }
});


// ================= DELETE =================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;