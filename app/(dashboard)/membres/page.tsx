'use client'

import MembreTable from '@/app/components/membres/membresTable'
import { useEffect, useState } from 'react'

export default function MembersPage() {
  const [membres, setMembres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await fetch('/api/membres')
        const data = await response.json()
        setMembres(data)
      } catch (error) {
        console.error("Failed to fetch members:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMembres()
  }, [])

  if (loading) return <div>Chargement...</div>
  if (!membres.length) return <div>Aucun membre trouvé</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Membres</h1>
      <MembreTable membres={membres} />
    </div>
  )
}