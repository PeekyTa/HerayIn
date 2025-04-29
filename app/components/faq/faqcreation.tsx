'use client'

import { CircleCheckBig } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface FAQ {
  idFAQ?: number
  question: string
  reponse: string
}

export default function Faqcreation({ defaultValues, redirectPath = "/faq" }: { defaultValues?: FAQ, redirectPath?: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState<FAQ>({
    question: '',
    reponse: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    }
  }, [defaultValues])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.question.trim()) newErrors.question = 'La question est requise'
    if (!formData.reponse.trim()) newErrors.reponse = 'La réponse est requise'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const isEdit = !!defaultValues?.idFAQ
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/faq/${defaultValues.idFAQ}` : '/api/faq'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: formData.question,
          reponse: formData.reponse
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la requête')
      }

      const resetForm = () => {
        setFormData({
            question:'',
            reponse:''
        })
        setErrors({})
      }
      
      resetForm()
      router.refresh()
      router.push(redirectPath)
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative bg-white rounded-xl border border-opacity-35 border-primary p-4 h-[75px]">
          <input
            name="question"
            type="text"
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            required
            value={formData.question}
            onChange={(e) => setFormData({...formData, question: e.target.value})}
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit transition-all duration-200 peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Question <span className="text-red-500">*</span>
          </label>
          {errors.question && (
            <div className="text-red-500 text-sm mt-1">{errors.question}</div>
          )}
        </div>

        <div className="relative bg-white rounded-xl border border-opacity-35 border-primary p-4 h-[75px]">
          <input
            name="reponse"
            type="text"
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            required
            value={formData.reponse}
            onChange={(e) => setFormData({...formData, reponse: e.target.value})}
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit transition-all duration-200 peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Réponse <span className="text-red-500">*</span>
          </label>
          {errors.reponse && (
            <div className="text-red-500 text-sm mt-1">{errors.reponse}</div>
          )}
        </div>

        {errors.form && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            {errors.form}
          </div>
        )}

        <button 
          type="submit" 
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        > 
          <CircleCheckBig className="mr-2" />
          {defaultValues?.idFAQ ? 'Modifier' : 'Enregistrer'}
          {isSubmitting && '...'}
        </button>
      </form>
    </div>
  )
}