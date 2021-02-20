var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://lacapsule:EXIrgUdaFEllfNSH@cluster0-9xbpy.mongodb.net/blackboard?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);
