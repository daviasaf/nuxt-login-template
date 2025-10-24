import 'dotenv/config'
// Sempre importar o define config, mesmo que não carregue
// dialeto://username:password@host:port/database
import {defineConfig} from 'drizzle-kit'

export default defineConfig(  {
    out:'./server/database/drizzle',
    schema:'./server/database/schema',
    dialect:'mysql',
    dbCredentials:{
        url:process.env.DB_URL!
    }
})