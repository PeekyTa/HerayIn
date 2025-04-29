import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//recuperer
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const faq = await prisma.fAQ.findUnique({
      where: { idFAQ: Number(params.id) }
    })
    return NextResponse.json(faq)
  }

//modification 
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { question, reponse } = await request.json()
  const updatedFAQ = await prisma.fAQ.update({
    where: { idFAQ: Number(params.id) },
    data: { question, reponse: reponse }
  })
  return NextResponse.json(updatedFAQ)
}


  //suppression
  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    await prisma.fAQ.delete({
      where: { idFAQ: Number(params.id) }
    })
    return NextResponse.json({ success: true })
  }