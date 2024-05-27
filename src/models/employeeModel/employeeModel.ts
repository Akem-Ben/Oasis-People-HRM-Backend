import mongoose, { Schema } from "mongoose";


type SocialAccount = {
  slackId: string;
  twitterId: string;
  skypeId: string;
  githubId: string;
}

const socialAccountSchema = new Schema<SocialAccount>({
  slackId: { type: String },
  twitterId: { type: String },
  skypeId: { type: String },
  githubId: { type: String },
});


export interface IEmployee extends Document {
  _id: string;
  firstName: string;
  image: string;
  lastName: string;
  middleName: string;
  employeeId: string;
  nextOfKin: string;
  password: string;
  gender: string;
  phone: string;
  email: string;
  workEmail: string;
  birthDate: Date;
  maritalStatus: string;
  nationality: string;
  homeAddress: string;
  city: string;
  district: string;
  zipCode: string;
  department: string;
  designation: string;
  employeeType: string;
  contractType: string;
  workingDays: string[];
  hireDate: Date;
  socialAccounts: SocialAccount[];
  bankBranch: string;
  bankAccountNumber: string;
  accountName: string;
  isManager: boolean;
  leaveDaysGiven: number;
  usedLeaveDays: number;
  totalDaysLeft: number;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName: {
      type: String,
    },
    image: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    password: {
      type: String,
    },
    employeeId: {
      type: String,
    },
    nextOfKin: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    workEmail: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    maritalStatus: {
      type: String,
    },
    nationality: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    employeeType: {
      type: String,
    },
    contractType: {
      type: String,
    },
    workingDays: {
      type: [String],
    },
    hireDate: {
      type: Date,
    },
    socialAccounts: { 
      type: [socialAccountSchema],
    },
    bankBranch: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    isManager: {
      type: Boolean,
      default: false
    },
    leaveDaysGiven: {
      type: Number,
    },
    usedLeaveDays: {
      type: Number,
    },
    totalDaysLeft: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema)

export default Employee;
