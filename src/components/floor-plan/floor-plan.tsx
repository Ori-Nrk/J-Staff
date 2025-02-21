

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { Circle, PlusCircle } from "lucide-react"
// import { AddTableDialog } from "./add-table-dialog"
// import { CustomerInputDialog } from "./customer-input-dialog"
// import { Table } from "./table"
// import { TableDetails } from "./table-details"
// import { Dialog } from "@/src/components/ui/dialog"

// export type TableStatus = "available" | "ordered" | "serving" | "reserved"
// export type OrderItem = {
//   id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export type BookingInfo = {
//   customerName: string
//   phoneNumber: string
//   email: string
//   numberOfGuests: number
//   bookingTime: string
//   specialRequests?: string
// }

// export type TableData = {
//   id: string
//   number: string
//   status: TableStatus
//   orders: OrderItem[]
//   booking?: BookingInfo
//   numberOfCustomers?: number
//   totalCost?: number
//   floor: number
// }

// const FloorPlan: React.FC = () => {
//   const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
//   const [currentFloor, setCurrentFloor] = useState("floor-1")
//   const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
//   const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
//   const [tables, setTables] = useState<TableData[]>([])
//   const [showAddTableDialog, setShowAddTableDialog] = useState(false)

//   useEffect(() => {
//     fetchTables()
//   }, [])

//   const fetchTables = async () => {
//     try {
//       const response = await fetch("/api/tables")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         console.error("Error response:", errorData)
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       console.log("Fetched tables:", data)
//       setTables(data)
//     } catch (error) {
//       console.error("Error fetching tables:", error)
//     }
//   }

//   const handleTableClick = async (table: TableData) => {
//     if (table.status === "available") {
//       setSelectedTableId(table.id)
//       setShowCustomerInputDialog(true)
//     } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
//       setSelectedTable(table)
//     }
//   }

//   const handleCustomerInput = async (data: { numberOfCustomers: number }) => {
//     if (selectedTableId) {
//       const updatedTable = {
//         ...getCurrentFloorTables().find((table) => table.id === selectedTableId)!,
//         status: "reserved" as TableStatus,
//         numberOfCustomers: data.numberOfCustomers,
//       }
//       await updateTable(updatedTable)
//     }
//     setShowCustomerInputDialog(false)
//     setSelectedTableId(null)
//   }

//   const handleCompleteTable = async (tableId: string) => {
//     const updatedTable = {
//       ...getCurrentFloorTables().find((table) => table.id === tableId)!,
//       status: "available" as TableStatus,
//       numberOfCustomers: undefined,
//       totalCost: undefined,
//       orders: [],
//     }
//     await updateTable(updatedTable)
//     setSelectedTable(null)
//   }

//   const handleRemoveTable = async (tableId: string) => {
//     try {
//       await fetch(`/api/tables/${tableId}`, { method: "DELETE" })
//       setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
//       setSelectedTable(null)
//     } catch (error) {
//       console.error("Error removing table:", error)
//     }
//   }

//   const handleAddTable = async (newTable: Omit<TableData, "id" | "orders">): Promise<void> => {
//     try {
//       const response = await fetch("/api/tables", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to add table")
//       }
//       const addedTable = await response.json()
//       setTables((prevTables) => [...prevTables, addedTable])
//       setShowAddTableDialog(false)
//     } catch (error) {
//       console.error("Error adding table:", error)
//     }
//   }

//   const updateTable = async (updatedTable: TableData) => {
//     try {
//       const response = await fetch(`/api/tables/${updatedTable.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to update table")
//       }
//       const updatedTableData = await response.json()
//       setTables((prevTables) =>
//         prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
//       )
//     } catch (error) {
//       console.error("Error updating table:", error)
//     }
//   }

//   const getCurrentFloorTables = () => {
//     const floorNumber = currentFloor === "floor-1" ? 1 : 2
//     return tables.filter((table) => table.floor === floorNumber)
//   }

//   return (
//     <div className="flex flex-col gap-6 p-8 bg-background">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Floor Plan</h1>
//           <p className="text-gray-500">Manage and monitor table status</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Tabs value={currentFloor} onValueChange={setCurrentFloor}>
//           <TabsList>
//             <TabsTrigger value="floor-1">Floor-1</TabsTrigger>
//             <TabsTrigger value="floor-2">2nd Floor</TabsTrigger>
//           </TabsList>
//         </Tabs>
//         <div className="ml-auto flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-red-500 text-red-500" />
//             <span className="text-sm">Ordered</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
//             <span className="text-sm">Serving</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />
//             <span className="text-sm">Reserved</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-green-500 text-green-500" />
//             <span className="text-sm">Available</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full min-h-[200px] p-4 border border-border rounded-lg bg-white overflow-auto">
//         {getCurrentFloorTables().map((table) => (
//           <div
//             key={table.id}
//             className="border border-border flex items-center justify-center text-sm cursor-pointer w-full aspect-square"
//             onClick={() => handleTableClick(table)}
//           >
//             <Table table={table} />
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <Button
//           onClick={() => setShowAddTableDialog(true)}
//           variant="ghost"
//           className="bg-orange-500 hover:bg-orange-600 text-white border-none"
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add Table
//         </Button>
//       </div>

//       <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
//         {selectedTable && (
//           <TableDetails
//             table={selectedTable}
//             onClose={() => setSelectedTable(null)}
//             onComplete={() => handleCompleteTable(selectedTable.id)}
//             onUpdate={updateTable}
//             onRemove={handleRemoveTable}
//           />
//         )}
//       </Dialog>

//       <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
//         <AddTableDialog
//           open={showAddTableDialog}
//           onOpenChange={setShowAddTableDialog}
//           onAddTable={handleAddTable}
//           currentFloor={currentFloor === "floor-1" ? 1 : 2}
//         />
//       </Dialog>

//       <Dialog open={showCustomerInputDialog}>
//         <CustomerInputDialog
//           open={showCustomerInputDialog}
//           onOpenChange={() => setShowCustomerInputDialog(false)}
//           onSubmit={handleCustomerInput}
//           setSelectedTable={setSelectedTable}
//         />
//       </Dialog>
//     </div>
//   )
// }

// export default FloorPlan

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { Circle, PlusCircle } from "lucide-react"
// import { AddTableDialog } from "./add-table-dialog"
// import { CustomerInputDialog } from "./customer-input-dialog"
// import { Table } from "./table"
// import { TableDetails } from "./table-details"
// import { Dialog } from "@/src/components/ui/dialog"

// export type TableStatus = "available" | "ordered" | "serving" | "reserved"
// export type OrderItem = {
//   id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export type BookingInfo = {
//   customerName: string
//   phoneNumber: string
//   email: string
//   numberOfGuests: number
//   bookingTime: string
//   specialRequests?: string
// }

// export type TableData = {
//   id: string
//   number: string
//   status: TableStatus
//   orders: OrderItem[]
//   booking?: BookingInfo
//   numberOfCustomers?: number
//   totalCost?: number
//   floor: number
// }

// const FloorPlan: React.FC = () => {
//   const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
//   const [currentFloor, setCurrentFloor] = useState<number>(1)
//   const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
//   const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
//   const [tables, setTables] = useState<TableData[]>([])
//   const [showAddTableDialog, setShowAddTableDialog] = useState(false)

//   useEffect(() => {
//     fetchTables()
//   }, [])

//   const fetchTables = async () => {
//     try {
//       const response = await fetch("/api/tables")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         console.error("Error response:", errorData)
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       console.log("Fetched tables:", data)
//       setTables(data)
//     } catch (error) {
//       console.error("Error fetching tables:", error)
//     }
//   }

//   const handleTableClick = async (table: TableData) => {
//     if (table.status === "available") {
//       setSelectedTableId(table.id)
//       setShowCustomerInputDialog(true)
//     } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
//       setSelectedTable(table)
//     }
//   }

//   const handleCustomerInput = async (data: { numberOfCustomers: number }) => {
//     if (selectedTableId) {
//       const updatedTable = {
//         ...tables.find((table) => table.id === selectedTableId)!,
//         status: "reserved" as TableStatus,
//         numberOfCustomers: data.numberOfCustomers,
//       }
//       await updateTable(updatedTable)
//     }
//     setShowCustomerInputDialog(false)
//     setSelectedTableId(null)
//   }

//   const handleCompleteTable = async (tableId: string) => {
//     const updatedTable = {
//       ...tables.find((table) => table.id === tableId)!,
//       status: "available" as TableStatus,
//       numberOfCustomers: undefined,
//       totalCost: undefined,
//       orders: [],
//     }
//     await updateTable(updatedTable)
//     setSelectedTable(null)
//   }

//   const handleRemoveTable = async (tableId: string) => {
//     try {
//       await fetch(`/api/tables/${tableId}`, { method: "DELETE" })
//       setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
//       setSelectedTable(null)
//     } catch (error) {
//       console.error("Error removing table:", error)
//     }
//   }

//   const handleAddTable = async (newTable: Omit<TableData, "id" | "orders">): Promise<void> => {
//     try {
//       const response = await fetch("/api/tables", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to add table")
//       }
//       const addedTable = await response.json()
//       setTables((prevTables) => [...prevTables, addedTable])
//       setShowAddTableDialog(false)
//     } catch (error) {
//       console.error("Error adding table:", error)
//     }
//   }

//   const updateTable = async (updatedTable: TableData) => {
//     try {
//       const response = await fetch(`/api/tables/${updatedTable.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to update table")
//       }
//       const updatedTableData = await response.json()
//       setTables((prevTables) =>
//         prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
//       )
//     } catch (error) {
//       console.error("Error updating table:", error)
//     }
//   }

//   const getCurrentFloorTables = () => {
//     return tables.filter((table) => table.floor === currentFloor)
//   }

//   return (
//     <div className="flex flex-col gap-6 p-8 bg-background">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Floor Plan</h1>
//           <p className="text-gray-500">Manage and monitor table status</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Tabs value={currentFloor.toString()} onValueChange={(value) => setCurrentFloor(Number(value))}>
//           <TabsList>
//             <TabsTrigger value="1">Floor 1</TabsTrigger>
//             <TabsTrigger value="2">Floor 2</TabsTrigger>
//           </TabsList>
//         </Tabs>
//         <div className="ml-auto flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-red-500 text-red-500" />
//             <span className="text-sm">Ordered</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
//             <span className="text-sm">Serving</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />
//             <span className="text-sm">Reserved</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-green-500 text-green-500" />
//             <span className="text-sm">Available</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full min-h-[200px] p-4 border border-border rounded-lg bg-white overflow-auto">
//         {getCurrentFloorTables().map((table) => (
//           <div
//             key={table.id}
//             className="border border-border flex items-center justify-center text-sm cursor-pointer w-full aspect-square"
//             onClick={() => handleTableClick(table)}
//           >
//             <Table table={table} />
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <Button
//           onClick={() => setShowAddTableDialog(true)}
//           variant="ghost"
//           className="bg-orange-500 hover:bg-orange-600 text-white border-none"
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add Table
//         </Button>
//       </div>

//       <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
//         {selectedTable && (
//           <TableDetails
//             table={selectedTable}
//             onClose={() => setSelectedTable(null)}
//             onComplete={() => handleCompleteTable(selectedTable.id)}
//             onUpdate={updateTable}
//             onRemove={handleRemoveTable}
//           />
//         )}
//       </Dialog>

//       <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
//         <AddTableDialog
//           open={showAddTableDialog}
//           onOpenChange={setShowAddTableDialog}
//           onAddTable={handleAddTable}
//           currentFloor={currentFloor}
//         />
//       </Dialog>

//       <Dialog open={showCustomerInputDialog}>
//         <CustomerInputDialog
//           open={showCustomerInputDialog}
//           onOpenChange={() => setShowCustomerInputDialog(false)}
//           onSubmit={handleCustomerInput}
//           setSelectedTable={setSelectedTable}
//         />
//       </Dialog>
//     </div>
//   )
// }

// export default FloorPlan

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { Circle, PlusCircle } from "lucide-react"
// import { AddTableDialog } from "./add-table-dialog"
// import { CustomerInputDialog } from "./customer-input-dialog"
// import { Table } from "./table"
// import { TableDetails } from "./table-details"
// import { Dialog } from "@/src/components/ui/dialog"

// export type TableStatus = "available" | "ordered" | "serving" | "reserved"
// export type OrderItem = {
//   id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export type BookingInfo = {
//   customerName: string
//   phoneNumber: string
//   email: string
//   numberOfGuests: number
//   bookingTime: string
//   specialRequests?: string
// }

// export type TableData = {
//   id: string
//   number: string
//   status: TableStatus
//   orders: OrderItem[]
//   booking?: BookingInfo
//   numberOfCustomers?: number
//   totalCost?: number
//   floor: number
// }

// const FloorPlan: React.FC = () => {
//   const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
//   const [currentFloor, setCurrentFloor] = useState<number>(1)
//   const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
//   const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
//   const [tables, setTables] = useState<TableData[]>([])
//   const [showAddTableDialog, setShowAddTableDialog] = useState(false)

//   useEffect(() => {
//     fetchTables()
//   }, [])

//   const fetchTables = async () => {
//     try {
//       const response = await fetch("/api/tables")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         console.error("Error response:", errorData)
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       console.log("Fetched tables:", data)
//       setTables(data)
//     } catch (error) {
//       console.error("Error fetching tables:", error)
//     }
//   }

//   const handleTableClick = async (table: TableData) => {
//     if (table.status === "available") {
//       setSelectedTableId(table.id)
//       setShowCustomerInputDialog(true)
//     } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
//       setSelectedTable(table)
//     }
//   }

//   const handleCustomerInput = async (data: { numberOfCustomers: number }) => {
//     if (selectedTableId) {
//       const updatedTable = {
//         ...tables.find((table) => table.id === selectedTableId)!,
//         status: "reserved" as TableStatus,
//         numberOfCustomers: data.numberOfCustomers,
//       }
//       await updateTable(updatedTable)
//     }
//     setShowCustomerInputDialog(false)
//     setSelectedTableId(null)
//   }

//   const handleCompleteTable = async (tableId: string) => {
//     const updatedTable = {
//       ...tables.find((table) => table.id === tableId)!,
//       status: "available" as TableStatus,
//       numberOfCustomers: undefined,
//       totalCost: undefined,
//       orders: [],
//     }
//     await updateTable(updatedTable)
//     setSelectedTable(null)
//   }

//   const handleRemoveTable = async (tableId: string) => {
//     try {
//       await fetch(`/api/tables/${tableId}`, { method: "DELETE" })
//       setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
//       setSelectedTable(null)
//     } catch (error) {
//       console.error("Error removing table:", error)
//     }
//   }

//   const handleAddTable = async (newTable: Omit<TableData, "id" | "orders">): Promise<void> => {
//     try {
//       const response = await fetch("/api/tables", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to add table")
//       }
//       const addedTable = await response.json()
//       setTables((prevTables) => [...prevTables, addedTable])
//       setShowAddTableDialog(false)
//     } catch (error) {
//       console.error("Error adding table:", error)
//     }
//   }

//   const updateTable = async (updatedTable: TableData) => {
//     try {
//       const response = await fetch(`/api/tables/${updatedTable.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedTable),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to update table")
//       }
//       const updatedTableData = await response.json()
//       setTables((prevTables) =>
//         prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
//       )
//     } catch (error) {
//       console.error("Error updating table:", error)
//     }
//   }

//   const getCurrentFloorTables = () => {
//     return tables.filter((table) => table.floor === currentFloor)
//   }

//   return (
//     <div className="flex flex-col gap-6 p-8 bg-background">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Floor Plan</h1>
//           <p className="text-gray-500">Manage and monitor table status</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Tabs value={currentFloor.toString()} onValueChange={(value) => setCurrentFloor(Number(value))}>
//           <TabsList>
//             <TabsTrigger value="1">Floor 1</TabsTrigger>
//             <TabsTrigger value="2">Floor 2</TabsTrigger>
//           </TabsList>
//         </Tabs>
//         <div className="ml-auto flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-red-500 text-red-500" />
//             <span className="text-sm">Ordered</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
//             <span className="text-sm">Serving</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />
//             <span className="text-sm">Reserved</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-green-500 text-green-500" />
//             <span className="text-sm">Available</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full min-h-[200px] p-4 border border-border rounded-lg bg-white overflow-auto">
//         {getCurrentFloorTables().map((table) => (
//           <div
//             key={table.id}
//             className="border border-border flex items-center justify-center text-sm cursor-pointer w-full aspect-square"
//             onClick={() => handleTableClick(table)}
//           >
//             <Table table={table} />
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <Button
//           onClick={() => setShowAddTableDialog(true)}
//           variant="ghost"
//           className="bg-orange-500 hover:bg-orange-600 text-white border-none"
//         >
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add Table
//         </Button>
//       </div>

//       <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
//         {selectedTable && (
//           <TableDetails
//             table={selectedTable}
//             onClose={() => setSelectedTable(null)}
//             onComplete={() => handleCompleteTable(selectedTable.id)}
//             onUpdate={updateTable}
//             onRemove={handleRemoveTable}
//           />
//         )}
//       </Dialog>

//       <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
//         <AddTableDialog
//           open={showAddTableDialog}
//           onOpenChange={setShowAddTableDialog}
//           onAddTable={handleAddTable}
//           currentFloor={currentFloor}
//         />
//       </Dialog>

//       <Dialog open={showCustomerInputDialog}>
//         <CustomerInputDialog
//           open={showCustomerInputDialog}
//           onOpenChange={() => setShowCustomerInputDialog(false)}
//           onSubmit={handleCustomerInput}
//           setSelectedTable={setSelectedTable}
//         />
//       </Dialog>
//     </div>
//   )
// }

// export default FloorPlan

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Circle, PlusCircle } from "lucide-react"
import { AddTableDialog } from "./add-table-dialog"
import { CustomerInputDialog } from "./customer-input-dialog"
import { Table } from "./table"
import { TableDetails } from "./table-details"
import { Dialog } from "@/src/components/ui/dialog"

export type TableStatus = "available" | "ordered" | "serving" | "reserved"
export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "served"
}

export type BookingInfo = {
  customerName: string
  phoneNumber: string
  email: string
  numberOfGuests: number
  bookingTime: string
  specialRequests?: string
}

export type TableData = {
  id: string
  number: string
  status: TableStatus
  orders: OrderItem[]
  booking?: BookingInfo
  numberOfCustomers?: number
  totalCost?: number
  floor: number
}

const FloorPlan: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
  const [currentFloor, setCurrentFloor] = useState<number>(1)
  const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [tables, setTables] = useState<TableData[]>([])
  const [showAddTableDialog, setShowAddTableDialog] = useState(false)

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const response = await fetch("/api/tables")
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Error response:", errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Fetched tables:", data)
      setTables(data)
    } catch (error) {
      console.error("Error fetching tables:", error)
    }
  }

  const handleTableClick = async (table: TableData) => {
    if (table.status === "available") {
      setSelectedTableId(table.id)
      setShowCustomerInputDialog(true)
    } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
      setSelectedTable(table)
    }
  }

  const handleCustomerInput = async (data: { numberOfCustomers: number }) => {
    if (selectedTableId) {
      const updatedTable = {
        ...tables.find((table) => table.id === selectedTableId)!,
        status: "reserved" as TableStatus,
        numberOfCustomers: data.numberOfCustomers,
      }
      await updateTable(updatedTable)
    }
    setShowCustomerInputDialog(false)
    setSelectedTableId(null)
  }

  const handleCompleteTable = async (tableId: string) => {
    const updatedTable = {
      ...tables.find((table) => table.id === tableId)!,
      status: "available" as TableStatus,
      numberOfCustomers: undefined,
      totalCost: undefined,
      orders: [],
    }
    await updateTable(updatedTable)
    setSelectedTable(null)
  }

  const handleRemoveTable = async (tableId: string) => {
    try {
      await fetch(`/api/tables/${tableId}`, { method: "DELETE" })
      setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
      setSelectedTable(null)
    } catch (error) {
      console.error("Error removing table:", error)
    }
  }

  const handleAddTable = async (newTable: Omit<TableData, "id" | "orders">): Promise<void> => {
    try {
      const response = await fetch("/api/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      })
      if (!response.ok) {
        throw new Error("Failed to add table")
      }
      const addedTable = await response.json()
      setTables((prevTables) => [...prevTables, addedTable])
      setShowAddTableDialog(false)
    } catch (error) {
      console.error("Error adding table:", error)
    }
  }

  const updateTable = async (updatedTable: TableData) => {
    try {
      const response = await fetch(`/api/tables/${updatedTable.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTable),
      })
      if (!response.ok) {
        throw new Error("Failed to update table")
      }
      const updatedTableData = await response.json()
      setTables((prevTables) =>
        prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
      )
    } catch (error) {
      console.error("Error updating table:", error)
    }
  }

  const getCurrentFloorTables = () => {
    return tables.filter((table) => table.floor === currentFloor)
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Floor Plan</h1>
          <p className="text-gray-500">Manage and monitor table status</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={currentFloor.toString()} onValueChange={(value) => setCurrentFloor(Number(value))}>
          <TabsList>
            <TabsTrigger value="1">Floor 1</TabsTrigger>
            <TabsTrigger value="2">Floor 2</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-red-500 text-red-500" />
            <span className="text-sm">Ordered</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
            <span className="text-sm">Serving</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-grey-500 text-grey-500" />
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="text-sm">Available</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full min-h-[200px] p-4 border border-border rounded-lg bg-white overflow-auto">
        {getCurrentFloorTables().map((table) => (
          <div
            key={table.id}
            className="border border-border flex items-center justify-center text-sm cursor-pointer w-full aspect-square"
            onClick={() => handleTableClick(table)}
          >
            <Table table={table} />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowAddTableDialog(true)}
          variant="ghost"
          className="bg-orange-500 hover:bg-orange-600 text-white border-none"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </div>

      <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
        {selectedTable && (
          <TableDetails
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onComplete={() => handleCompleteTable(selectedTable.id)}
            onUpdate={updateTable}
            onRemove={handleRemoveTable}
          />
        )}
      </Dialog>

      <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
        <AddTableDialog
          open={showAddTableDialog}
          onOpenChange={setShowAddTableDialog}
          onAddTable={handleAddTable}
          currentFloor={currentFloor}
        />
      </Dialog>

      <Dialog open={showCustomerInputDialog}>
        <CustomerInputDialog
          open={showCustomerInputDialog}
          onOpenChange={() => setShowCustomerInputDialog(false)}
          onSubmit={handleCustomerInput}
          setSelectedTable={setSelectedTable}
          selectedTableId={selectedTableId}
          tables={tables}
          handleRemoveTable={handleRemoveTable}
        />
      </Dialog>
    </div>
  )
}

export default FloorPlan

