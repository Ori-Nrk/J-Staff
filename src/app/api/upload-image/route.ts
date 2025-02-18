// import { type NextRequest, NextResponse } from "next/server"
// import { writeFile } from "fs/promises"
// import path from "path"

// export async function POST(request: NextRequest) {
//   const data = await request.formData()
//   const file: File | null = data.get("image") as unknown as File

//   if (!file) {
//     return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
//   }

//   const bytes = await file.arrayBuffer()
//   const buffer = Buffer.from(bytes)

//   const uploadDir = path.join(process.cwd(), "public/uploads")
//   const filename = `${Date.now()}-${file.name}`
//   const filepath = path.join(uploadDir, filename)

//   try {
//     await writeFile(filepath, buffer)
//     console.log(`Uploaded file saved at ${filepath}`)

//     return NextResponse.json({
//       success: true,
//       message: "File uploaded successfully",
//       imageUrl: `/uploads/${filename}`,
//     })
//   } catch (error) {
//     console.error("Error saving file:", error)
//     return NextResponse.json({ success: false, message: "Failed to save file" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: Request) {
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
  const skills = formData.get("skills") as string
  const birthDate = formData.get("birth_date") as string
  const nationality = formData.get("nationality") as string
  const language = formData.get("language") as string
  const education = formData.get("education") as string
  const address = formData.get("address") as string

  // Here you would typically save this data to a database
  // For now, we'll just log it and return a success response
  console.log({
    name,
    email,
    phone,
    position,
    skills,
    birthDate,
    nationality,
    language,
    education,
    address,
    imageUrl,
  })

  return NextResponse.json(
    {
      success: true,
      message: "Staff member added successfully",
      data: {
        name,
        email,
        phone,
        position,
        skills,
        birthDate,
        nationality,
        language,
        education,
        address,
        imageUrl,
      },
    },
    { status: 201 },
  )
}

