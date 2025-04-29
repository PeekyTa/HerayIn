import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const membres = await prisma.membre.findMany({
      include: {
        utilisateur: true
      }
    })
    return NextResponse.json(membres)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récuperation des membres" },
      { status: 500 }
    )
  }
}