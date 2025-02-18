// import { type NextRequest, NextResponse } from "next/server"
// import db from "@/lib/db"
// import { writeFile } from "fs/promises"
// import path from "path"
// import fs from "fs"
// export async function GET(req: NextRequest) {
//   try {
//     const result = await db.query("SELECT * FROM staff ORDER BY created_at DESC")
//     return NextResponse.json(result.rows)
//   } catch (error) {
//     console.error("Error fetching staff:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }


// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   }
//   export async function POST(req: NextRequest) {
//     try {
//       const formData = await req.formData()
//       const name = formData.get("name") as string
//       const email = formData.get("email") as string
//       const phone = formData.get("phone") as string
//       const position = formData.get("position") as string
//       const service_period = formData.get("service_period") as string
//       const status = formData.get("status") as string
//       const education = formData.get("education") as string
//       const skills = formData.get("skills") as string
//       const experience = formData.get("experience") as string
//       const assigned_section = formData.get("assigned_section") as string
//       const performance = formData.get("performance") as string
//       const error_count = formData.get("error_count") as string
//       const birth_date = formData.get("birth_date") as string
//       const nationality = formData.get("nationality") as string
//       const language = formData.get("language") as string
//       const address = formData.get("address") as string
//       const image = formData.get("image") as File | null
  
//       // Ensure required fields are present
//       if (!name || !email || !phone || !position) {
//         return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//       }
  
//       let image_url = null
//       if (image) {
//         const bytes = await image.arrayBuffer()
//         const buffer = Buffer.from(bytes)
  
//         // Create a unique filename
//         const fileExtension = path.extname(image.name)
//         const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`
  
//         // Ensure the uploads directory exists
//         const uploadsDir = path.join(process.cwd(), "public", "uploads")
//         try {
//           if (!fs.existsSync(uploadsDir)) {
//             fs.mkdirSync(uploadsDir, { recursive: true })
//           }
//         } catch (err) {
//           console.error("Error creating uploads directory:", err)
//           return NextResponse.json({ error: "Failed to create uploads directory" }, { status: 500 })
//         }
  
//         // Write the file
//         try {
//           await writeFile(path.join(uploadsDir, fileName), buffer)
//           image_url = `/uploads/${fileName}`
//         } catch (err) {
//           console.error("Error writing file:", err)
//           return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
//         }
//       }
  
//       // Insert into database
//       try {
//         const result = await db.query(
//           `INSERT INTO staff (
//             name, email, phone, position, service_period, status, image_url,
//             education, skills, experience, assigned_section, performance,
//             error_count, birth_date, nationality, language, address
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
//           [
//             name,
//             email,
//             phone,
//             position,
//             service_period || "0 years",
//             status || "active",
//             image_url,
//             education || "",
//             skills ? JSON.parse(skills) : [],
//             experience || "0 years",
//             assigned_section || "",
//             Number.parseInt(performance) || 100,
//             Number.parseInt(error_count) || 0,
//             birth_date,
//             nationality,
//             language,
//             address,
//           ],
//         )
  
//         return NextResponse.json(result.rows[0], { status: 201 })
//       } catch (err) {
//         console.error("Error inserting into database:", err)
//         return NextResponse.json({ error: "Failed to create staff record" }, { status: 500 })
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error)
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//     }
//   }





// 



// import { NextResponse } from "next/server"
// import { writeFile } from "fs/promises"
// import path from "path"

// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const file: File | null = formData.get("image") as unknown as File

//   let imageUrl = ""

//   if (file) {
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const uploadDir = path.join(process.cwd(), "public/uploads")
//     const filename = `${Date.now()}-${file.name}`
//     const filepath = path.join(uploadDir, filename)

//     try {
//       await writeFile(filepath, buffer)
//       console.log(`Uploaded file saved at ${filepath}`)
//       imageUrl = `/uploads/${filename}`
//     } catch (error) {
//       console.error("Error saving file:", error)
//       return NextResponse.json({ success: false, message: "Failed to save file" }, { status: 500 })
//     }
//   }

//   // Extract other form data
//   const name = formData.get("name") as string
//   const email = formData.get("email") as string
//   const phone = formData.get("phone") as string
//   const position = formData.get("position") as string
//   const birthDate = formData.get("birth_date") as string
//   const nationality = formData.get("nationality") as string
//   const language = formData.get("language") as string
//   const education = formData.get("education") as string
//   const address = formData.get("address") as string
//   const experience = formData.get("experience") as string
//   const servicePeriod = formData.get("service_period") as string
//   const status = formData.get("status") as string
//   const assignedSection = formData.get("assigned_section") as string
//   const performance = Number(formData.get("performance")) || 100
//   const errorCount = Number(formData.get("error_count")) || 0

//   // Here you would typically save this data to a database
//   // For now, we'll just log it and return a success response
//   console.log({
//     name,
//     email,
//     phone,
//     position,
//     birthDate,
//     nationality,
//     language,
//     education,
//     address,
//     imageUrl,
//     experience,
//     servicePeriod,
//     status,
//     assignedSection,
//     performance,
//     errorCount,
//   })

//   return NextResponse.json(
//     {
//       success: true,
//       message: "Staff member added successfully",
//       data: {
//         name,
//         email,
//         phone,
//         position,
//         birthDate,
//         nationality,
//         language,
//         education,
//         address,
//         imageUrl,
//         experience,
//         servicePeriod,
//         status,
//         assignedSection,
//         performance,
//         errorCount,
//       },
//     },
//     { status: 201 },
//   )
// }






// import { NextResponse } from "next/server"
// import { writeFile } from "fs/promises"
// import path from "path"
// import db from "@/lib/db"

// export async function GET() {
//   try {
//     const result = await db.query("SELECT * FROM staff ORDER BY created_at DESC")
//     return NextResponse.json(result.rows)
//   } catch (error) {
//     console.error("Error fetching staff:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const file: File | null = formData.get("image") as unknown as File

//   let imageUrl = ""

//   if (file) {
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const uploadDir = path.join(process.cwd(), "public/uploads")
//     const filename = `${Date.now()}-${file.name}`
//     const filepath = path.join(uploadDir, filename)

//     try {
//       await writeFile(filepath, buffer)
//       console.log(`Uploaded file saved at ${filepath}`)
//       imageUrl = `/uploads/${filename}`
//     } catch (error) {
//       console.error("Error saving file:", error)
//       return NextResponse.json({ success: false, message: "Failed to save file" }, { status: 500 })
//     }
//   }

//   // Extract other form data
//   const name = formData.get("name") as string
//   const email = formData.get("email") as string
//   const phone = formData.get("phone") as string
//   const position = formData.get("position") as string
//   const birthDate = formData.get("birth_date") as string
//   const nationality = formData.get("nationality") as string
//   const language = formData.get("language") as string
//   const education = formData.get("education") as string
//   const address = formData.get("address") as string
//   const experience = formData.get("experience") as string
//   const servicePeriod = formData.get("service_period") as string
//   const status = formData.get("status") as string
//   const assignedSection = formData.get("assigned_section") as string
//   const performance = Number(formData.get("performance")) || 100
//   const errorCount = Number(formData.get("error_count")) || 0

//   try {
//     const result = await db.query(
//       `INSERT INTO staff (
//         name, email, phone, position, birth_date, nationality, language,
//         education, address, image_url, experience, service_period, status,
//         assigned_section, performance, error_count
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
//       [
//         name,
//         email,
//         phone,
//         position,
//         birthDate,
//         nationality,
//         language,
//         education,
//         address,
//         imageUrl,
//         experience,
//         servicePeriod,
//         status,
//         assignedSection,
//         performance,
//         errorCount,
//       ],
//     )

//     const newStaff = result.rows[0]

//     // Fetch the updated staff list
//     const updatedStaffList = await db.query("SELECT * FROM staff ORDER BY created_at DESC")

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Staff member added successfully",
//         data: newStaff,
//         updatedStaffList: updatedStaffList.rows,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error("Error inserting into database:", error)
//     return NextResponse.json({ success: false, message: "Failed to create staff record" }, { status: 500 })
//   }
// }


// import { NextResponse } from "next/server"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import db from "@/lib/db"

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM staff ORDER BY created_at DESC")
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file: File | null = formData.get("image") as unknown as File

    let imageUrl = ""

    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = path.join(process.cwd(), "public/uploads")
      const filename = `${Date.now()}-${file.name}`
      const filepath = path.join(uploadDir, filename)

      try {
        await writeFile(filepath, buffer)
        console.log(`Uploaded file saved at ${filepath}`)
        imageUrl = `/uploads/${filename}`
      } catch (error) {
        console.error("Error saving file:", error)
        return NextResponse.json({ success: false, message: "Failed to save file" }, { status: 500 })
      }
    }

    // Extract other form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const birthDate = formData.get("birth_date") as string
    const nationality = formData.get("nationality") as string
    const language = formData.get("language") as string
    const education = formData.get("education") as string
    const address = formData.get("address") as string
    const experience = formData.get("experience") as string
    const servicePeriod = formData.get("service_period") as string
    const status = formData.get("status") as string
    const assignedSection = formData.get("assigned_section") as string
    const performance = Number(formData.get("performance")) || 100
    const errorCount = Number(formData.get("error_count")) || 0

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    console.log("Inserting staff member into database:", {
      name,
      email,
      phone,
      position,
      birthDate,
      nationality,
      language,
      education,
      address,
      imageUrl,
      experience,
      servicePeriod,
      status,
      assignedSection,
      performance,
      errorCount,
    })

    const result = await db.query(
      `INSERT INTO staff (
        name, email, phone, position, birth_date, nationality, language,
        education, address, image_url, experience, service_period, status,
        assigned_section, performance, error_count
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [
        name,
        email,
        phone,
        position,
        birthDate,
        nationality,
        language,
        education,
        address,
        imageUrl,
        experience,
        servicePeriod,
        status,
        assignedSection,
        performance,
        errorCount,
      ],
    )

    const newStaff = result.rows[0]

    console.log("Staff member inserted successfully:", newStaff)

    // Fetch the updated staff list
    const updatedStaffList = await db.query("SELECT * FROM staff ORDER BY created_at DESC")

    return NextResponse.json(
      {
        success: true,
        message: "Staff member added successfully",
        data: newStaff,
        updatedStaffList: updatedStaffList.rows,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error inserting into database:", error)
    let errorMessage = "Failed to create staff record"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    if (!data.id) {
      return NextResponse.json({ success: false, message: "Staff ID is required" }, { status: 400 })
    }

    const result = await db.query(
      `UPDATE staff SET 
        name = $1, email = $2, phone = $3, position = $4,
        status = $5, education = $6, experience = $7,
        assigned_section = $8, performance = $9, error_count = $10
        WHERE id = $11 RETURNING *`,
      [
        data.name,
        data.email,
        data.phone,
        data.position,
        data.status,
        data.education,
        data.experience,
        data.assigned_section,
        data.performance,
        data.error_count,
        data.id,
      ],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Staff member updated successfully",
        data: result.rows[0],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating staff member:", error)
    let errorMessage = "Failed to update staff member"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Staff ID is required" }, { status: 400 })
    }

    const result = await db.query("DELETE FROM staff WHERE id = $1 RETURNING *", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Staff member deleted successfully",
        data: result.rows[0],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting staff member:", error)
    let errorMessage = "Failed to delete staff member"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}

