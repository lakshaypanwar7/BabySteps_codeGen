const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware to parse JSON and URL-encoded data for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS for templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import and use routes
const codesRoutes = require("./routes/codes");
app.use("/api/codes", codesRoutes);

// Render the main page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
