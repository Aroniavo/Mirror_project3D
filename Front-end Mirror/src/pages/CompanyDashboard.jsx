import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../components/UI'
import DataTable from '../components/DataTable'
import ConferenceModal from '../components/ConferenceModal'
import { api } from '../services/api'

export default function CompanyDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('conferences')
  const [conferences, setConferences] = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConferenceModal, setShowConferenceModal] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)

  // Colonnes pour la table des conférences
  const conferenceColumns = [
    { key: 'id_conference', label: 'ID', sortable: true },
    { key: 'name_company', label: 'Entreprise', sortable: true },
    { 
      key: 'date_conference', 
      label: 'Date', 
      sortable: true,
      render: (value) => new Date(value).toLocaleString('fr-FR')
    },
    { 
      key: 'lien_conference', 
      label: 'Lien', 
      render: (value) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-violet-600 hover:text-violet-800 underline"
        >
          Rejoindre
        </a>
      )
    }
  ]

  // Colonnes pour la table des entretiens (placeholder)
  const interviewColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'candidate', label: 'Candidat', sortable: true },
    { key: 'position', label: 'Poste', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Statut', sortable: true }
  ]

  // Charger les données
  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'conferences') {
        const response = await api.getConferences()
        setConferences(response.conferences || [])
      } else {
        // Pour l'instant, données fictives pour les entretiens
        setInterviews([
          { id: 1, candidate: 'Jean Dupont', position: 'Développeur', date: '2024-01-15', status: 'Planifié' },
          { id: 2, candidate: 'Marie Martin', position: 'Designer', date: '2024-01-16', status: 'Terminé' }
        ])
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  // Créer une conférence
  const handleCreateConference = async (formData) => {
    setCreateLoading(true)
    try {
      await api.createConference(formData)
      await loadData() // Recharger les données
    } finally {
      setCreateLoading(false)
    }
  }

  // Charger les données au changement d'onglet
  useEffect(() => {
    loadData()
  }, [activeTab])

  function onLogout() { 
    logout() 
    navigate('/login') 
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Espace Entreprise</h1>
              <p className="text-zinc-600">Bienvenue {user?.name || 'Entreprise'}</p>
            </div>
            <Button onClick={onLogout} variant="ghost">
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('conferences')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'conferences'
                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                📹 Conférences
              </button>
              <button
                onClick={() => setActiveTab('interviews')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'interviews'
                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                💼 Entretiens
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'conferences' && (
            <DataTable
              title="Gestion des Conférences"
              data={conferences}
              columns={conferenceColumns}
              loading={loading}
              onCreateClick={() => setShowConferenceModal(true)}
              createButtonText="Créer une conférence"
              emptyMessage="Aucune conférence créée pour le moment"
            />
          )}

          {activeTab === 'interviews' && (
            <DataTable
              title="Gestion des Entretiens"
              data={interviews}
              columns={interviewColumns}
              loading={loading}
              onCreateClick={() => alert('Fonctionnalité à venir')}
              createButtonText="Planifier un entretien"
              emptyMessage="Aucun entretien planifié pour le moment"
            />
          )}
        </div>
      </div>

      {/* Modal de création de conférence */}
      <ConferenceModal
        isOpen={showConferenceModal}
        onClose={() => setShowConferenceModal(false)}
        onSubmit={handleCreateConference}
        loading={createLoading}
      />
    </div>
  )
}


