import mongoose, { Schema } from "mongoose";

export interface IHr {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designation: string;
  isManager: boolean;
  phone: string;
}

const HrSchema = new Schema<IHr>(
  {
    firstName: {
      type: String,
    },
    phone: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    isManager: {
      type: Boolean,
    },
    password: {
      type: String,
    },
    designation: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

const HR = mongoose.model<IHr>('HR', HrSchema)

export default HR
