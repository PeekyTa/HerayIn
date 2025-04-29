'use client'
import Image from 'next/image'
import { Outfit } from 'next/font/google'
import { MapPin } from 'lucide-react'

const outfit = Outfit({ subsets: ['latin'] })

interface CarteEspaceProps {
  imageUrl: string
  nom: string
  adresse: string
  description: string
  capacite: string
  prixEspace: number
}

const CarteEspace: React.FC<CarteEspaceProps> = ({
  imageUrl,
  nom,
  adresse,
  description,
  capacite,
  prixEspace,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 p-3 rounded-xl">
      <div className="w-full aspect-video relative rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={nom}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 250px"
        />
      </div>

      <div className="space-y-2">
        <h3 className={`text-lg font-semibold line-clamp-1 ${outfit.className}`}>
          {nom}
        </h3>
        
        <div className="flex gap-1 items-center text-sm">
          <MapPin className="w-4 h-4" />
          <p className={`text-gray-600 line-clamp-1 ${outfit.className}`}>
            {adresse}
          </p>
        </div>

        <p className={`text-sm text-gray-500 line-clamp-2 ${outfit.className}`}>
          {description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2 text-sm">
        <div className="flex items-center gap-1">
          <span className={`font-medium ${outfit.className}`}>{capacite}</span>
          <span className="text-gray-500">personnes</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className={`font-medium ${outfit.className}`}>{prixEspace}</span>
          <span className="text-gray-500">TND/h</span>
        </div>
      </div>

      <button
        className="mt-2 w-full py-2 bg-[#FE5733] rounded-lg flex justify-center items-center hover:bg-[#E04B2B] transition-colors"
      >
        <span className={`text-sm font-medium text-white ${outfit.className}`}>
          Consulter
        </span>
      </button>
    </div>
  )
}

export default CarteEspace