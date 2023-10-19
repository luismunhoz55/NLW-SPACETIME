'use client'

import { ChangeEvent, useState } from "react"

// Separate the component that needs javascript
export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null) // String, if exists

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrRL = URL.createObjectURL(files[0])

    setPreview(previewUrRL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="media"
        type="file"
        id="media"
        accept="image/*"
        className="invisible w-0 h-0"
      />

      {preview && (
        <img
          src={preview}
          className="w-full aspect-video rounded-lg object-cover"
        />
      )}
    </>
  )
}