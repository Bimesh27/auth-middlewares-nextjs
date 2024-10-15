import mongoose, { Document, mongo } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  
},{timestamps: true});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
