
// import type { TableData, OrderItem, TableStatus } from "@/src/components/floor-plan/floor-plan"
// import db from "./db"

// type DBTableRow = {
//   id: string
//   number: string
//   status: TableStatus
//   number_of_customers: number | null
//   total_cost: number | null
// }

// type DBOrderRow = {
//   id: string
//   table_id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export async function getTables(): Promise<TableData[]> {
//   try {
//     const result = await db.query(`
//       SELECT t.*, 
//         json_agg(
//           json_build_object(
//             'id', o.id,
//             'name', o.name,
//             'quantity', o.quantity,
//             'price', o.price,
//             'status', o.status
//           )
//         ) FILTER (WHERE o.id IS NOT NULL) as orders
//       FROM tables t
//       LEFT JOIN orders o ON t.id = o.table_id
//       GROUP BY t.id
//     `)

//     return result.rows.map((row: DBTableRow & { orders: DBOrderRow[] | null }) => ({
//       ...row,
//       numberOfCustomers: row.number_of_customers ?? undefined,
//       totalCost: row.total_cost ?? undefined,
//       orders: row.orders || [],
//     }))
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch tables")
//   }
// }

// export async function addTable(newTable: Omit<TableData, "id" | "orders">): Promise<TableData> {
//   try {
//     const { number, status, numberOfCustomers, totalCost } = newTable
//     const result = await db.query(
//       "INSERT INTO tables (number, status, number_of_customers, total_cost) VALUES ($1, $2, $3, $4) RETURNING *",
//       [number, status, numberOfCustomers ?? null, totalCost ?? null],
//     )
//     const addedTable = result.rows[0] as DBTableRow
//     console.log("Database result:", addedTable)
//     return {
//       ...addedTable,
//       numberOfCustomers: addedTable.number_of_customers ?? undefined,
//       totalCost: addedTable.total_cost ?? undefined,
//       orders: [],
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to add table")
//   }
// }

// export async function updateTable(updatedTable: TableData): Promise<TableData> {
//   try {
//     const { id, number, status, numberOfCustomers, totalCost } = updatedTable
//     const result = await db.query(
//       `UPDATE tables 
//        SET number = $1, status = $2, number_of_customers = $3, total_cost = $4
//        WHERE id = $5 
//        RETURNING *`,
//       [number, status, numberOfCustomers ?? null, totalCost ?? null, id],
//     )
//     const updatedRow = result.rows[0] as DBTableRow
//     return {
//       ...updatedRow,
//       numberOfCustomers: updatedRow.number_of_customers ?? undefined,
//       totalCost: updatedRow.total_cost ?? undefined,
//       orders: updatedTable.orders,
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to update table")
//   }
// }

// export async function removeTable(id: string): Promise<void> {
//   try {
//     await db.query("DELETE FROM tables WHERE id = $1", [id])
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to remove table")
//   }
// }

// export async function addOrder(tableId: string, order: Omit<OrderItem, "id" | "status">): Promise<void> {
//   try {
//     await db.query("INSERT INTO orders (table_id, name, quantity, price, status) VALUES ($1, $2, $3, $4, $5)", [
//       tableId,
//       order.name,
//       order.quantity,
//       order.price,
//       "pending",
//     ])
//     await db.query(
//       "UPDATE tables SET status = CASE WHEN status = 'available' THEN 'ordered' ELSE status END WHERE id = $1",
//       [tableId],
//     )
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to add order")
//   }
// }

// export async function updateOrderStatus(
//   tableId: string,
//   orderId: string,
//   status: "pending" | "preparing" | "served",
// ): Promise<void> {
//   try {
//     await db.query("UPDATE orders SET status = $1 WHERE id = $2 AND table_id = $3", [status, orderId, tableId])
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to update order status")
//   }
// }


// import type { TableData, OrderItem, TableStatus } from "@/src/components/floor-plan/floor-plan"
// import db from "./db"

// type DBTableRow = {
//   id: string
//   number: string
//   status: TableStatus
//   number_of_customers: number | null
//   total_cost: number | null
//   floor: number
// }

// type DBOrderRow = {
//   id: string
//   table_id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export async function getTables(): Promise<TableData[]> {
//   try {
//     const result = await db.query(`
//       SELECT t.*, 
//         json_agg(
//           json_build_object(
//             'id', o.id,
//             'name', o.name,
//             'quantity', o.quantity,
//             'price', o.price,
//             'status', o.status
//           )
//         ) FILTER (WHERE o.id IS NOT NULL) as orders
//       FROM tables t
//       LEFT JOIN orders o ON t.id = o.table_id
//       GROUP BY t.id
//     `)

//     return result.rows.map((row: DBTableRow & { orders: DBOrderRow[] | null }) => ({
//       ...row,
//       numberOfCustomers: row.number_of_customers ?? undefined,
//       totalCost: row.total_cost ?? undefined,
//       orders: row.orders || [],
//     }))
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch tables")
//   }
// }

// export async function addTable(newTable: Omit<TableData, "id" | "orders">): Promise<TableData> {
//   try {
//     const { number, status, numberOfCustomers, totalCost } = newTable
//     const result = await db.query(
//       "INSERT INTO tables (number, status, number_of_customers, total_cost) VALUES ($1, $2, $3, $4) RETURNING *",
//       [number, status, numberOfCustomers ?? null, totalCost ?? null],
//     )
//     const addedTable = result.rows[0] as DBTableRow
//     console.log("Database result:", addedTable)
//     return {
//       ...addedTable,
//       numberOfCustomers: addedTable.number_of_customers ?? undefined,
//       totalCost: addedTable.total_cost ?? undefined,
//       orders: [],
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to add table")
//   }
// }

// export async function updateTable(updatedTable: TableData): Promise<TableData> {
//   try {
//     const { id, number, status, numberOfCustomers, totalCost } = updatedTable
//     const result = await db.query(
//       `UPDATE tables 
//        SET number = $1, status = $2, number_of_customers = $3, total_cost = $4
//        WHERE id = $5 
//        RETURNING *`,
//       [number, status, numberOfCustomers ?? null, totalCost ?? null, id],
//     )
//     const updatedRow = result.rows[0] as DBTableRow
//     return {
//       ...updatedRow,
//       numberOfCustomers: updatedRow.number_of_customers ?? undefined,
//       totalCost: updatedRow.total_cost ?? undefined,
//       orders: updatedTable.orders,
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to update table")
//   }
// }

// export async function removeTable(id: string): Promise<void> {
//   try {
//     await db.query("DELETE FROM tables WHERE id = $1", [id])
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to remove table")
//   }
// }

// export async function addOrder(tableId: string, order: Omit<OrderItem, "id" | "status">): Promise<void> {
//   try {
//     await db.query("INSERT INTO orders (table_id, name, quantity, price, status) VALUES ($1, $2, $3, $4, $5)", [
//       tableId,
//       order.name,
//       order.quantity,
//       order.price,
//       "pending",
//     ])
//     await db.query(
//       "UPDATE tables SET status = CASE WHEN status = 'available' THEN 'ordered' ELSE status END WHERE id = $1",
//       [tableId],
//     )
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to add order")
//   }
// }

// export async function updateOrderStatus(
//   tableId: string,
//   orderId: string,
//   status: "pending" | "preparing" | "served",
// ): Promise<void> {
//   try {
//     await db.query("UPDATE orders SET status = $1 WHERE id = $2 AND table_id = $3", [status, orderId, tableId])
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to update order status")
//   }
// }


import type { TableData, OrderItem, TableStatus } from "@/src/components/floor-plan/floor-plan"
import db from "./db"

type DBTableRow = {
  id: string
  number: string
  status: TableStatus
  number_of_customers: number | null
  total_cost: number | null
  floor: number
}

type DBOrderRow = {
  id: string
  table_id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "served"
}

export async function getTables(): Promise<TableData[]> {
  try {
    const result = await db.query(`
      SELECT t.*, 
        json_agg(
          json_build_object(
            'id', o.id,
            'name', o.name,
            'quantity', o.quantity,
            'price', o.price,
            'status', o.status
          )
        ) FILTER (WHERE o.id IS NOT NULL) as orders
      FROM tables t
      LEFT JOIN orders o ON t.id = o.table_id
      GROUP BY t.id
    `)

    return result.rows.map((row: DBTableRow & { orders: DBOrderRow[] | null }) => ({
      ...row,
      numberOfCustomers: row.number_of_customers ?? undefined,
      totalCost: row.total_cost ?? undefined,
      orders: row.orders || [],
    }))
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch tables")
  }
}

export async function addTable(newTable: Omit<TableData, "id" | "orders">): Promise<TableData> {
  try {
    const { number, status, numberOfCustomers, totalCost, floor } = newTable
    const result = await db.query(
      "INSERT INTO tables (number, status, number_of_customers, total_cost, floor) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [number, status, numberOfCustomers ?? null, totalCost ?? null, floor],
    )
    const addedTable = result.rows[0] as DBTableRow
    console.log("Database result:", addedTable)
    return {
      ...addedTable,
      numberOfCustomers: addedTable.number_of_customers ?? undefined,
      totalCost: addedTable.total_cost ?? undefined,
      orders: [],
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to add table")
  }
}

export async function updateTable(updatedTable: TableData): Promise<TableData> {
  try {
    const { id, number, status, numberOfCustomers, totalCost, floor } = updatedTable
    const result = await db.query(
      `UPDATE tables 
       SET number = $1, status = $2, number_of_customers = $3, total_cost = $4, floor = $5
       WHERE id = $6 
       RETURNING *`,
      [number, status, numberOfCustomers ?? null, totalCost ?? null, floor, id],
    )
    const updatedRow = result.rows[0] as DBTableRow
    return {
      ...updatedRow,
      numberOfCustomers: updatedRow.number_of_customers ?? undefined,
      totalCost: updatedRow.total_cost ?? undefined,
      orders: updatedTable.orders,
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to update table")
  }
}

export async function removeTable(id: string): Promise<void> {
  try {
    await db.query("DELETE FROM tables WHERE id = $1", [id])
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to remove table")
  }
}

export async function addOrder(tableId: string, order: Omit<OrderItem, "id" | "status">): Promise<void> {
  try {
    await db.query("INSERT INTO orders (table_id, name, quantity, price, status) VALUES ($1, $2, $3, $4, $5)", [
      tableId,
      order.name,
      order.quantity,
      order.price,
      "pending",
    ])
    await db.query(
      "UPDATE tables SET status = CASE WHEN status = 'available' THEN 'ordered' ELSE status END WHERE id = $1",
      [tableId],
    )
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to add order")
  }
}

export async function updateOrderStatus(
  tableId: string,
  orderId: string,
  status: "pending" | "preparing" | "served",
): Promise<void> {
  try {
    await db.query("UPDATE orders SET status = $1 WHERE id = $2 AND table_id = $3", [status, orderId, tableId])
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to update order status")
  }
}

