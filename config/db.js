import mongoose from 'mongoose';
import colors from 'colors';

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);

    }
    catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);

    }
}

export default connectDB;