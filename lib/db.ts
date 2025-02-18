// import { Pool } from 'pg'

import { Pool, QueryResult, QueryResultRow } from "pg"

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// })

// export default {
//   query: (text: string, params?: any[]) => pool.query(text, params),
// }



 import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

const db = {
  query: async <T extends pg.QueryResultRow = any>(text: string, params?: any[]): Promise<pg.QueryResult<T>> => {
    const client = await pool.connect()
    try {
      const result = await client.query<T>(text, params)
      return result
    } catch (err) {
      console.error("Error executing query", err)
      throw err
    } finally {
      client.release()
    }
  },
}

export default db

