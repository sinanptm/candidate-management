import { connect } from "mongoose";
import { MONGO_URI } from "./env";

const connectDB = async()=>{
    try {
        await connect(MONGO_URI)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;