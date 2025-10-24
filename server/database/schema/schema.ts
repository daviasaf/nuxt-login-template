import { sql } from 'drizzle-orm'
import {varchar, serial, mysqlTable, timestamp} from 'drizzle-orm/mysql-core'


export const userTable = mysqlTable('user_table',{
    id:serial().primaryKey(),
    name:varchar({length:255}).notNull(),
    email:varchar({length:255}).notNull(),
    passwordHash:varchar({length:255}).notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
})
export type newUser = typeof userTable.$inferInsert
