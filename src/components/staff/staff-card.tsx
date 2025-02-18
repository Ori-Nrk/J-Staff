
// "use client"

// import type React from "react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
// import { Button } from "@/src/components/ui/button"
// import { Progress } from "@/src/components/ui/progress"
// import { AnimatePresence, motion } from "framer-motion"
// import { AlertTriangle, ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/src/components/ui/dialog"

// interface StaffMember {
//   id: number
//   name: string
//   email: string
//   phone: string
//   position: string
//   service_period: string
//   status: string
//   image_url: string
//   education: string
//   skills: string[]
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// interface StaffCardProps {
//   staff: StaffMember
//   isExpanded: boolean
//   onToggle: () => void
// }

// export function StaffCard({ staff, isExpanded, onToggle }: StaffCardProps) {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editedStaff, setEditedStaff] = useState(staff)

//   const getPerformanceColor = (performance: number) => {
//     if (performance >= 70) return "bg-green-500"
//     if (performance >= 60) return "bg-yellow-500"
//     return "bg-red-500"
//   }

//   const getPerformanceWarning = (performance: number) => {
//     if (performance < 50) return "Critical: Owner intervention required immediately"
//     if (performance < 60) return "Final Warning: Performance improvement needed urgently"
//     if (performance < 70) return "Warning: Performance needs improvement"
//     return null
//   }

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff member")
//       }

//       setIsEditDialogOpen(false)
//       onToggle() // This will trigger a re-fetch of the staff data
//     } catch (error: unknown) {
//       console.error("Error updating staff member:", error)
//       let errorMessage = "Failed to update staff member"
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete staff member")
//       }

//       setIsDeleteDialogOpen(false)
//       onToggle() // This will trigger a re-fetch of the staff data
//     } catch (error: unknown) {
//       console.error("Error deleting staff member:", error)
//       let errorMessage = "Failed to delete staff member"
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.div
//         className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 p-4 cursor-pointer hover:bg-muted/50"
//         onClick={onToggle}
//         initial={false}
//         animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="flex items-center gap-2">
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//           <div className="flex items-center gap-2">
//             <Avatar className="h-6 w-6">
//               <AvatarImage src={staff.image_url} alt={staff.name} />
//               <AvatarFallback>{staff.name[0]}</AvatarFallback>
//             </Avatar>
//             {staff.name}
//           </div>
//         </div>
//         <div className="text-muted-foreground">
//           {staff.email}
//           <br />
//           {staff.phone}
//         </div>
//         <div>{staff.position}</div>
//         <div>{staff.service_period}</div>
//         <div>
//           <span
//             className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
//               staff.status === "active"
//                 ? "bg-green-50 text-green-700"
//                 : staff.status === "inactive"
//                   ? "bg-gray-100 text-gray-700"
//                   : "bg-yellow-50 text-yellow-700"
//             }`}
//           >
//             {staff.status}
//           </span>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="border-t bg-muted/50 p-6"
//           >
//             <div className="flex gap-6">
//               <Avatar className="h-32 w-32 rounded-lg">
//                 <AvatarImage src={staff.image_url} alt={staff.name} />
//                 <AvatarFallback>
//                   {staff.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold">{staff.name}</h3>
//                     <p className="text-muted-foreground">{staff.position}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Pencil className="mr-2 h-4 w-4" />
//                           Edit Profile
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Edit Staff Profile</DialogTitle>
//                         </DialogHeader>
//                         {/* Add your edit form here */}
//                       </DialogContent>
//                     </Dialog>
//                     <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove Staff
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Are you absolutely sure?</DialogTitle>
//                           <DialogDescription>
//                             This action cannot be undone. This will permanently delete {staff.name}'s account and remove
//                             their data from our servers.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                           <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                           <Button variant="destructive" onClick={handleDelete}>
//                             Delete
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="font-medium">Education</div>
//                     <div className="text-muted-foreground">{staff.education}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Skills</div>
//                     <div className="text-muted-foreground">{staff.skills.join(", ")}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Experience</div>
//                     <div className="text-muted-foreground">{staff.experience}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Assigned Section</div>
//                     <div className="text-muted-foreground">{staff.assigned_section}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="font-medium">Performance</div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
//                       <span className="text-sm font-medium">{staff.performance}%</span>
//                     </div>
//                     {getPerformanceWarning(staff.performance) && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
//                       </div>
//                     )}
//                     <div className="text-sm text-muted-foreground mt-1">
//                       Errors in daily sales: {staff.error_count} (affects performance)
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }








// "use client"

// import type React from "react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
// import { Button } from "@/src/components/ui/button"
// import { Progress } from "@/src/components/ui/progress"
// import { AnimatePresence, motion } from "framer-motion"
// import { AlertTriangle, ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/src/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

// interface StaffMember {
//   id: number
//   name: string
//   email: string
//   phone: string
//   position: string
//   service_period: string
//   status: string
//   image_url: string
//   education: string
//   skills: string[]
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// interface StaffCardProps {
//   staff: StaffMember
//   isExpanded: boolean
//   onToggle: () => void
//   onUpdate: (updatedStaff: StaffMember) => void
// }

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "On shift":
//       return "bg-green-100 text-green-700 border-green-200"
//     case "Off Duty":
//       return "bg-red-100 text-red-700 border-red-200"
//     case "Training":
//       return "bg-orange-100 text-orange-700 border-orange-200"
//     default:
//       return "bg-gray-100 text-gray-700 border-gray-200"
//   }
// }

// export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editedStaff, setEditedStaff] = useState(staff)

//   const getPerformanceColor = (performance: number) => {
//     if (performance >= 70) return "bg-green-500"
//     if (performance >= 60) return "bg-yellow-500"
//     return "bg-red-500"
//   }

//   const getPerformanceWarning = (performance: number) => {
//     if (performance < 50) return "Critical: Owner intervention required immediately"
//     if (performance < 60) return "Final Warning: Performance improvement needed urgently"
//     if (performance < 70) return "Warning: Performance needs improvement"
//     return null
//   }

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff member")
//       }

//       setIsEditDialogOpen(false)
//       onUpdate(editedStaff)
//     } catch (error: unknown) {
//       console.error("Error updating staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete staff member")
//       }

//       setIsDeleteDialogOpen(false)
//       onToggle() // This will trigger a re-fetch of the staff data
//     } catch (error: unknown) {
//       console.error("Error deleting staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleStatusChange = async (newStatus: string) => {
//     const updatedStaff = { ...staff, status: newStatus }
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff status")
//       }

//       onUpdate(updatedStaff)
//     } catch (error: unknown) {
//       console.error("Error updating staff status:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.div
//         className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 p-4 cursor-pointer hover:bg-muted/50"
//         onClick={onToggle}
//         initial={false}
//         animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="flex items-center gap-2">
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//           <div className="flex items-center gap-2">
//             <Avatar className="h-6 w-6">
//               <AvatarImage src={staff.image_url} alt={staff.name} />
//               <AvatarFallback>{staff.name[0]}</AvatarFallback>
//             </Avatar>
//             {staff.name}
//           </div>
//         </div>
//         <div className="text-muted-foreground">
//           {staff.email}
//           <br />
//           {staff.phone}
//         </div>
//         <div>{staff.position}</div>
//         <div>{staff.service_period}</div>
//         <div>
//           <Select defaultValue={staff.status} onValueChange={handleStatusChange}>
//             <SelectTrigger className={`w-[180px] border ${getStatusStyle(staff.status)}`}>
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="On shift" className="text-green-700">
//                 On shift
//               </SelectItem>
//               <SelectItem value="Off Duty" className="text-red-700">
//                 Off Duty
//               </SelectItem>
//               <SelectItem value="Training" className="text-orange-700">
//                 Training
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="border-t bg-muted/50 p-6"
//           >
//             <div className="flex gap-6">
//               <Avatar className="h-32 w-32 rounded-lg">
//                 <AvatarImage src={staff.image_url} alt={staff.name} />
//                 <AvatarFallback>
//                   {staff.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold">{staff.name}</h3>
//                     <p className="text-muted-foreground">{staff.position}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Pencil className="mr-2 h-4 w-4" />
//                           Edit Profile
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Edit Staff Profile</DialogTitle>
//                         </DialogHeader>
//                         {/* Add your edit form here */}
//                       </DialogContent>
//                     </Dialog>
//                     <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove Staff
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Are you absolutely sure?</DialogTitle>
//                           <DialogDescription>
//                             This action cannot be undone. This will permanently delete {staff.name}'s account and remove
//                             their data from our servers.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                           <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                           <Button variant="destructive" onClick={handleDelete}>
//                             Delete
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="font-medium">Education</div>
//                     <div className="text-muted-foreground">{staff.education}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Skills</div>
//                     <div className="text-muted-foreground">{staff.skills.join(", ")}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Experience</div>
//                     <div className="text-muted-foreground">{staff.experience}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Assigned Section</div>
//                     <div className="text-muted-foreground">{staff.assigned_section}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="font-medium">Performance</div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
//                       <span className="text-sm font-medium">{staff.performance}%</span>
//                     </div>
//                     {getPerformanceWarning(staff.performance) && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
//                       </div>
//                     )}
//                     <div className="text-sm text-muted-foreground mt-1">
//                       Errors in daily sales: {staff.error_count} (affects performance)
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
// import { Button } from "@/src/components/ui/button"
// import { Progress } from "@/src/components/ui/progress"
// import { AnimatePresence, motion } from "framer-motion"
// import { AlertTriangle, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/src/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"

// interface StaffMember {
//   id: number
//   name: string
//   email: string
//   phone: string
//   position: string
//   service_period: string
//   status: string
//   image_url: string
//   education: string
//   skills: string
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// interface StaffCardProps {
//   staff: StaffMember
//   isExpanded: boolean
//   onToggle: () => void
//   onUpdate: (updatedStaff: StaffMember) => void
// }

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "On shift":
//       return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
//     case "Off Duty":
//       return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
//     case "Training":
//       return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
//     default:
//       return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//   }
// }

// export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editedStaff, setEditedStaff] = useState(staff)

//   const getPerformanceColor = (performance: number) => {
//     if (performance >= 70) return "bg-green-500"
//     if (performance >= 60) return "bg-yellow-500"
//     return "bg-red-500"
//   }

//   const getPerformanceWarning = (performance: number) => {
//     if (performance < 50) return "Critical: Owner intervention required immediately"
//     if (performance < 60) return "Final Warning: Performance improvement needed urgently"
//     if (performance < 70) return "Warning: Performance needs improvement"
//     return null
//   }

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const staffToUpdate = {
//         ...editedStaff,
//       }
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(staffToUpdate),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff member")
//       }

//       setIsEditDialogOpen(false)
//       onUpdate(staffToUpdate)
//     } catch (error: unknown) {
//       console.error("Error updating staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete staff member")
//       }

//       setIsDeleteDialogOpen(false)
//       onToggle() // This will trigger a re-fetch of the staff data
//     } catch (error: unknown) {
//       console.error("Error deleting staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleStatusChange = async (newStatus: string) => {
//     const updatedStaff = { ...staff, status: newStatus }
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff status")
//       }

//       onUpdate(updatedStaff)
//     } catch (error: unknown) {
//       console.error("Error updating staff status:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.div
//         className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 cursor-pointer hover:bg-muted/50 items-center"
//         onClick={onToggle}
//         initial={false}
//         animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="flex items-center justify-center w-4">
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//         </div>
//         <div className="flex items-center">
//           <Avatar className="h-8 w-8 mr-4">
//             <AvatarImage src={staff.image_url} alt={staff.name} />
//             <AvatarFallback className="bg-gray-200 text-gray-600">{staff.name[0]}</AvatarFallback>
//           </Avatar>
//           <span>{staff.name}</span>
//         </div>
//         <div className="text-muted-foreground">
//           <div>{staff.email}</div>
//           <div>{staff.phone}</div>
//         </div>
//         <div>{staff.position}</div>
//         <div>{staff.service_period}</div>
//         <div onClick={(e) => e.stopPropagation()}>
//           <Select defaultValue={staff.status} onValueChange={handleStatusChange}>
//             <SelectTrigger
//               className={`h-7 px-3 text-xs font-medium rounded-full ${getStatusStyle(staff.status)}`}
//               style={{ minWidth: "100px", maxWidth: "120px" }}
//             >
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="On shift" className="text-green-700 text-xs">
//                 On shift
//               </SelectItem>
//               <SelectItem value="Off Duty" className="text-red-700 text-xs">
//                 Off Duty
//               </SelectItem>
//               <SelectItem value="Training" className="text-orange-700 text-xs">
//                 Training
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="border-t bg-muted/50 p-6"
//           >
//             <div className="flex gap-6">
//               <Avatar className="h-32 w-32 rounded-lg">
//                 <AvatarImage src={staff.image_url} alt={staff.name} />
//                 <AvatarFallback>
//                   {staff.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold">{staff.name}</h3>
//                     <p className="text-muted-foreground">{staff.position}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Pencil className="mr-2 h-4 w-4" />
//                           Edit Profile
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-4xl">
//                         <DialogHeader>
//                           <DialogTitle>Edit Staff Profile</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleEditSubmit} className="space-y-6">
//                           <div className="grid md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-name">Name</Label>
//                                 <Input
//                                   id="edit-name"
//                                   value={editedStaff.name}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-email">Email</Label>
//                                 <Input
//                                   id="edit-email"
//                                   type="email"
//                                   value={editedStaff.email}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-phone">Phone</Label>
//                                 <Input
//                                   id="edit-phone"
//                                   value={editedStaff.phone}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-position">Position</Label>
//                                 <Select
//                                   value={editedStaff.position}
//                                   onValueChange={(value) => setEditedStaff({ ...editedStaff, position: value })}
//                                 >
//                                   <SelectTrigger
//                                     id="edit-position"
//                                     className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                   >
//                                     <SelectValue placeholder="Select position" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Manager">Manager</SelectItem>
//                                     <SelectItem value="Supervisor">Supervisor</SelectItem>
//                                     <SelectItem value="Cashier">Cashier</SelectItem>
//                                     <SelectItem value="Sales Associate">Sales Associate</SelectItem>
//                                     <SelectItem value="Customer Service Representative">
//                                       Customer Service Representative
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-service-period">Service Period</Label>
//                                 <Input
//                                   id="edit-service-period"
//                                   value={editedStaff.service_period}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, service_period: e.target.value })}
//                                 />
//                               </div>
//                             </div>
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-education">Education</Label>
//                                 <Input
//                                   id="edit-education"
//                                   value={editedStaff.education}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, education: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-skills">Skills</Label>
//                                 <Input
//                                   id="edit-skills"
//                                   value={editedStaff.skills}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, skills: e.target.value })}
//                                   placeholder="Enter skills"
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-experience">Experience</Label>
//                                 <Input
//                                   id="edit-experience"
//                                   value={editedStaff.experience}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, experience: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-assigned-section">Assigned Section</Label>
//                                 <Input
//                                   id="edit-assigned-section"
//                                   value={editedStaff.assigned_section}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, assigned_section: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-performance">Performance</Label>
//                                 <Input
//                                   id="edit-performance"
//                                   type="number"
//                                   min="0"
//                                   max="100"
//                                   value={editedStaff.performance}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, performance: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-error-count">Error Count</Label>
//                                 <Input
//                                   id="edit-error-count"
//                                   type="number"
//                                   min="0"
//                                   value={editedStaff.error_count}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, error_count: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//                               Cancel
//                             </Button>
//                             <Button type="submit">Save Changes</Button>
//                           </DialogFooter>
//                         </form>
//                       </DialogContent>
//                     </Dialog>
//                     <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove Staff
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Are you absolutely sure?</DialogTitle>
//                           <DialogDescription>
//                             This action cannot be undone. This will permanently delete {staff.name}'s account and remove
//                             their data from our servers.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                           <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                           <Button variant="destructive" onClick={handleDelete}>
//                             Delete
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="font-medium">Education</div>
//                     <div className="text-muted-foreground">{staff.education}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Skills</div>
//                     <div className="text-muted-foreground">{staff.skills}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Experience</div>
//                     <div className="text-muted-foreground">{staff.experience}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Assigned Section</div>
//                     <div className="text-muted-foreground">{staff.assigned_section}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="font-medium">Performance</div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
//                       <span className="text-sm font-medium">{staff.performance}%</span>
//                     </div>
//                     {getPerformanceWarning(staff.performance) && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
//                       </div>
//                     )}
//                     <div className="text-sm text-muted-foreground mt-1">
//                       Errors in daily sales: {staff.error_count} (affects performance)
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }









// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
// import { Button } from "@/src/components/ui/button"
// import { Progress } from "@/src/components/ui/progress"
// import { AnimatePresence, motion } from "framer-motion"
// import { AlertTriangle, Pencil, Trash2, ChevronDown, ChevronUp, Upload } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/src/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"

// interface StaffMember {
//   id: number
//   name: string
//   email: string
//   phone: string
//   position: string
//   service_period: string
//   status: string
//   image_url: string
//   education: string
//   skills: string
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// interface StaffCardProps {
//   staff: StaffMember
//   isExpanded: boolean
//   onToggle: () => void
//   onUpdate: (updatedStaff: StaffMember) => void
// }

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "On shift":
//       return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
//     case "Off Duty":
//       return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
//     case "Training":
//       return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
//     default:
//       return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//   }
// }

// export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editedStaff, setEditedStaff] = useState(staff)
//   const [newImageFile, setNewImageFile] = useState<File | null>(null)
//   const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const getPerformanceColor = (performance: number) => {
//     if (performance >= 70) return "bg-green-500"
//     if (performance >= 60) return "bg-yellow-500"
//     return "bg-red-500"
//   }

//   const getPerformanceWarning = (performance: number) => {
//     if (performance < 50) return "Critical: Owner intervention required immediately"
//     if (performance < 60) return "Final Warning: Performance improvement needed urgently"
//     if (performance < 70) return "Warning: Performance needs improvement"
//     return null
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setNewImageFile(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setNewImagePreview(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       let updatedImageUrl = editedStaff.image_url

//       if (newImageFile) {
//         const formData = new FormData()
//         formData.append("image", newImageFile)
//         const uploadResponse = await fetch("/api/upload-image", {
//           method: "POST",
//           body: formData,
//         })

//         if (!uploadResponse.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const { imageUrl } = await uploadResponse.json()
//         updatedImageUrl = imageUrl
//       }

//       const staffToUpdate = {
//         ...editedStaff,
//         image_url: updatedImageUrl,
//       }

//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(staffToUpdate),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff member")
//       }

//       setIsEditDialogOpen(false)
//       onUpdate(staffToUpdate)
//     } catch (error: unknown) {
//       console.error("Error updating staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete staff member")
//       }

//       setIsDeleteDialogOpen(false)
//       onToggle() // This will trigger a re-fetch of the staff data
//     } catch (error: unknown) {
//       console.error("Error deleting staff member:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   const handleStatusChange = async (newStatus: string) => {
//     const updatedStaff = { ...staff, status: newStatus }
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff status")
//       }

//       onUpdate(updatedStaff)
//     } catch (error: unknown) {
//       console.error("Error updating staff status:", error)
//       // You might want to show this error to the user via a toast notification
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.div
//         className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 cursor-pointer hover:bg-muted/50 items-center"
//         onClick={onToggle}
//         initial={false}
//         animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="flex items-center justify-center w-4">
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//         </div>
//         <div className="flex items-center">
//           <Avatar className="h-8 w-8 mr-4">
//             <AvatarImage src={staff.image_url} alt={staff.name} />
//             <AvatarFallback className="bg-gray-200 text-gray-600">{staff.name[0]}</AvatarFallback>
//           </Avatar>
//           <span>{staff.name}</span>
//         </div>
//         <div className="text-muted-foreground">
//           <div>{staff.email}</div>
//           <div>{staff.phone}</div>
//         </div>
//         <div>{staff.position}</div>
//         <div>{staff.service_period}</div>
//         <div onClick={(e) => e.stopPropagation()}>
//           <Select defaultValue={staff.status} onValueChange={handleStatusChange}>
//             <SelectTrigger
//               className={`h-7 px-3 text-xs font-medium rounded-full ${getStatusStyle(staff.status)}`}
//               style={{ minWidth: "100px", maxWidth: "120px" }}
//             >
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="On shift" className="text-green-700 text-xs">
//                 On shift
//               </SelectItem>
//               <SelectItem value="Off Duty" className="text-red-700 text-xs">
//                 Off Duty
//               </SelectItem>
//               <SelectItem value="Training" className="text-orange-700 text-xs">
//                 Training
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="border-t bg-muted/50 p-6"
//           >
//             <div className="flex gap-6">
//               <Avatar className="h-32 w-32 rounded-lg">
//                 <AvatarImage src={staff.image_url} alt={staff.name} />
//                 <AvatarFallback>
//                   {staff.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold">{staff.name}</h3>
//                     <p className="text-muted-foreground">{staff.position}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Pencil className="mr-2 h-4 w-4" />
//                           Edit Profile
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-4xl">
//                         <DialogHeader>
//                           <DialogTitle>Edit Staff Profile</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleEditSubmit} className="space-y-6">
//                           <div className="grid md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-name">Name</Label>
//                                 <Input
//                                   id="edit-name"
//                                   value={editedStaff.name}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-email">Email</Label>
//                                 <Input
//                                   id="edit-email"
//                                   type="email"
//                                   value={editedStaff.email}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-phone">Phone</Label>
//                                 <Input
//                                   id="edit-phone"
//                                   value={editedStaff.phone}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-position">Position</Label>
//                                 <Select
//                                   value={editedStaff.position}
//                                   onValueChange={(value) => setEditedStaff({ ...editedStaff, position: value })}
//                                 >
//                                   <SelectTrigger
//                                     id="edit-position"
//                                     className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                   >
//                                     <SelectValue placeholder="Select position" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Manager">Manager</SelectItem>
//                                     <SelectItem value="Supervisor">Supervisor</SelectItem>
//                                     <SelectItem value="Cashier">Cashier</SelectItem>
//                                     <SelectItem value="Sales Associate">Sales Associate</SelectItem>
//                                     <SelectItem value="Customer Service Representative">
//                                       Customer Service Representative
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-service-period">Service Period</Label>
//                                 <Input
//                                   id="edit-service-period"
//                                   value={editedStaff.service_period}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, service_period: e.target.value })}
//                                 />
//                               </div>
//                             </div>
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-education">Education</Label>
//                                 <Input
//                                   id="edit-education"
//                                   value={editedStaff.education}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, education: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-skills">Skills</Label>
//                                 <Input
//                                   id="edit-skills"
//                                   value={editedStaff.skills}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, skills: e.target.value })}
//                                   placeholder="Enter skills"
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-experience">Experience</Label>
//                                 <Input
//                                   id="edit-experience"
//                                   value={editedStaff.experience}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, experience: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-assigned-section">Assigned Section</Label>
//                                 <Input
//                                   id="edit-assigned-section"
//                                   value={editedStaff.assigned_section}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, assigned_section: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-performance">Performance</Label>
//                                 <Input
//                                   id="edit-performance"
//                                   type="number"
//                                   min="0"
//                                   max="100"
//                                   value={editedStaff.performance}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, performance: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-error-count">Error Count</Label>
//                                 <Input
//                                   id="edit-error-count"
//                                   type="number"
//                                   min="0"
//                                   value={editedStaff.error_count}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, error_count: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-profile-picture">Profile Picture</Label>
//                                 <div className="flex items-center space-x-4">
//                                   <Avatar className="h-20 w-20">
//                                     <AvatarImage
//                                       src={newImagePreview || editedStaff.image_url}
//                                       alt={editedStaff.name}
//                                     />
//                                     <AvatarFallback>{editedStaff.name[0]}</AvatarFallback>
//                                   </Avatar>
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => fileInputRef.current?.click()}
//                                   >
//                                     <Upload className="mr-2 h-4 w-4" />
//                                     Upload New Picture
//                                   </Button>
//                                   <Input
//                                     type="file"
//                                     id="edit-profile-picture"
//                                     ref={fileInputRef}
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//                               Cancel
//                             </Button>
//                             <Button type="submit">Save Changes</Button>
//                           </DialogFooter>
//                         </form>
//                       </DialogContent>
//                     </Dialog>
//                     <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove Staff
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Are you absolutely sure?</DialogTitle>
//                           <DialogDescription>
//                             This action cannot be undone. This will permanently delete {staff.name}'s account and remove
//                             their data from our servers.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                           <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                           <Button variant="destructive" onClick={handleDelete}>
//                             Delete
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="font-medium">Education</div>
//                     <div className="text-muted-foreground">{staff.education}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Skills</div>
//                     <div className="text-muted-foreground">{staff.skills}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Experience</div>
//                     <div className="text-muted-foreground">{staff.experience}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Assigned Section</div>
//                     <div className="text-muted-foreground">{staff.assigned_section}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="font-medium">Performance</div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
//                       <span className="text-sm font-medium">{staff.performance}%</span>
//                     </div>
//                     {getPerformanceWarning(staff.performance) && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
//                       </div>
//                     )}
//                     <div className="text-sm text-muted-foreground mt-1">
//                       Errors in daily sales: {staff.error_count} (affects performance)
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
// import { Button } from "@/src/components/ui/button"
// import { Progress } from "@/src/components/ui/progress"
// import { AnimatePresence, motion } from "framer-motion"
// import { AlertTriangle, Pencil, Trash2, ChevronDown, ChevronUp, Upload } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/src/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"

// interface StaffMember {
//   id: number
//   name: string
//   email: string
//   phone: string
//   position: string
//   service_period: string
//   status: string
//   image_url: string
//   education: string
//   skills: string
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// interface StaffCardProps {
//   staff: StaffMember
//   isExpanded: boolean
//   onToggle: () => void
//   onUpdate: (updatedStaff: StaffMember) => void
// }

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "On shift":
//       return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
//     case "Off Duty":
//       return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
//     case "Training":
//       return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
//     default:
//       return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//   }
// }

// export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editedStaff, setEditedStaff] = useState(staff)
//   const [newImageFile, setNewImageFile] = useState<File | null>(null)
//   const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const getPerformanceColor = (performance: number) => {
//     if (performance >= 70) return "bg-green-500"
//     if (performance >= 60) return "bg-yellow-500"
//     return "bg-red-500"
//   }

//   const getPerformanceWarning = (performance: number) => {
//     if (performance < 50) return "Critical: Owner intervention required immediately"
//     if (performance < 60) return "Final Warning: Performance improvement needed urgently"
//     if (performance < 70) return "Warning: Performance needs improvement"
//     return null
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setNewImageFile(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setNewImagePreview(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       let updatedImageUrl = editedStaff.image_url

//       if (newImageFile) {
//         const formData = new FormData()
//         formData.append("image", newImageFile)
//         const uploadResponse = await fetch("/api/upload-image", {
//           method: "POST",
//           body: formData,
//         })

//         if (!uploadResponse.ok) {
//           const errorData = await uploadResponse.json()
//           throw new Error(errorData.message || "Failed to upload image")
//         }

//         const { imageUrl } = await uploadResponse.json()
//         updatedImageUrl = imageUrl
//       }

//       const staffToUpdate = {
//         ...editedStaff,
//         image_url: updatedImageUrl,
//       }

//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(staffToUpdate),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff member")
//       }

//       setIsEditDialogOpen(false)
//       onUpdate(staffToUpdate)
//     } catch (error: unknown) {
//       console.error("Error updating staff member:", error)
//       alert(error instanceof Error ? error.message : "An unknown error occurred")
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete staff member")
//       }

//       setIsDeleteDialogOpen(false)
//       onToggle()
//     } catch (error: unknown) {
//       console.error("Error deleting staff member:", error)
//     }
//   }

//   const handleStatusChange = async (newStatus: string) => {
//     const updatedStaff = { ...staff, status: newStatus }
//     try {
//       const response = await fetch(`/api/staff/${staff.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStaff),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update staff status")
//       }

//       onUpdate(updatedStaff)
//     } catch (error: unknown) {
//       console.error("Error updating staff status:", error)
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.div
//         className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 cursor-pointer hover:bg-muted/50 items-center"
//         onClick={onToggle}
//         initial={false}
//         animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="flex items-center justify-center w-4">
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//         </div>
//         <div className="flex items-center">
//           <Avatar className="h-8 w-8 mr-4">
//             <AvatarImage src={staff.image_url} alt={staff.name} />
//             <AvatarFallback className="bg-gray-200 text-gray-600">{staff.name[0]}</AvatarFallback>
//           </Avatar>
//           <span>{staff.name}</span>
//         </div>
//         <div className="text-muted-foreground">
//           <div>{staff.email}</div>
//           <div>{staff.phone}</div>
//         </div>
//         <div>{staff.position}</div>
//         <div>{staff.service_period}</div>
//         <div onClick={(e) => e.stopPropagation()}>
//           <Select defaultValue={staff.status} onValueChange={handleStatusChange}>
//             <SelectTrigger
//               className={`h-7 px-3 text-xs font-medium rounded-full ${getStatusStyle(staff.status)}`}
//               style={{ minWidth: "100px", maxWidth: "120px" }}
//             >
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="On shift" className="text-green-700 text-xs">
//                 On shift
//               </SelectItem>
//               <SelectItem value="Off Duty" className="text-red-700 text-xs">
//                 Off Duty
//               </SelectItem>
//               <SelectItem value="Training" className="text-orange-700 text-xs">
//                 Training
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="border-t bg-muted/50 p-6"
//           >
//             <div className="flex gap-6">
//               <Avatar className="h-32 w-32 rounded-lg">
//                 <AvatarImage src={staff.image_url} alt={staff.name} />
//                 <AvatarFallback>
//                   {staff.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold">{staff.name}</h3>
//                     <p className="text-muted-foreground">{staff.position}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Pencil className="mr-2 h-4 w-4" />
//                           Edit Profile
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-4xl">
//                         <DialogHeader>
//                           <DialogTitle>Edit Staff Profile</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleEditSubmit} className="space-y-6">
//                           <div className="grid md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-name">Name</Label>
//                                 <Input
//                                   id="edit-name"
//                                   value={editedStaff.name}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-email">Email</Label>
//                                 <Input
//                                   id="edit-email"
//                                   type="email"
//                                   value={editedStaff.email}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-phone">Phone</Label>
//                                 <Input
//                                   id="edit-phone"
//                                   value={editedStaff.phone}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-position">Position</Label>
//                                 <Select
//                                   value={editedStaff.position}
//                                   onValueChange={(value) => setEditedStaff({ ...editedStaff, position: value })}
//                                 >
//                                   <SelectTrigger
//                                     id="edit-position"
//                                     className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                   >
//                                     <SelectValue placeholder="Select position" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Manager">Manager</SelectItem>
//                                     <SelectItem value="Supervisor">Supervisor</SelectItem>
//                                     <SelectItem value="Cashier">Cashier</SelectItem>
//                                     <SelectItem value="Sales Associate">Sales Associate</SelectItem>
//                                     <SelectItem value="Customer Service Representative">
//                                       Customer Service Representative
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-service-period">Service Period</Label>
//                                 <Input
//                                   id="edit-service-period"
//                                   value={editedStaff.service_period}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, service_period: e.target.value })}
//                                 />
//                               </div>
//                             </div>
//                             <div className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-education">Education</Label>
//                                 <Input
//                                   id="edit-education"
//                                   value={editedStaff.education}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, education: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-skills">Skills</Label>
//                                 <Input
//                                   id="edit-skills"
//                                   value={editedStaff.skills}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, skills: e.target.value })}
//                                   placeholder="Enter skills"
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-experience">Experience</Label>
//                                 <Input
//                                   id="edit-experience"
//                                   value={editedStaff.experience}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, experience: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-assigned-section">Assigned Section</Label>
//                                 <Input
//                                   id="edit-assigned-section"
//                                   value={editedStaff.assigned_section}
//                                   onChange={(e) => setEditedStaff({ ...editedStaff, assigned_section: e.target.value })}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-performance">Performance</Label>
//                                 <Input
//                                   id="edit-performance"
//                                   type="number"
//                                   min="0"
//                                   max="100"
//                                   value={editedStaff.performance}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, performance: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-error-count">Error Count</Label>
//                                 <Input
//                                   id="edit-error-count"
//                                   type="number"
//                                   min="0"
//                                   value={editedStaff.error_count}
//                                   onChange={(e) =>
//                                     setEditedStaff({ ...editedStaff, error_count: Number.parseInt(e.target.value) })
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-profile-picture">Profile Picture</Label>
//                                 <div className="flex items-center space-x-4">
//                                   <Avatar className="h-20 w-20">
//                                     <AvatarImage
//                                       src={newImagePreview || editedStaff.image_url}
//                                       alt={editedStaff.name}
//                                     />
//                                     <AvatarFallback>{editedStaff.name[0]}</AvatarFallback>
//                                   </Avatar>
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => fileInputRef.current?.click()}
//                                   >
//                                     <Upload className="mr-2 h-4 w-4" />
//                                     Upload New Picture
//                                   </Button>
//                                   <Input
//                                     type="file"
//                                     id="edit-profile-picture"
//                                     ref={fileInputRef}
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//                               Cancel
//                             </Button>
//                             <Button type="submit">Save Changes</Button>
//                           </DialogFooter>
//                         </form>
//                       </DialogContent>
//                     </Dialog>
//                     <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove Staff
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Are you absolutely sure?</DialogTitle>
//                           <DialogDescription>
//                             This action cannot be undone. This will permanently delete {staff.name}'s account and remove
//                             their data from our servers.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                           <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                           <Button variant="destructive" onClick={handleDelete}>
//                             Delete
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="font-medium">Education</div>
//                     <div className="text-muted-foreground">{staff.education}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Skills</div>
//                     <div className="text-muted-foreground">{staff.skills}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Experience</div>
//                     <div className="text-muted-foreground">{staff.experience}</div>
//                   </div>
//                   <div>
//                     <div className="font-medium">Assigned Section</div>
//                     <div className="text-muted-foreground">{staff.assigned_section}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="font-medium">Performance</div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
//                       <span className="text-sm font-medium">{staff.performance}%</span>
//                     </div>
//                     {getPerformanceWarning(staff.performance) && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
//                       </div>
//                     )}
//                     <div className="text-sm text-muted-foreground mt-1">
//                       Errors in daily sales: {staff.error_count} (affects performance)
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }










"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, Pencil, Trash2, ChevronDown, ChevronUp, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  position: string
  service_period: string
  status: string
  image_url: string
  education: string
  experience: string
  assigned_section: string
  performance: number
  error_count: number
}

interface StaffCardProps {
  staff: StaffMember
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updatedStaff: StaffMember) => void
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "On shift":
      return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
    case "Off Duty":
      return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
    case "Training":
      return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
  }
}

export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedStaff, setEditedStaff] = useState(staff)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getPerformanceColor = (performance: number) => {
    if (performance >= 70) return "bg-green-500"
    if (performance >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getPerformanceWarning = (performance: number) => {
    if (performance < 50) return "Critical: Owner intervention required immediately"
    if (performance < 60) return "Final Warning: Performance improvement needed urgently"
    if (performance < 70) return "Warning: Performance needs improvement"
    return null
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let updatedImageUrl = editedStaff.image_url

      if (newImageFile) {
        const formData = new FormData()
        formData.append("image", newImageFile)
        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || "Failed to upload image")
        }

        const { imageUrl } = await uploadResponse.json()
        updatedImageUrl = imageUrl
      }

      const staffToUpdate = {
        ...editedStaff,
        image_url: updatedImageUrl,
      }

      const response = await fetch(`/api/staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffToUpdate),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update staff member")
      }

      const updatedStaff = await response.json()
      setIsEditDialogOpen(false)
      onUpdate(updatedStaff)
    } catch (error: unknown) {
      console.error("Error updating staff member:", error)
      alert(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/staff?id=${staff.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete staff member")
      }

      setIsDeleteDialogOpen(false)
      onToggle()
    } catch (error: unknown) {
      console.error("Error deleting staff member:", error)
      alert(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    const updatedStaff = { ...staff, status: newStatus }
    try {
      const response = await fetch(`/api/staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStaff),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update staff status")
      }

      const result = await response.json()
      onUpdate(result)
    } catch (error: unknown) {
      console.error("Error updating staff status:", error)
      alert(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 cursor-pointer hover:bg-muted/50 items-center"
        onClick={onToggle}
        initial={false}
        animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-center w-4">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-4">
            <AvatarImage src={staff.image_url} alt={staff.name} />
            <AvatarFallback className="bg-gray-200 text-gray-600">{staff.name[0]}</AvatarFallback>
          </Avatar>
          <span>{staff.name}</span>
        </div>
        <div className="text-muted-foreground">
          <div>{staff.email}</div>
          <div>{staff.phone}</div>
        </div>
        <div>{staff.position}</div>
        <div>{staff.service_period}</div>
        <div onClick={(e) => e.stopPropagation()}>
          <Select defaultValue={staff.status} onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`h-7 px-3 text-xs font-medium rounded-full ${getStatusStyle(staff.status)}`}
              style={{ minWidth: "100px", maxWidth: "120px" }}
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="On shift" className="text-green-700 text-xs">
                On shift
              </SelectItem>
              <SelectItem value="Off Duty" className="text-red-700 text-xs">
                Off Duty
              </SelectItem>
              <SelectItem value="Training" className="text-orange-700 text-xs">
                Training
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t bg-muted/50 p-6"
          >
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-lg">
                <AvatarImage src={staff.image_url} alt={staff.name} />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{staff.name}</h3>
                    <p className="text-muted-foreground">{staff.position}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Edit Staff Profile</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editedStaff.name}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, name: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={editedStaff.email}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, email: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-phone">Phone</Label>
                                <Input
                                  id="edit-phone"
                                  value={editedStaff.phone}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, phone: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-position">Position</Label>
                                <Select
                                  value={editedStaff.position}
                                  onValueChange={(value) => setEditedStaff({ ...editedStaff, position: value })}
                                >
                                  <SelectTrigger
                                    id="edit-position"
                                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  >
                                    <SelectValue placeholder="Select position" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Cashier">Cashier</SelectItem>
                                    <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                                    <SelectItem value="Customer Service Representative">
                                      Customer Service Representative
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="edit-service-period">Service Period</Label>
                                <Input
                                  id="edit-service-period"
                                  value={editedStaff.service_period}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, service_period: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-education">Education</Label>
                                <Input
                                  id="edit-education"
                                  value={editedStaff.education}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, education: e.target.value })
                                  }
                                />
                              </div>

                              <div>
                                <Label htmlFor="edit-experience">Experience</Label>
                                <Input
                                  id="edit-experience"
                                  value={editedStaff.experience}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, experience: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-assigned-section">Assigned Section</Label>
                                <Input
                                  id="edit-assigned-section"
                                  value={editedStaff.assigned_section}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, assigned_section: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-performance">Performance</Label>
                                <Input
                                  id="edit-performance"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editedStaff.performance}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, performance: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-error-count">Error Count</Label>
                                <Input
                                  id="edit-error-count"
                                  type="number"
                                  min="0"
                                  value={editedStaff.error_count}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEditedStaff({ ...editedStaff, error_count: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-profile-picture">Profile Picture</Label>
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-20 w-20">
                                    <AvatarImage
                                      src={newImagePreview || editedStaff.image_url}
                                      alt={editedStaff.name}
                                    />
                                    <AvatarFallback>{editedStaff.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload New Picture
                                  </Button>
                                  <Input
                                    type="file"
                                    id="edit-profile-picture"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Staff
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete {staff.name}'s account and remove
                            their data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDelete}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Education</div>
                    <div className="text-muted-foreground">{staff.education}</div>
                  </div>

                  <div>
                    <div className="font-medium">Experience</div>
                    <div className="text-muted-foreground">{staff.experience}</div>
                  </div>
                  <div>
                    <div className="font-medium">Assigned Section</div>
                    <div className="text-muted-foreground">{staff.assigned_section}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-medium">Performance</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
                      <span className="text-sm font-medium">{staff.performance}%</span>
                    </div>
                    {getPerformanceWarning(staff.performance) && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      Errors in daily sales: {staff.error_count} (affects performance)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



