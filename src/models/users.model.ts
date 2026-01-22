import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  canPix: {
    type: Boolean,
    required: true,
    default: false,
  }, 
  key_type: {
    type: String,
    required: false,
    default: ""
  },
  key: {
    type: String,
    required: false,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    required: false,
    default: ""
  },
  reference: {
    type: String,
    required: false,
    default: "DESCOLARES PASSAGEM DESCONTO LTDA"
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("user", userSchema);
export default User;