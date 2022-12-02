import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { MongoMemoryReplSet } from "mongodb-memory-server";

export default async function () {
  const mongodRepl = await MongoMemoryReplSet.create({
    instanceOpts: [
      {
        port: 27019,
      },
    ],
    replSet: {
      dbName: "prisma-mongo-test",
      name: "replica",
      storageEngine: "wiredTiger",
      count: 1,
    },
  });

  const uri = mongodRepl.getUri();
  console.log("MongoDB URI: ", uri);

  return () => mongodRepl.stop();
}
