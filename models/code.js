const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 },
  used: { type: Boolean, default: false },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
