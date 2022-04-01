const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: String,
  image: String,
  path: String
}, {
    timestamps: true
});

module.exports  = mongoose.model("images", imageSchema);