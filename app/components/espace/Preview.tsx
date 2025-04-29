'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash, PenIcon, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })


export default function PreviewEspace({
  idEspace,
  imageUrl,
  nom,
  adresse,
  description,
  capacite,
  prixEspace,
}: {
  idEspace: number
  imageUrl: string
  nom: string
  adresse: string
  description: string
  capacite: string
  prixEspace: number
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!idEspace || idEspace === 0) {
      setError("ID d'espace invalide")
      return
    }

    if (!confirm("Êtes-vous sûr de vouloir supprimer cet Espace ?")) return

    setIsDeleting(true)
    setError(null)

    try {
      const res = await fetch(`/api/espace/${idEspace}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Échec de la suppression')
      }

      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <div className="w-full flex flex-col items-start gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full aspect-video relative rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Image de ${nom}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <h3 className={`w-full text-xl font-semibold ${outfit.className}`}>
        {nom}
      </h3>

      <div className="flex gap-1 items-center text-sm">
        <MapPin className="w-4 h-4" />
        <p className={outfit.className}>{adresse}</p>
      </div>

      <p className={`w-full text-sm text-gray-600 line-clamp-2 ${outfit.className}`}>
        {description}
      </p>

      <div className="w-full flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <span className={outfit.className}>{capacite}</span>
          <span className="text-gray-500">personnes</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={outfit.className}>{prixEspace}</span>
          <span className="text-gray-500">TND/h</span>
        </div>
      </div>

      <div className="flex gap-4 w-full justify-end mt-2">
        <Link
          href={`/espace/edit/${idEspace}`}
          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
          aria-label="Modifier l'espace"
        >
          <PenIcon className="text-blue-500" />
        </Link>
        <button
          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 disabled:opacity-50"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Supprimer l'espace"
        >
          <Trash className="text-red-500" />
          {isDeleting && <span className="ml-1">...</span>}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}