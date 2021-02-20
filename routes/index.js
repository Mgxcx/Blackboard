var express = require("express");
var router = express.Router();
var articleData = require("../models/articles");
var orderData = require("../models/orders");
var userData = require("../models/users");

/* GET home page. */
router.get("/", async function (req, res, next) {
  var articleUnavailable = await articleData.articleModel.find({ stock: 0 });
  var admin = await userData.userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render("index", { articleUnavailable, messages: admin.messages, tasks: admin.tasks });
});

/* GET tasks page. */
router.get("/tasks-page", async function (req, res, next) {
  var admin = await userData.userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render("tasks", { tasks: admin.tasks });
});

/* GET Messages page. */
router.get("/messages-page", async function (req, res, next) {
  var admin = await userData.userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render("messages", { messages: admin.messages });
});

/* GET Users page. */
router.get("/users-page", async function (req, res, next) {
  var userList = await userData.userModel.find({ status: "customer" });
  res.render("users", { userList });
});

/* GET Catalog page. */
router.get("/catalog-page", async function (req, res, next) {
  var articleList = await articleData.articleModel.find();
  res.render("catalog", { articleList });
});

/* GET Orders-list page. */
router.get("/orders-list-page", async function (req, res, next) {
  var orderList = await orderData.orderModel.find();
  res.render("orders-list", { orderList });
});

/* GET Order detail page. */
router.get("/order-page", async function (req, res, next) {
  var orderid = req.query.id;
  var orderPage = await orderData.orderModel.findById(orderid).populate("articles").exec();
  res.render("order", { orderPage });
});

/* GET chart page. */
router.get("/charts", async function (req, res, next) {
  var user = await userData.userModel.find();
  var numMale = 0;
  var numFemale = 0;
  for (var i = 0; i < user.length; i++) {
    if (user[i].gender == "male") {
      numMale++;
    } else {
      numFemale++;
    }
  }

  var admin = await userData.userModel.findById("5c52e4efaa4beef85aad5e52");
  var messages = admin.messages;
  var readMessages = 0;
  var unreadMessages = 0;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].read == true) {
      readMessages++;
    } else {
      unreadMessages++;
    }
  }

  var orders = await orderData.orderModel.find();
  var deliveredOrders = 0;
  var undeliveredOrders = 0;
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].status_payment == "validated" && orders[i].status_shipment == true) {
      deliveredOrders++;
    } else if (orders[i].status_payment == "validated" && orders[i].status_shipment == false) {
      undeliveredOrders++;
    }
  }

  var aggregate = orderData.orderModel.aggregate();
  aggregate.group({
    _id: { yearinsert: { $year: "$date_insert" }, monthinsert: { $month: "$date_insert" } },
    totalSales: { $sum: { $sum: ["$total", "$shipping_cost"] } },
  });
  aggregate.sort({ _id: 1 });

  var data = await aggregate.exec();

  res.render("charts", { numMale, numFemale, readMessages, unreadMessages, deliveredOrders, undeliveredOrders, data });
});

module.exports = router;
