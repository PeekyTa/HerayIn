'use client'

import { CircleCheckBig } from "lucide-react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { ImageUploader } from "./imageUploader"

const CreationEspace = (
  { defaultValues, redirectPath = "/espace" }: { defaultValues?: Espace, redirectPath?: string }
) => {
  // const router = useRouter()
  const [formData, setFormData] = useState<Espace>({
    nom: '',
    description: '',
    adresse: '',
    capacite: 0,
    prixEspace: 0,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    }
  }, [defaultValues])

  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images?.filter(img => typeof img === 'string')) || [], ...images]
    }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...(prev.images || [])]
      newImages.splice(index, 1)
      return { ...prev, images: newImages }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const newErrors: FormErrors = {}
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.description.trim()) newErrors.description = 'La description est requise'
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise'
    if (formData.capacite <= 0) newErrors.capacite = 'La capacité doit être positive'
    if (formData.prixEspace <= 0) newErrors.prixEspace = 'Le prix doit être positif'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      let imageUrls: string[] = []
    
      if (formData.images && formData.images.length > 0) {
        const filesToUpload = formData.images.filter(img => img instanceof File) as File[]
        
        if (filesToUpload.length > 0) {
          const formDataToSend = new FormData()
          filesToUpload.forEach(file => {
            formDataToSend.append('images', file)
          })

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formDataToSend
          })
            
         
          const uploadData = await uploadResponse.json() 
          
          if (!uploadResponse.ok || !uploadData.success) {
            throw new Error('Failed to upload images')
          }

          imageUrls = uploadData.urls
        }

        const existingUrls = formData.images
        .filter(img => typeof img === 'string') as string[]
      imageUrls = [...existingUrls, ...imageUrls]
    }

      const isEdit = !!defaultValues?.idEspace
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/espace/${defaultValues.idEspace}` : '/api/espace'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          description: formData.description,
          adresse: formData.adresse,
          capacite: formData.capacite,
          prixEspace: formData.prixEspace,
          images: imageUrls
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la requête')
      }

      setFormData({
        nom: '',
        description: '',
        adresse: '',
        capacite: 0,
        prixEspace: 0,
        images:[]
      })
      setErrors({})
      // router.push(redirectPath)
    } catch (error) {
      console.error('Upload error:', error)
      setErrors({
        form: error instanceof Error ? error.message : 'Failed to upload images'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto space-y-3">
        <div className="relative bg-white rounded-xl border border-opacity-35 
                          border-primary p-4 h-[75px]">
            <input
              name="nom"
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            />
            <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                            transition-all duration-200 peer-placeholder-shown:text-xl 
                            peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
              Nom de l'espace
            </label>
            {errors.nom && (
            <div className="text-red-500 text-sm mt-1">{errors.nom}</div>
          )}
          </div>
          <div className="relative bg-white rounded-xl border border-opacity-35 
                          border-primary p-4 h-[150px]">
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            />
            <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                            transition-all duration-200 peer-placeholder-shown:text-xl 
                            peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
              Description
            </label>
            {errors.description && (
            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
          )}
          </div>
          <div className="relative bg-white rounded-xl border border-opacity-35 
                        border-primary p-4 h-[75px]">
          <input
            name="adresse"
            type="text"
            value={formData.adresse}
            onChange={(e) => setFormData({...formData, adresse: e.target.value})}
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                          transition-all duration-200 peer-placeholder-shown:text-xl 
                          peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Adresse
          </label>
          {errors.adresse && (
            <div className="text-red-500 text-sm mt-1">{errors.adresse}</div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative bg-white rounded-xl border border-opacity-35 
                          border-primary p-4 h-[75px]">
            <input
              name="capacite"
              value={formData.capacite}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({...formData, capacite: value === '' ? 0 : Number(value)})
              }}
              type="number"
              className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            />
            <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                            transition-all duration-200 peer-placeholder-shown:text-xl 
                            peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
              Capacité
            </label>
            {errors.capacite && (
            <div className="text-red-500 text-sm mt-1">{errors.capacite}</div>
          )}
          </div>
          <div className="relative bg-white rounded-xl border border-opacity-35 
          border-primary p-4 h-[75px]">
            <input
              name="prix"
              type="number"
              value={formData.prixEspace}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({...formData, prixEspace: value === '' ? 0 : Number(value)})
              }}
              className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            />
            <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                            transition-all duration-200 peer-placeholder-shown:text-xl 
                            peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
              Prix (TND par heure)
            </label>
            {errors.prixEspace && (
            <div className="text-red-500 text-sm mt-1">{errors.prixEspace}</div>
          )}
          </div>
        </div>
        
        <ImageUploader 
          onImagesChange={handleImagesChange}
          onRemoveImage={handleRemoveImage}
          previewUrls={formData.images?.filter(img => typeof img === 'string') as string[]}
        />

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg 
                    hover:bg-blue-600 transition flex items-center
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        > 
          <CircleCheckBig className="mr-2" />
          Enregistrer
        </button>
        {errors.form && (
          <div className="text-red-500 text-sm mt-2">{errors.form}</div>
        )}
      </form>
    </div>
  )
}

export default CreationEspace

interface Espace {
  idEspace?: number
  nom: string
  description: string
  adresse: string
  capacite: number
  prixEspace: number
  images?: (File | string)[]
}

interface FormErrors {
  nom?: string
  description?: string
  adresse?: string
  capacite?: string
  prixEspace?: string
  form?: string
}