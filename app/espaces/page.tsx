'use client'
import { prisma } from "@/lib/prisma";
import CarteEspace from "../components/espace/CarteEspace";
export default async function Espacepage() {
    const espaces = await RecuperEspaces()

  return (
    <div>
    <h1 className="text-3xl font-bold mb-8">Nos Espaces</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {espaces.map((espace) => (
          <CarteEspace
          key={espace.idEspace}
          imageUrl={espace.images[0]?.img_url || '/default-space.jpg'}
          nom={espace.nom}
          description={espace.description || ''}
          prixEspace={espace.prixEspace}
          adresse={espace.adresse || ''}
          capacite={String(espace.capacite || '')}     
          />
        ))}
      </div>
    </div>
  )
}

async function RecuperEspaces() {
  return await prisma.espace.findMany({
    include: {
      images: true,
    },
  })
}

