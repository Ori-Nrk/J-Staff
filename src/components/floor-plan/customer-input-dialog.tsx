// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"

// interface CustomerInputDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSubmit: (data: { numberOfCustomers: number }) => void
// }

// export function CustomerInputDialog({ open, onOpenChange, onSubmit }: CustomerInputDialogProps) {
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (numberOfCustomers !== undefined) {
//       onSubmit({ numberOfCustomers })
//       onOpenChange(false)
//       setNumberOfCustomers(undefined)
//     }
//   }

//   const handleCancel = () => {
//     onOpenChange(false)
//     setNumberOfCustomers(undefined)
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Enter Number of Customers</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number-of-customers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="number-of-customers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//               required
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Submit</Button>
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

// interface CustomerInputDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSubmit: (data: { numberOfCustomers: number }) => void
// }

// export function CustomerInputDialog({ open, onOpenChange, onSubmit }: CustomerInputDialogProps) {
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(undefined)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (numberOfCustomers !== undefined) {
//       onSubmit({ numberOfCustomers })
//       onOpenChange(false)
//       setNumberOfCustomers(undefined)
//     }
//   }

//   const handleCancel = () => {
//     onOpenChange(false)
//     setNumberOfCustomers(undefined)
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Enter Number of Customers</DialogTitle>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number-of-customers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="number-of-customers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//               required
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Submit</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/src/components/ui/button"
// import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { Edit } from "lucide-react"
// import type { TableData } from "./floor-plan"

// interface CustomerInputDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSubmit: (data: { numberOfCustomers: number }) => void
//   selectedTableId?: string | null
//   setSelectedTable: (table: TableData | null) => void
//   tables?: TableData[]
//   initialValue?: number
//   mode?: "add" | "edit"
// }

// export function CustomerInputDialog({
//   open,
//   onOpenChange,
//   onSubmit,
//   initialValue,
//   mode = "add",
//   selectedTableId,
//   setSelectedTable,
//   tables,
// }: CustomerInputDialogProps) {
//   const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(initialValue)

//   useEffect(() => {
//     if (open) {
//       setNumberOfCustomers(initialValue)
//     }
//   }, [open, initialValue])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (numberOfCustomers !== undefined) {
//       onSubmit({ numberOfCustomers })
//       onOpenChange(false)
//       setNumberOfCustomers(undefined)
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <div className="flex justify-between items-center">
//           <DialogTitle>{mode === "edit" ? "Edit Number of Customers" : "Enter Number of Customers"}</DialogTitle>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => {
//               onOpenChange(false)
//               if (selectedTableId && tables) {
//                 const selectedTable = tables.find((t) => t.id === selectedTableId)
//                 if (selectedTable) setSelectedTable(selectedTable)
//               }
//             }}
//           >
//             <Edit className="h-4 w-4" />
//           </Button>
//         </div>
//       </DialogHeader>
//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="number-of-customers" className="text-right">
//               Number of Customers
//             </Label>
//             <Input
//               id="number-of-customers"
//               type="number"
//               value={numberOfCustomers || ""}
//               onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
//               className="col-span-3"
//               required
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button type="submit">{mode === "edit" ? "Save" : "Submit"}</Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { TableData } from "./floor-plan"

interface CustomerInputDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { numberOfCustomers: number }) => void
  selectedTableId?: string | null
  setSelectedTable: (table: TableData | null) => void
  tables?: TableData[]
  initialValue?: number
  mode?: "add" | "edit"
  handleRemoveTable: (tableId: string) => void
}

export function CustomerInputDialog({
  open,
  onOpenChange,
  onSubmit,
  initialValue,
  mode = "add",
  selectedTableId,
  setSelectedTable,
  tables,
  handleRemoveTable,
}: CustomerInputDialogProps) {
  const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(initialValue)

  useEffect(() => {
    if (open) {
      setNumberOfCustomers(initialValue)
    }
  }, [open, initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numberOfCustomers !== undefined) {
      onSubmit({ numberOfCustomers })
      onOpenChange(false)
      setNumberOfCustomers(undefined)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle>{mode === "edit" ? "Edit Number of Customers" : "Enter Number of Customers"}</DialogTitle>
        </div>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number-of-customers" className="text-right">
              Number of Customers
            </Label>
            <Input
              id="number-of-customers"
              type="number"
              value={numberOfCustomers || ""}
              onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
              className="col-span-3"
              required
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onOpenChange(false)
              if (selectedTableId && tables) {
                handleRemoveTable(selectedTableId)
              }
            }}
          >
            Remove
          </Button>
          <div>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

