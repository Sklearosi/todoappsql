import pgk from "pg"
const { Pool } = pgk

const pool = new Pool({
    host: process.env.POSTGRE_HOST,
    port: process.env.POSTGRE_PORT,
    database: process.env.POSTGRE_DATABASE,
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASSWORD
})

export const createTable = async () => {
    return await pool.query("CREATE TABLE IF NOT EXISTS todoapp(id SERIAL PRIMARY KEY, task TEXT, active BOOLEAN)")
}

export default pool