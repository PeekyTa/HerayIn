import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { 
      nom,
      description,
      adresse,
      capacite,
      prixEspace,
      images = [] 
    } = await req.json()

    if (!nom || !description || !adresse || !capacite || !prixEspace || !images) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    
    const newEspace = await prisma.espace.create({
      data: {
        nom,
        description,
        adresse,
        capacite: Number(capacite),
        prixEspace: Number(prixEspace),
        images: {
          create: images.map((img: string, index: number) => ({
            img_url: img,
            imageType: index === 0 ? 'PRINCIPALE' : 'SECONDAIRE'
          }))
        }
      },
      include: {
        images: true 
      }
    })

    return NextResponse.json(newEspace, { status: 201 })
  } catch (error) {
    console.error('Erreur création espace:', error)
    return NextResponse.json(
      { error: "Erreur lors de la création de l'espace" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const espaces = await prisma.espace.findMany({
      include: {
        images: true 
      }
    })
    return NextResponse.json(espaces)
  } catch (error) {
    console.error('Erreur récupération espaces:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des espaces" },
      { status: 500 }
    )
  }
}