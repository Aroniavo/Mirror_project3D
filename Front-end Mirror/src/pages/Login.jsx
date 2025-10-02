import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { api } from '../services/api'
import { Card, Input, Button, Spinner, Alert } from '../components/UI'

export default function Login() {
  const navigate = useNavigate()
  const { saveAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    if (!email || !password) return 'Tous les champs sont requis.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "L'email est invalide."
    if (password.length < 8) return 'Mot de passe: min 8 caractères.'
    return ''
  }

  async function onSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)
    setError('')
    setLoading(true)
    try {
      const res = await api.login({ email, password })
      saveAuth({ token: res.token, user: res.user, remember })
      const role = res.user?.role || 'candidat'
      navigate(role === 'entreprise' ? '/entreprise' : '/dashboard')
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen grid place-items-center app-bg p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-10 w-10 rounded-full grid place-items-center text-violet-400 text-2xl">ɱ</div>
          <h1 className="heading-xl mt-4">Bienvenue dans le monde virtuel Mirror</h1>
        </div>
        {error && <Alert>{error}</Alert>}
        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <Input label="E-mail" type="email" placeholder="Entrez votre e-mail" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input label="Mot de passe" type={show? 'text':'password'} placeholder="Entrez votre mot de passe" value={password} onChange={e=>setPassword(e.target.value)} right={<button type="button" onClick={()=>setShow(s=>!s)} className="text-zinc-500">{show? '🙈':'👁️'}</button>} />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Se souvenir de moi</label>
            <Link to="/reset" className="link">Mot de passe oublié?</Link>
          </div>
          <Button type="submit" disabled={loading}>{loading? <><Spinner/> <span>Connexion…</span></>: 'Se connecter'}</Button>
        </form>
        <Button as="a" variant="ghost" className="mt-3" onClick={()=>navigate('/register')}>S'inscrire</Button>
      </Card>
    </div>
  )
}


