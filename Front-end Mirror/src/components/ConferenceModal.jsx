import { useState } from 'react'
import { Button, Input, Alert } from './UI'

export default function ConferenceModal({ isOpen, onClose, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name_company: '',
    date_conference: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name_company || !formData.date_conference) {
      setError('Tous les champs sont requis')
      return
    }

    try {
      await onSubmit(formData)
      setFormData({ name_company: '', date_conference: '' })
      setError('')
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900">Créer une conférence</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 text-xl"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <Alert>{error}</Alert>}
          
          <Input
            label="Nom de l'entreprise"
            placeholder="Entrez le nom de l'entreprise"
            value={formData.name_company}
            onChange={(e) => handleChange('name_company', e.target.value)}
            disabled={loading}
          />

          <Input
            label="Date et heure de la conférence"
            type="datetime-local"
            value={formData.date_conference}
            onChange={(e) => handleChange('date_conference', e.target.value)}
            disabled={loading}
          />

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création...
                </>
              ) : (
                'Créer'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
