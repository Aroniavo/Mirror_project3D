import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Card, Button } from '../components/UI'

export default function CompanyDashboard(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function onLogout(){ logout(); navigate('/login') }
  return (
    <div className="min-h-screen app-bg p-6 grid place-items-center">
      <Card className="w-full max-w-2xl p-8">
        <h1 className="heading-xl">Espace Entreprise</h1>
        <p className="subtle mt-2">Bienvenue {user?.name || 'Entreprise'}.</p>
        <div className="mt-6 max-w-sm">
          <Button onClick={onLogout}>Se déconnecter</Button>
        </div>
      </Card>
    </div>
  )
}


