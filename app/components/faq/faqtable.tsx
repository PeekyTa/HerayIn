'use client'

import { FAQ } from "@prisma/client"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FAQTable({ faqs }: { faqs: FAQ[] }) {
  const router = useRouter()
  
  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette FAQ ?")) 
      {
        const res = await fetch(`/api/faq/${id}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }})
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
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Question</th>
            <th className="py-3 px-4 text-left">Réponse</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {faqs.map(faq => (
          <tr key={faq.idFAQ} className="hover:bg-gray-50">
          <td className="py-4 px-4">{faq.idFAQ}</td>
          <td className="py-4 px-4 font-medium">{faq.question}</td>
          <td className="py-4 px-4">{faq.reponse}</td>
            <td className="py-4 px-4 flex space-x-2">
              <Link 
              href={`/faq/edit/${faq.idFAQ}`}
              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                <Pencil className="w-5 h-5" />
              </Link>
              <button 
              onClick={() => handleDelete(faq.idFAQ)}
              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
              title="Supprimer">
                <Trash2 className="w-5 h-5" />
              </button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
  )
}

