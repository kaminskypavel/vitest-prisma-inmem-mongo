import { MongoMemoryServer, MongoMemoryReplSet } from "mongodb-memory-server";
import * as mongoose from "mongoose";
import { config } from "./config";

export default async function globalSetup() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite

    const instance = await MongoMemoryReplSet.create({
      instanceOpts: [],
      replSet: {
        dbName: "prisma-mongo-test",
        name: "replica",
        storageEngine: "wiredTiger",
        count: 1,
      },
    });

    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI =
      uri.slice(0, uri.lastIndexOf("/")) +
      `/prisma-mongo-test?authSource=admin&retryWrites=true&w=majority"`;
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  //   prisma is looking for this url
  process.env.DATABASE_URL = process.env.MONGO_URI;
  console.log(1111, process.env.MONGO_URI, process.env.DATABASE_URL);

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
  //   console.log();
  //   await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
