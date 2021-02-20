var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  date_insert: Date,
  total: Number,
  shipping_cost: Number,
  status_payment: String,
  date_payment: Date,
  status_shipment: Boolean,
  date_shipment: Date,
  delivery_address: String,
  delivery_city: String,
  delivery_zipcode: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "articles" }],
});

var orderModel = mongoose.model("orders", orderSchema);

module.exports = { orderModel };
