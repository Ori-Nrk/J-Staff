
// import { cn } from "@/lib/utils"
// import type { TableData } from "./floor-plan"
// import { Users } from "lucide-react"

// interface TableProps {
//   table: TableData
//   onClick?: () => void
//   onComplete?: () => void
//   isRemoveMode?: boolean
//   onRemove?: () => void
// }

// export function Table({ table, onClick, onComplete, isRemoveMode, onRemove }: TableProps) {
//   return (
//     <div
//       className={cn("w-full h-full flex flex-col items-center justify-center rounded-lg border-2", {
//         "bg-green-50 border-green-500": table.status === "available",
//         "bg-red-50 border-red-500": table.status === "ordered",
//         "bg-purple-50 border-purple-500": table.status === "serving",
//         "bg-grey-50 border-grey-500": table.status === "reserved",
//       })}
//     >
//       <span className="font-bold">{table.number}</span>
//       {table.status !== "available" && (
//         <div className="flex items-center mt-1">
//           <Users className="w-4 h-4 mr-1" />
//           <span className="text-sm">{table.numberOfCustomers || 0}</span>
//         </div>
//       )}
//     </div>
//   )
// }

// import { cn } from "@/lib/utils"
// import type { TableData } from "./floor-plan"
// import { Users } from "lucide-react"

// interface TableProps {
//   table: TableData
//   onClick?: () => void
//   onComplete?: () => void
//   isRemoveMode?: boolean
//   onRemove?: () => void
// }

// export function Table({ table, onClick, onComplete, isRemoveMode, onRemove }: TableProps) {
//   return (
//     <div
//       className={cn("w-full h-full flex flex-col items-center justify-center rounded-lg border-2", {
//         "bg-green-50 border-green-500": table.status === "available",
//         "bg-red-50 border-red-500": table.status === "ordered",
//         "bg-purple-50 border-purple-500": table.status === "serving",
//         "bg-gray-50 border-gray-500": table.status === "reserved",
//       })}
//     >
//       <span className="font-bold">Table {table.number}</span>
//       {table.status !== "available" && (
//         <div className="flex items-center mt-1">
//           <Users className="w-4 h-4 mr-1" />
//           <span className="text-sm">{table.numberOfCustomers || 0}</span>
//         </div>
//       )}
//     </div>
//   )
// }

// import { cn } from "@/lib/utils"
// import type { TableData } from "./floor-plan"
// import { Users } from "lucide-react"

// interface TableProps {
//   table: TableData
//   onClick?: () => void
//   onComplete?: () => void
//   isRemoveMode?: boolean
//   onRemove?: () => void
// }

// export function Table({ table, onClick, onComplete, isRemoveMode, onRemove }: TableProps) {
//   return (
//     <div
//       className={cn("w-full h-full flex flex-col items-center justify-center rounded-lg border-2", {
//         "bg-green-50 border-green-500": table.status === "available",
//         "bg-red-50 border-red-500": table.status === "ordered",
//         "bg-purple-50 border-purple-500": table.status === "serving",
//         "bg-gray-50 border-gray-500": table.status === "reserved",
//       })}
//     >
//       <span className="font-bold">Table {table.number}</span>
//       {table.status !== "available" && (
//         <div className="flex items-center mt-1">
//           <Users className="w-4 h-4 mr-1" />
//           <span className="text-sm">{table.numberOfCustomers || 0}</span>
//         </div>
//       )}
//     </div>
//   )
// }
import { cn } from "@/lib/utils"
import type { TableData } from "./floor-plan"
import { Users } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"

interface TableProps {
  table: TableData
  onClick?: () => void
  onComplete?: () => void
  isRemoveMode?: boolean
  onRemove?: () => void
}

export function Table({ table, onClick, onComplete, isRemoveMode, onRemove }: TableProps) {
  return (
    <div
      className={cn("w-full h-full flex flex-col items-center justify-center rounded-lg border-2 relative", {
        "bg-green-50 border-green-500": table.status === "available",
        "bg-red-50 border-red-500": table.status === "ordered",
        "bg-purple-50 border-purple-500": table.status === "serving",
        "bg-gray-50 border-gray-500": table.status === "reserved",
      })}
    >
      <Badge
        className={cn("absolute top-2 right-2", {
          "bg-green-500": table.status === "available",
          "bg-red-500": table.status === "ordered",
          "bg-purple-500": table.status === "serving",
          "bg-gray-500": table.status === "reserved",
        })}
      >
        {table.status}
      </Badge>
      <span className="font-bold">Table {table.number}</span>
      {table.status !== "available" && (
        <div className="flex items-center mt-1">
          <Users className="w-4 h-4 mr-1" />
          <span className="text-sm">{table.numberOfCustomers || 0}</span>
        </div>
      )}
    </div>
  )
}


