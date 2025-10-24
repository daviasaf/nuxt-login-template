import { hashPassword } from "#imports";
import { z } from "zod/v4";
import { db, eq, userTable } from "~~/server/database/database";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default defineEventHandler(async (event) => {
  // Devolve um erro ou o login certinho
  const body = await readValidatedBody(event, loginSchema.parse);

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, body.email),
  });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: " Unauthorized",
    });
  }

  const result = await verifyPassword(user.passwordHash, body.password);
  if (!result) {
    throw createError({
      statusCode: 401,
      statusMessage: " Unauthorized",
    });
  }

  await setUserSession(event, {
    loggedIn: true, // É bom ter um indicador claro
    user: {
      id: user.id, // ID do usuário
      name: user.name, // Nome do usuário
      email: user.email, // Email do usuário
    },
  });

  return { sucess: true };
});
