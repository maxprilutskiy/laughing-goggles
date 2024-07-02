/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dD12HxBHavY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"

export default function Page() {
  const [translations, setTranslations] = useState([{ key: "", value: "" }])
  const addTranslation = () => {
    setTranslations([...translations, { key: "", value: "" }])
  }
  const removeTranslation = (index) => {
    const updatedTranslations = [...translations]
    updatedTranslations.splice(index, 1)
    setTranslations(updatedTranslations)
  }
  const updateTranslation = (index, field, value) => {
    const updatedTranslations = [...translations]
    updatedTranslations[index][field] = value
    setTranslations(updatedTranslations)
  }
  const downloadJSON = () => {
    const data = JSON.stringify(
      translations.reduce((acc, translation) => {
        if (translation.key.trim() !== "") {
          acc[translation.key] = translation.value
        }
        return acc
      }, {}),
    )
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "translations.json"
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-3xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">New i18n File Generator</h1>
          <p className="mt-3 text-lg text-muted-foreground">Easily create localization files</p>
        </div>
        <div className="mt-10 space-y-4">
          {translations.map((translation, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-center gap-4">
              <Input
                placeholder="Key"
                value={translation.key}
                onChange={(e) => updateTranslation(index, "key", e.target.value)}
              />
              <Input
                placeholder="Value"
                value={translation.value}
                onChange={(e) => updateTranslation(index, "value", e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeTranslation(index)}>
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          ))}
          <div className="flex justify-center">
            <Button variant="outline" onClick={addTranslation}>
              Add Translation
            </Button>
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={downloadJSON}>Download JSON</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function Input(props) {
  return <input {...props} className="block w-full px-4 py-2 text-base text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring focus:ring-ring" />
}

function Button({ children, variant, size, ...props }) {
  const variants = {
    outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-primary hover:text-primary-foreground",
  }
  const sizes = {
    icon: "p-2",
  }
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg focus:outline-none focus:ring focus:ring-ring ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  )
}