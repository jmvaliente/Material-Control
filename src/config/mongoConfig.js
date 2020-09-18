const mongoose = require("mongoose");

mongoose
  .connect(process.env.DDBB_URL || "mongodb://localhost/materialControl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((msg) => console.log("Conected to database"))
  .catch((err) => console.log("Error conect to database"));

module.exports = mongoose;
