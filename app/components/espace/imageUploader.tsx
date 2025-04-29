'use client'

import { Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
import {CircleX } from "lucide-react"

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void
  previewUrls?: string[]
  onRemoveImage?: (index: number) => void
}

export const ImageUploader = ({
  onImagesChange,
  previewUrls = [],
  onRemoveImage
}: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>(previewUrls)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const newPreviewImages: string[] = []

      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          newPreviewImages.push(reader.result as string)
          if (newPreviewImages.length === files.length) {
            setPreviews(prev => [...prev, ...newPreviewImages])
          }
        }
        reader.readAsDataURL(file)
      })

      onImagesChange(files)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
    onRemoveImage?.(index)
  }

  return (
    <div className="space-y-2">
      <label className="block text-primary text-lg font-normal font-outfit">
        Images de l'espace
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary rounded-lg cursor-pointer bg-white hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-primary" />
            <p className="mb-2 text-sm text-primary">Cliquez pour télécharger</p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            multiple 
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
      
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img 
                src={preview} 
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full 
                p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CircleX/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}