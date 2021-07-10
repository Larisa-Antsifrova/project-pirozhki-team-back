const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
    },
    income: {
      type: Boolean,
      required: [true, "Category income is required."],
      default: false,
    },
    color: {
      type: String,
      default: "#009688",
    },
    icon: {
      type: String,
      default: "money-icon",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Category = model("category", categorySchema);

module.exports = Category;
