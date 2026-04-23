const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Grievance", grievanceSchema);