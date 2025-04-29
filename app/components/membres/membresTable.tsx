'use client'

import { Membre, Utilisateur } from "@prisma/client"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MembreWithUser extends Membre {
  utilisateur: Utilisateur
}

export default function MembreTable({ membres }: { membres: MembreWithUser[] }) {
  const router = useRouter()

  
  
  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      const res = await fetch(`/api/membre/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      if (res.ok) {
        router.refresh()
      }
    }
  }

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-left">ID Membre</th>
          <th className="py-3 px-4 text-left">Nom Membre</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Téléphone</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {membres?.map((membre) => (
          <tr key={membre.idMembre} className="hover:bg-gray-50">
            <td className="py-4 px-4">{membre.idMembre}</td>
            <td className="py-4 px-4 font-medium">{membre.utilisateur.nomUser}</td>
            <td className="py-4 px-4">{membre.utilisateur.email}</td>
            <td className="py-4 px-4">{membre.numGSM}</td>
            <td className="py-4 px-4 ">
              <button 
                onClick={() => handleDelete(membre.idMembre)}
                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 flex gap-2"
                title="Supprimer">
                <Trash2 className="w-5 h-5" /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}