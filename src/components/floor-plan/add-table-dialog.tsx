
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import type { TableData, TableStatus } from "./floor-plan"

// interface AddTableDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
// }

// export function AddTableDialog({ open, onOpenChange, onAddTable }: AddTableDialogProps) {
//   const [number, setNumber] = useState("")
//   const [status, setStatus] = useState<TableStatus>("available")
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)
//   const [totalCost, setTotalCost] = useState<number | undefined>(undefined)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await onAddTable({
//       number: `Table ${number}`,
//       status,
//       numberOfCustomers,
//       // totalCost,
//     })
//     resetForm()
//   }

//   const resetForm = () => {
//     setNumber("")
//     setStatus("available")
//     setNumberOfCustomers(undefined)
//     setTotalCost(undefined)
//     onOpenChange(false)
//   }

//   const handleCancel = () => {
//     resetForm()
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Table</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number" className="text-right">
//               Table Number
//             </Label>
//             <Input
//               id="number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as TableStatus)}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value="available">Available</option>
//               <option value="occupied">Occupied</option>
//               <option value="reserved">Reserved</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="numberOfCustomers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="numberOfCustomers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Add Table</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }


// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import type { TableData, TableStatus } from "./floor-plan"

// interface AddTableDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
// }

// export function AddTableDialog({ open, onOpenChange, onAddTable }: AddTableDialogProps) {
//   const [number, setNumber] = useState("")
//   const [status, setStatus] = useState<TableStatus>("available")
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await onAddTable({
//       number: `Table ${number}`,
//       status,
//       numberOfCustomers,
//       floor: 0
//     })
//     resetForm()
//   }

//   const resetForm = () => {
//     setNumber("")
//     setStatus("available")
//     setNumberOfCustomers(undefined)
//     onOpenChange(false)
//   }

//   const handleCancel = () => {
//     resetForm()
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Table</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number" className="text-right">
//               Table Number
//             </Label>
//             <Input
//               id="number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as TableStatus)}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value="available">Available</option>
//               <option value="ordered">Ordered</option>
//               <option value="serving">Serving</option>
//               <option value="reserved">Reserved</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="numberOfCustomers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="numberOfCustomers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Add Table</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import type { TableData, TableStatus } from "./floor-plan"

// interface AddTableDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
// }

// export function AddTableDialog({ open, onOpenChange, onAddTable }: AddTableDialogProps) {
//   const [number, setNumber] = useState("")
//   const [status, setStatus] = useState<TableStatus>("available")
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)
//   const [floor, setFloor] = useState<number>(1)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await onAddTable({
//       number: `Table ${number}`,
//       status,
//       numberOfCustomers,
//       floor,
//     })
//     resetForm()
//   }

//   const resetForm = () => {
//     setNumber("")
//     setStatus("available")
//     setNumberOfCustomers(undefined)
//     setFloor(1)
//     onOpenChange(false)
//   }

//   const handleCancel = () => {
//     resetForm()
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Table</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number" className="text-right">
//               Table Number
//             </Label>
//             <Input
//               id="number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as TableStatus)}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value="available">Available</option>
//               <option value="ordered">Ordered</option>
//               <option value="serving">Serving</option>
//               <option value="reserved">Reserved</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="numberOfCustomers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="numberOfCustomers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="floor" className="text-right">
//               Floor
//             </Label>
//             <select
//               id="floor"
//               value={floor}
//               onChange={(e) => setFloor(Number(e.target.value))}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value={1}>Floor 1</option>
//               <option value={2}>Floor 2</option>
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Add Table</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import type { TableData, TableStatus } from "./floor-plan"

// interface AddTableDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
//   currentFloor: number
// }

// export function AddTableDialog({ open, onOpenChange, onAddTable, currentFloor }: AddTableDialogProps) {
//   const [number, setNumber] = useState("")
//   const [status, setStatus] = useState<TableStatus>("available")
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await onAddTable({
//       number: `Table ${number}`,
//       status,
//       numberOfCustomers,
//       floor: currentFloor,
//     })
//     resetForm()
//   }

//   const resetForm = () => {
//     setNumber("")
//     setStatus("available")
//     setNumberOfCustomers(undefined)
//     onOpenChange(false)
//   }

//   const handleCancel = () => {
//     resetForm()
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Table (Floor {currentFloor})</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number" className="text-right">
//               Table Number
//             </Label>
//             <Input
//               id="number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as TableStatus)}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value="available">Available</option>
//               <option value="ordered">Ordered</option>
//               <option value="serving">Serving</option>
//               <option value="reserved">Reserved</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="numberOfCustomers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="numberOfCustomers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Add Table</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import type { TableData, TableStatus } from "./floor-plan"

// interface AddTableDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
//   currentFloor: number
// }

// export function AddTableDialog({ open, onOpenChange, onAddTable, currentFloor }: AddTableDialogProps) {
//   const [number, setNumber] = useState("")
//   const [status, setStatus] = useState<TableStatus>("available")
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await onAddTable({
//       number, // Just pass the number, not "Table X"
//       status,
//       numberOfCustomers,
//       floor: currentFloor,
//     })
//     resetForm()
//   }

//   const resetForm = () => {
//     setNumber("")
//     setStatus("available")
//     setNumberOfCustomers(undefined)
//     onOpenChange(false)
//   }

//   const handleCancel = () => {
//     resetForm()
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Table (Floor {currentFloor})</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number" className="text-right">
//               Table Number
//             </Label>
//             <Input
//               id="number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as TableStatus)}
//               className="col-span-3 form-select p-2 border rounded-md"
//               required
//             >
//               <option value="available">Available</option>
//               <option value="ordered">Ordered</option>
//               <option value="serving">Serving</option>
//               <option value="reserved">Reserved</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="numberOfCustomers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="numberOfCustomers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Add Table</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { TableData, TableStatus } from "./floor-plan"

interface AddTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTable: (newTable: Omit<TableData, "id" | "orders">) => Promise<void>
  currentFloor: number
}

export function AddTableDialog({ open, onOpenChange, onAddTable, currentFloor }: AddTableDialogProps) {
  const [number, setNumber] = useState("")
  const [status, setStatus] = useState<TableStatus>("available")
  const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAddTable({
      number, // Just pass the number, not "Table X"
      status,
      numberOfCustomers,
      floor: currentFloor,
    })
    resetForm()
  }

  const resetForm = () => {
    setNumber("")
    setStatus("available")
    setNumberOfCustomers(undefined)
    onOpenChange(false)
  }

  const handleCancel = () => {
    resetForm()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Table (Floor {currentFloor})</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-6">
            <Label htmlFor="number" className="text-right">
              Table Number
            </Label>
            <Input
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TableStatus)}
              className="col-span-3 form-select p-2 border rounded-md"
              required
            >
              <option value="available">Available</option>
              <option value="ordered">Ordered</option>
              <option value="serving">Serving</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numberOfCustomers" className="text-right">
              Number of Customers
            </Label>
            <Input
              id="numberOfCustomers"
              type="number"
              value={numberOfCustomers || ""}
              onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Table</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

