// import { Pool } from 'pg'

// import { Pool, QueryResult, QueryResultRow } from "pg"

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// })

// export default {
//   query: (text: string, params?: any[]) => pool.query(text, params),
// }



//  import { Pool, type QueryResult, type QueryResultRow } from "pg"

// import { Pool } from "pg"

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
// })

// export default {
//   query: async (text: string, params?: any[]) => {
//     try {
//       return await pool.query(text, params)
//     } catch (error) {
//       console.error("Database query error:", error)
//       throw error
//     }
//   },
// }

// import { Pool } from "pg"

// let pool: Pool

// if (process.env.NODE_ENV === "production") {
//   pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   })
// } else {
//   pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   })
// }

// export default {
//   query: (text: string, params?: any[]) => pool.query(text, params),
// }

import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
}

// import { Pool } from "pg"

// const db = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// })

// export default db

