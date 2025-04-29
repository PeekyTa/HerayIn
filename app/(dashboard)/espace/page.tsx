import React from 'react'
import CreationEspace from '@/app/components/espace/creationespace'
import PreviewEspace from '@/app/components/espace/Preview'
import { prisma } from '@/lib/prisma'

const PageEspace = async () => {
  const espaces = await RecuperEspaces()

  return (
    <div>
      <CreationEspace />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {espaces.map((espace) => (
          <PreviewEspace
            key={espace.idEspace}
            imageUrl={espace.images[0]?.img_url || '/default-space.jpg'}
            nom={espace.nom}
            description={espace.description || ''}
            prixEspace={espace.prixEspace}
            adresse={espace.adresse || ''}
            capacite={String(espace.capacite || '')} 
            idEspace={0}          />
        ))}
      </div>
    </div>
  )
}

export default PageEspace

async function RecuperEspaces() {
  return await prisma.espace.findMany({
    include: {
      images: true,
    },
  })
}
