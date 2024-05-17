var mongoose = require("mongoose");
 var plm = require("passport-local-mongoose");
mongoose.connect('mongodb://Localhost/register');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  profile: String,
  like: {
    type: Number,
    default:0,
  }
});
 userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema)