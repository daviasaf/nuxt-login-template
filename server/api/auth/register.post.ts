import { hashPassword } from "#imports";
import { z } from "zod/v4";
import { db, userTable } from "~~/server/database/database";

const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(1, "Name is required").max(255),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default defineEventHandler(async (event) => {
  // Devolve um erro ou o login certinho
  const body = await readValidatedBody(event, registerSchema.parse);
  const passwordHashed = await hashPassword(body.password);
  const insertResult = await db.insert(userTable).values({
    email: body.email,
    name: body.name,
    passwordHash: passwordHashed,
  });

  const newUserId = insertResult[0].insertId;
  const newUser = {
    id: newUserId,
    name: body.name,
    email: body.email,
  };

  await setUserSession(event, {
    user: {
      id: newUser.id,
      name: newUser.name,
    },
    lastLoggedIn: new Date(),
  });
  return { success: true };
});
