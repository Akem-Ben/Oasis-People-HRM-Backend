import mongoose from "mongoose";

let conn: typeof mongoose;

export const database = async () => {
  if (conn) {
    return conn;
  } else {
    conn = await mongoose.connect("mongodb+srv://andaobong:8RhWB1aDgVSAtdr2@cluster0.twfwc1c.mongodb.net/oasis_hrm", {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log("Database connected");
    return conn;
  }
};