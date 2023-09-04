import pgk from "pg"
const { Pool } = pgk

const pool = new Pool({
    host: "dpg-cjr2ulthe99c738qpl7g-a",
    port: 5432,
    database: "todoapp_b1my",
    user: "todoapp_b1my_user",
    password : "fmIO5Ad3S6mv7rvBUGlu689qUK3mTBh4"
})

export const createTable = async () => {
    return await pool.query("CREATE TABLE IF NOT EXSISTS todoapp(id SERIAL PRIMARY KEY, task TEXT, active BOOLEAN)")
}