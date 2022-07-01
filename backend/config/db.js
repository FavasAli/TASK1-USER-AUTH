import mongoose from "mongoose"
import  Color from "colors"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB connected : ${conn.connection.host}`.yellow.underline)
  } catch (error) {
    console.log(`Error from mongoDB:${error}`)
    process.exit(1)
  }
}

export default connectDB
