import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import * as schema from "./schema/schema";

const conectionPool = createPool({
  uri: process.env.DB_URL,
});

export const db = drizzle(conectionPool, { schema, mode: "default" });

export { userTable } from "./schema/schema";
export { eq } from "drizzle-orm";
