// "use server"

// import { revalidatePath } from "next/cache"

// export type StaffMember = {
//   id: string
//   name: string
//   position: string
//   email: string
//   phone: string
//   education: string
//   birthDate: string
//   nationality: string
//   language: string
//   address: string
//   image?: string
//   status: "active" | "inactive"
//   createdAt: Date
// }

// export async function createStaff(formData: FormData): Promise<{ success: boolean; message: string }> {
//   try {

//     await new Promise((resolve) => setTimeout(resolve, 1000))


//     const name = formData.get("name") as string
//     const position = formData.get("position") as string
//     const email = formData.get("email") as string
//     const phone = formData.get("phone") as string
//     const education = formData.get("education") as string
//     const birthDate = formData.get("birthDate") as string
//     const nationality = formData.get("nationality") as string
//     const language = formData.get("language") as string
//     const address = formData.get("address") as string


//     if (!name || !position || !email || !phone) {
//       return {
//         success: false,
//         message: "Please fill in all required fields",
//       }
//     }


//     const newStaff: StaffMember = {
//       id: `ST${Math.floor(Math.random() * 10000)}`,
//       name,
//       position,
//       email,
//       phone,
//       education,
//       birthDate,
//       nationality,
//       language,
//       address,
//       status: "active",
//       createdAt: new Date(),
//     }

//     // Revalidate the staff list page
//     revalidatePath("/staff")

//     return {
//       success: true,
//       message: "Staff member added successfully",
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: "Failed to add staff member",
//     }
//   }
// }
"use server"

import { revalidatePath } from "next/cache"
import db from "@/lib/db"

export async function addStaff(formData: FormData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const birth_date = formData.get("birth_date") as string
    const nationality = formData.get("nationality") as string
    const language = formData.get("language") as string
    const education = formData.get("education") as string
    const address = formData.get("address") as string
    const image = formData.get("image") as File | null

    // Check if all required fields are present
    const requiredFields = [name, email, phone, position, birth_date, nationality, language, education, address]
    if (requiredFields.some((field) => !field)) {
      console.error("Missing required fields")
      return { success: false, error: "Missing required fields" }
    }

    // TODO: Add image upload logic here
    const image_url = null
    if (image) {
      // Implement image upload to your preferred storage service
      // image_url = await uploadImage(image)
    }

    const result = await db.query(
      `INSERT INTO staff (name, email, phone, position, birth_date, nationality, language, education, address, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [name, email, phone, position, birth_date, nationality, language, education, address, image_url],
    )

    revalidatePath("/staff")
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error("Error in addStaff:", error)
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

