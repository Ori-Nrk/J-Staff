
// "use client"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { AnimatePresence, motion } from "framer-motion"
// import { Bell, Plus, Search } from "lucide-react"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { StaffCard } from "./staff-card"

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

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaff, setExpandedStaff] = useState<number | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [positionFilter, setPositionFilter] = useState("All")
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function fetchStaff() {
//       try {
//         const response = await fetch("/api/staff")
//         if (!response.ok) {
//           throw new Error("Failed to fetch staff")
//         }
//         const data = await response.json()
//         setStaffMembers(data)
//       } catch (error) {
//         console.error("Error fetching staff:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchStaff()
//   }, [])

//   const filteredStaff = staffMembers.filter((staff) => {
//     const matchesSearch =
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.email.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPosition = positionFilter === "All" || staff.position === positionFilter
//     return matchesSearch && matchesPosition
//   })

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[50vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col gap-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staffs</h1>
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button>
//           <Link href="/staff/new">
//             <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//               <Plus className="mr-2 h-4 w-4" />
//               Add New Staff
//             </Button>
//           </Link>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="pl-8 w-full"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Select value={positionFilter} onValueChange={setPositionFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Position: All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="waiter">Waiter</SelectItem>
//             <SelectItem value="cashier">Cashier</SelectItem>
//             <SelectItem value="bartender">Bartender</SelectItem>
//             <SelectItem value="chef">Chef</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="rounded-lg border bg-card"
//       >
//         <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
//           <div>Name</div>
//           <div>Contacts</div>
//           <div>Position</div>
//           <div>Service Period</div>
//           <div>Status</div>
//         </div>
//         <AnimatePresence>
//           {filteredStaff.map((staff) => (
//             <motion.div
//               key={staff.id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <StaffCard
//                 staff={staff}
//                 isExpanded={expandedStaff === staff.id}
//                 onToggle={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}
//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"

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

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff members")
//       }
//       const data = await response.json()
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   return (
//     <div className="space-y-4">
//       {staffMembers.map((staff) => (
//         <StaffCard
//           key={staff.id}
//           staff={staff}
//           isExpanded={expandedStaffId === staff.id}
//           onToggle={() => setExpandedStaffId(expandedStaffId === staff.id ? null : staff.id)}
//           onUpdate={handleStaffUpdate}
//         />
//       ))}
//     </div>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"

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

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff members")
//       }
//       const data = await response.json()
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 font-semibold bg-muted text-muted-foreground">
//         <div>Name</div>
//         <div>Contact</div>
//         <div>Position</div>
//         <div>Service Period</div>
//         <div>Status</div>
//       </div>
//       {staffMembers.map((staff) => (
//         <StaffCard
//           key={staff.id}
//           staff={staff}
//           isExpanded={expandedStaffId === staff.id}
//           onToggle={() => setExpandedStaffId(expandedStaffId === staff.id ? null : staff.id)}
//           onUpdate={handleStaffUpdate}
//         />
//       ))}
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"

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

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff members")
//       }
//       const data = await response.json()
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 font-medium text-muted-foreground bg-muted/50">
//         <div></div>
//         <div>Name</div>
//         <div>Contact</div>
//         <div>Position</div>
//         <div>Service Period</div>
//         <div>Status</div>
//       </div>
//       {staffMembers.map((staff) => (
//         <StaffCard
//           key={staff.id}
//           staff={staff}
//           isExpanded={expandedStaffId === staff.id}
//           onToggle={() => setExpandedStaffId(expandedStaffId === staff.id ? null : staff.id)}
//           onUpdate={handleStaffUpdate}
//         />
//       ))}
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"

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

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff members")
//       }
//       const data = await response.json()
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div>Name</div>
//             <div>Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div>Status</div>
//           </div>
//           {staffMembers.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }













// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff members")
//       }
//       const data = await response.json()
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div>Name</div>
//             <div>Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div>Status</div>
//           </div>
//           {staffMembers.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useToast } from "@/src/components/ui/use-toast"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       if (!Array.isArray(data)) {
//         throw new Error("Data is not in the expected format")
//       }
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//       setError(error instanceof Error ? error.message : "An unexpected error occurred")
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch staff members. Please try again later.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//           <Button onClick={fetchStaffMembers} className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : staffMembers.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           <p>No staff members found.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] gap-4 p-4 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div>Name</div>
//             <div>Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div>Status</div>
//           </div>
//           {staffMembers.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useToast } from "@/src/components/ui/use-toast"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       if (!Array.isArray(data)) {
//         throw new Error("Data is not in the expected format")
//       }
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//       setError(error instanceof Error ? error.message : "An unexpected error occurred")
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch staff members. Please try again later.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//           <Button onClick={fetchStaffMembers} className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : staffMembers.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           <p>No staff members found.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div className="pl-[40px]">Name</div>
//             <div className="pl-0">Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div className="flex justify-center min-w-[120px]">Status</div>
//           </div>
//           {staffMembers.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Plus, Search } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useToast } from "@/src/components/ui/use-toast"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [positionFilter, setPositionFilter] = useState("All")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       if (!Array.isArray(data)) {
//         throw new Error("Data is not in the expected format")
//       }
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//       setError(error instanceof Error ? error.message : "An unexpected error occurred")
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch staff members. Please try again later.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   const filteredStaff = staffMembers.filter((staff) => {
//     const matchesSearch =
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.phone.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPosition = positionFilter === "All" || staff.position === positionFilter
//     return matchesSearch && matchesPosition
//   })

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-[#f77700]">Staffs</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Position:</span>
//           <Select value={positionFilter} onValueChange={setPositionFilter}>
//             <SelectTrigger className="w-[160px] bg-[#ffe6d5]">
//               <SelectValue placeholder="All positions" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All</SelectItem>
//               <SelectItem value="Manager">Manager</SelectItem>
//               <SelectItem value="Supervisor">Supervisor</SelectItem>
//               <SelectItem value="Cashier">Cashier</SelectItem>
//               <SelectItem value="Sales Associate">Sales Associate</SelectItem>
//               <SelectItem value="Customer Service Representative">Customer Service</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9 bg-[#ffe6d5]"
//           />
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//           <Button onClick={fetchStaffMembers} className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : filteredStaff.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           <p>No staff members found.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground bg-[#ffe6d5]">
//             <div></div>
//             <div className="pl-[40px]">Name</div>
//             <div className="pl-0">Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div className="flex justify-center min-w-[120px]">Status</div>
//           </div>
//           {filteredStaff.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }

// 

// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Plus, Search } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useToast } from "@/src/components/ui/use-toast"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [positionFilter, setPositionFilter] = useState("All")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       if (!Array.isArray(data)) {
//         throw new Error("Data is not in the expected format")
//       }
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//       setError(error instanceof Error ? error.message : "An unexpected error occurred")
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch staff members. Please try again later.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   const filteredStaff = staffMembers.filter((staff) => {
//     const matchesSearch =
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.phone.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPosition = positionFilter === "All" || staff.position === positionFilter
//     return matchesSearch && matchesPosition
//   })

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Position:</span>
//           <div className="bg-white rounded-md">
//             <Select value={positionFilter} onValueChange={setPositionFilter}>
//               <SelectTrigger className="w-[160px] border-none">
//                 <SelectValue placeholder="All positions" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All</SelectItem>
//                 <SelectItem value="Manager">Manager</SelectItem>
//                 <SelectItem value="Supervisor">Supervisor</SelectItem>
//                 <SelectItem value="Cashier">Cashier</SelectItem>
//                 <SelectItem value="Sales Associate">Sales Associate</SelectItem>
//                 <SelectItem value="Customer Service Representative">Customer Service</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//           <Button onClick={fetchStaffMembers} className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : filteredStaff.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           <p>No staff members found.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div className="pl-[40px]">Name</div>
//             <div className="pl-0">Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div className="flex justify-center min-w-[120px]">Status</div>
//           </div>
//           {filteredStaff.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { StaffCard } from "./staff-card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/src/components/ui/use-toast"

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

export function StaffList() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState("All")
  const { toast } = useToast()

  useEffect(() => {
    fetchStaffMembers()
  }, [])

  const fetchStaffMembers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/staff")
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error("Data is not in the expected format")
      }
      setStaffMembers(data)
    } catch (error) {
      console.error("Error fetching staff members:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch staff members. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStaffUpdate = (updatedStaff: StaffMember) => {
    setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
  }

  const handleToggle = (staffId: number) => {
    setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
  }

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPosition =
      positionFilter === "All" ||
      staff.position.toLowerCase() === positionFilter.toLowerCase() ||
      (positionFilter === "Waiter/Waitress" &&
        (staff.position.toLowerCase() === "waiter" || staff.position.toLowerCase() === "waitress"))

    return matchesSearch && matchesPosition
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff List</h1>
        <Link href="/staff/new">
          <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Staff
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Position:</span>
          <div className="bg-white rounded-md">
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[160px] border-none">
                <SelectValue placeholder="All positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Positions</SelectItem>
                <SelectItem value="Waiter/Waitress">
                  <div className="flex items-center">
                    <span className="mr-2">🍽️</span>
                    Waiter/Waitress
                  </div>
                </SelectItem>
                <SelectItem value="Bartender">
                  <div className="flex items-center">
                    <span className="mr-2">🍸</span>
                    Bartender
                  </div>
                </SelectItem>
                <SelectItem value="Supervisor">
                  <div className="flex items-center">
                    <span className="mr-2">👔</span>
                    Supervisor
                  </div>
                </SelectItem>
                <SelectItem value="Head Chef">
                  <div className="flex items-center">
                    <span className="mr-2">👨‍🍳</span>
                    Head Chef
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button onClick={fetchStaffMembers} className="mt-4">
            Retry
          </Button>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>No staff members found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground bg-muted/50">
            <div></div>
            <div className="pl-[40px]">Name</div>
            <div className="pl-0">Contact</div>
            <div>Position</div>
            <div>Service Period</div>
            <div className="flex justify-center min-w-[120px]">Status</div>
          </div>
          {filteredStaff.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              isExpanded={expandedStaffId === staff.id}
              onToggle={() => handleToggle(staff.id)}
              onUpdate={handleStaffUpdate}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { StaffCard } from "./staff-card"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Plus, Search } from "lucide-react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useToast } from "@/src/components/ui/use-toast"

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
//   experience: string
//   assigned_section: string
//   performance: number
//   error_count: number
//   sex?: string[] // Updated: sex is now optional and an array
// }

// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaffId, setExpandedStaffId] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [positionFilter, setPositionFilter] = useState("All")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchStaffMembers()
//   }, [])

//   const fetchStaffMembers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/staff")
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       if (!Array.isArray(data)) {
//         throw new Error("Data is not in the expected format")
//       }
//       setStaffMembers(data)
//     } catch (error) {
//       console.error("Error fetching staff members:", error)
//       setError(error instanceof Error ? error.message : "An unexpected error occurred")
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch staff members. Please try again later.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStaffUpdate = (updatedStaff: StaffMember) => {
//     setStaffMembers((prevStaff) => prevStaff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)))
//   }

//   const handleToggle = (staffId: number) => {
//     setExpandedStaffId(expandedStaffId === staffId ? null : staffId)
//   }

//   const filteredStaff = staffMembers.filter((staff) => {
//     const matchesSearch =
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.phone.toLowerCase().includes(searchQuery.toLowerCase())

//     const matchesPosition =
//       positionFilter === "All" ||
//       staff.position.toLowerCase() === positionFilter.toLowerCase() ||
//       (positionFilter === "Waiter/Waitress" &&
//         (staff.position.toLowerCase() === "waiter" || staff.position.toLowerCase() === "waitress"))

//     return matchesSearch && matchesPosition
//   })

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff List</h1>
//         <Link href="/staff/new">
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Staff
//           </Button>
//         </Link>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Position:</span>
//           <div className="bg-white rounded-md">
//             <Select value={positionFilter} onValueChange={setPositionFilter}>
//               <SelectTrigger className="w-[160px] border-none">
//                 <SelectValue placeholder="All positions" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All Positions</SelectItem>
//                 <SelectItem value="Waiter/Waitress">
//                   <div className="flex items-center">
//                     <span className="mr-2">🍽️</span>
//                     Waiter/Waitress
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="Bartender">
//                   <div className="flex items-center">
//                     <span className="mr-2">🍸</span>
//                     Bartender
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="Supervisor">
//                   <div className="flex items-center">
//                     <span className="mr-2">👔</span>
//                     Supervisor
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="Head Chef">
//                   <div className="flex items-center">
//                     <span className="mr-2">👨‍🍳</span>
//                     Head Chef
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center h-[50vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//           <Button onClick={fetchStaffMembers} className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : filteredStaff.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           <p>No staff members found.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-[2rem_1.5fr_2fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground bg-muted/50">
//             <div></div>
//             <div className="pl-[40px]">Name</div>
//             <div className="pl-0">Contact</div>
//             <div>Position</div>
//             <div>Service Period</div>
//             <div className="flex justify-center min-w-[120px]">Status</div>
//           </div>
//           {filteredStaff.map((staff) => (
//             <StaffCard
//               key={staff.id}
//               staff={staff}
//               isExpanded={expandedStaffId === staff.id}
//               onToggle={() => handleToggle(staff.id)}
//               onUpdate={handleStaffUpdate}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   )
// }

