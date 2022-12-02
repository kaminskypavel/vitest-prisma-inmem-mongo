import dotenv from "dotenv";
dotenv.config();

if (!process.env.NODE_ENV) dotenv.config({ path: "./.env.development" });

console.info(process.env.DATABASE_URL);
