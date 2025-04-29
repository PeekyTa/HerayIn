import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    
    // Validation de l'ID
    if (isNaN(id) || id === 0) {
      return NextResponse.json(
        { error: "ID d'espace invalide" },
        { status: 400 }
      )
    }

    // Vérification de l'existence de l'espace
    const espace = await prisma.espace.findUnique({
      where: { idEspace: id }
    })

    if (!espace) {
      return NextResponse.json(
        { error: "Espace non trouvé" },
        { status: 404 }
      )
    }

    // Suppression
    await prisma.espace.delete({
      where: { idEspace: id }
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur de suppression:', error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}