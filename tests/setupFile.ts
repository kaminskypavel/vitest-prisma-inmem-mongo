import mongoose from "mongoose";
console.log(2222, process.env.MONGO_URI, process.env.DATABASE_URL);

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env.MONGO_URI ?? "");
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
