import mongoose from "mongoose";

let conn: typeof mongoose;

export const database = async () => {
  if (conn) {
    return conn;
  } else {
    conn = await mongoose.connect("mongodb+srv://andaobong:8RhWB1aDgVSAtdr2@cluster0.twfwc1c.mongodb.net/oasis_hrm");
    console.log("Database connected");
    return conn;
  }
};