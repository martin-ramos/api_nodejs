const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  apellido: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);