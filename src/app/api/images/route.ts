import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images', 'products')
    const files = await readdir(imagesDir)
    
    // Filter only image files
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop()
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')
    })
    
    return NextResponse.json({ images: imageFiles })
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json(
      { error: 'Failed to read images directory' },
      { status: 500 }
    )
  }
} 