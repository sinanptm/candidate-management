import { connect } from "mongoose";
import { MONGOURI } from "./env";

const connectDB = async()=>{
    try {
        await connect(MONGOURI)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;