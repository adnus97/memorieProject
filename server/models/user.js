import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // id: { type: String },
    status: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
