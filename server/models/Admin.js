import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Admin", AdminSchema);
