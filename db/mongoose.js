//Set up mongoose connection
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = null;

const connectDB = async () => {
  let mongo_uri =
    "mongodb+srv://kogoh87581:1jaOgwB8DSYY45u0@cluster0.lspzhku.mongodb.net/wallet?retryWrites=true&w=majority";

  if (process.env.NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    mongo_uri = mongod.getUri();
  }

  await mongoose.connect(mongo_uri, {
    maxPoolSize: 10,
    autoCreate: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
// await connectDB().catch((err) => console.error(err));

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    // process.exit(1);
  }
};

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error: ")
);
mongoose.connection.once("open", function () {
  console.log("Mongo DB Connected successfully");
});

export { connectDB, disconnectDB };
