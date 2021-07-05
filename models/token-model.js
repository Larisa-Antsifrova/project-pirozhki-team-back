const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TokenModel = model("token", TokenSchema);

module.exports = TokenModel;
