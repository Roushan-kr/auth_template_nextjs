import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    const db = await mongoose.connect(mongoUri); // for force resolving it use MONGO_URI! as it is non-null assertion operator

    const connection = db.connection;

    connection.on("connected", () => {
        console.log("Database connected successfully");
        console.log("Database connected to: ", db.connection.name);
    })

    connection.on("error", (error) => {
        console.log("Database connection error: ", error.message);
    })
    
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1)
  }
}
