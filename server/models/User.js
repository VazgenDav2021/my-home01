import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    family_login: {
      type: String,
      required: true,
      unique: true,
    },
    family_name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    birthday: {
      type: Date,
      required: true,
    },

    isVIP: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
