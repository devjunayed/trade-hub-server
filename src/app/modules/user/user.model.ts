import { model, Schema } from "mongoose";
import { TUser, TRole } from "./user.interface";

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
      select: 0,
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


const User = model<TUser>('user', userSchema);

export default User;