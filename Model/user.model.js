const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: {type:String,Unique:true}
        }
      }
)

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}