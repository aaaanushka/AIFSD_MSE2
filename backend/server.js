
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ CLEAN ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));