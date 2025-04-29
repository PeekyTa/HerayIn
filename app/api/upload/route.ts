import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]
    const espaceId = formData.get('espaceId') as string | null

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files received' }, 
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + path.extname(file.name)
      const filePath = path.join(uploadDir, filename)
      
      try {
        await writeFile(filePath, buffer)
        const imageUrl = `/uploads/${filename}`

        if (espaceId) {
          await prisma.imageEspace.create({
            data: {
              img_url: imageUrl,
              imageType: 'SECONDAIRE', 
              idEspace: parseInt(espaceId)
            }
          })
        }

        return imageUrl
      } catch (error) {
        console.error('Error writing file:', error)
        throw error
      }
    })

    const urls = await Promise.all(uploadPromises)
    
    return NextResponse.json({ 
      success: true,
      urls 
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error uploading files', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}