import CreationEspace from "@/app/components/espace/creationespace"
import { prisma } from "@/lib/prisma"

export default async function EditEspacePage(
  { params }: { params: { id: string } }) 
  {
    const espace = await prisma.espace.findUnique({
        where: { idEspace: Number(params.id) },
        include: {
          images: true
        }
      })

  if (!espace) return <div>Espace non trouvée</div>

  const imageUrls = espace.images.map((img: { img_url: any }) => img.img_url)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l'espace</h1>
      <CreationEspace
        defaultValues={{
          idEspace: espace.idEspace,
          nom: espace.nom,
          description: espace.description || '',
          adresse: espace.adresse || '',
          capacite: espace.capacite || 0,
          prixEspace: espace.prixEspace,
          images: imageUrls
        }}
        redirectPath="/espace"
      />
    </div>
  )
}