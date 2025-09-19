const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect("mongodb+srv://admin:1234567890@cluster0.rxlttmc.mongodb.net/GreenArray")
const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const userModal = mongoose.model("User", UserSchema);
module.exports={

    userModal
} 
