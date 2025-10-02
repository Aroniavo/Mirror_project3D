import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Card, Input, Button, Spinner, Alert } from '../components/UI'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('candidat')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    if (!name || !email || !password || !confirm) return 'Tous les champs sont requis.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "L'email est invalide."
    if (password.length < 8) return 'Mot de passe: min 8 caractères.'
    if (password !== confirm) return 'Les mots de passe ne correspondent pas.'
    return ''
  }

  async function onSubmit(e) {
    e.preventDefault()
    const v = validate(); if (v) return setError(v)
    setError(''); setSuccess(''); setLoading(true)
    try {
      const res = await api.register({ name, email, password, role })
      setSuccess(res.message || "Compte créé. Vous pouvez vous connecter.")
      setTimeout(()=> navigate('/login'), 800)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen grid place-items-center app-bg p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="heading-xl mb-6">Créer un compte</h1>
        {error && <Alert>{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <Input label="Nom" placeholder="Entrez votre nom" value={name} onChange={e=>setName(e.target.value)} />
          <Input label="E-mail" type="email" placeholder="Entrez votre e-mail" value={email} onChange={e=>setEmail(e.target.value)} />
          <div>
            <label className="label">Sélection du rôle</label>
            <div className="relative">
              <select value={role} onChange={e=>setRole(e.target.value)} className="input appearance-none pr-10">
                <option value="candidat">Candidat</option>
                <option value="entreprise">Entreprise</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">▾</div>
            </div>
          </div>
          <Input label="Mot de passe" type={show? 'text':'password'} placeholder="Créez un mot de passe" value={password} onChange={e=>setPassword(e.target.value)} right={<button type="button" onClick={()=>setShow(s=>!s)} className="text-zinc-500">{show? '🙈':'👁️'}</button>} />
          <Input label="Confirmer le mot de passe" type={show? 'text':'password'} placeholder="Confirmez le mot de passe" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading? <><Spinner/> <span>Création…</span></>: "S'inscrire"}</Button>
        </form>
        <div className="mt-4 text-center subtle">Déjà un compte? <Link className="link" to="/login">Se connecter</Link></div>
      </Card>
    </div>
  )
}


