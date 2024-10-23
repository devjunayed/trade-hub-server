import { model, Schema } from "mongoose";
import { TUser, TRole } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(TRole),
      default: TRole.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// encrypting user password
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    console.log(user.password)
    user.password = await bcrypt.hash(
      user.password,
      Number(config.salt_rounds)
    );
    next();
  } catch (error) {
    console.log(error);
  }
});
const User = model<TUser>("user", userSchema);

export default User;
