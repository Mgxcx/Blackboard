var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  description: String,
  weight: Number,
  price: Number,
  stock: Number,
  img: String,
});

var articleModel = mongoose.model("articles", articleSchema);

module.exports = { articleModel };
