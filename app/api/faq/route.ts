import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

//création de donnees
export async function POST(req: Request) {
  try {
    const { question, reponse } = await req.json()

    if (!question || !reponse) {
      return NextResponse.json(
        { error: "Question et reponse sont requises" },
        { status: 400 }
      )
    }

    // creati fel bd using prisma
    const newFaq = await prisma.fAQ.create({
      data: {
        question,
        reponse: reponse
      }
    })

    return NextResponse.json(newFaq, { status: 201 }) //ken rajaa 201 yaani succee
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la FAQ" },
      { status: 500 }
    )
  }
}

//lecture de donnee
export async function GET() {
    const faqs = await prisma.fAQ.findMany()
    return NextResponse.json(faqs)
  }