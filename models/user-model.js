const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, default: "Awesome Guest" },
    password: { type: String, required: [true, "Password is required."] },
    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    activationLink: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;
