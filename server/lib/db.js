import mongoose from 'mongoose';

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(err){
        console.error("Database connection failed:", err);
        process.exit(1);
}
}
export default connectDb;