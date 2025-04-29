import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function RecuperEspaces() {
  try {
    const espaces = await prisma.espace.findMany({
      include: {
        images: true
      }
    })
    return espaces
  } catch (error) {
    console.error('Erreur résupération espaces:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export async function getEspaceById(id: number) {
  try {
    const espace = await prisma.espace.findUnique({
      where: { idEspace: id },
      include: {
        images: true
      }
    })

    return espace
    
  } catch (error) {
    console.error('Erreur résupération espaces:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}