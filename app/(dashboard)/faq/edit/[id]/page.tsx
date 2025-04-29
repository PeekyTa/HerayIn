import Faqcreation from "@/app/components/faq/faqcreation"
import { prisma } from "@/prisma"

export default async function EditFAQPage({
  params
}: {
  params: { id: string }
}) {
  const faq = await prisma.fAQ.findUnique({
    where: { idFAQ: Number(params.id) }
  })

  if (!faq) return <div>FAQ non trouvée</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier la FAQ</h1>
      <Faqcreation
        defaultValues={{
          idFAQ: faq.idFAQ,
          question: faq.question,
          réponse: faq.reponse
        }}
      />
    </div>
  )
}