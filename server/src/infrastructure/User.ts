import { model, Schema } from "mongoose";
import IUser from "../domain/IUser";

const userSchema = new Schema<IUser>({
    email: { type: String, required:true, index:true },
    name: { type: String, required:true },
    password: { type: String, required: true },
    address: { type: String },
    mobile: { type: Number },
    profile: { type: String },
    resume: { type: String },
    token: { type: String },
});

const User = model("User", userSchema);
export default User;