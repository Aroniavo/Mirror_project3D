import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Card, Input, Button, Spinner, Alert } from '../components/UI'

export default function ResetConfirm(){
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function validate(){
    if(!token || !password || !confirm) return 'Tous les champs sont requis.'
    if(password.length < 8) return 'Mot de passe: min 8 caractères.'
    if(password !== confirm) return 'Les mots de passe ne correspondent pas.'
    return ''
  }

  async function onSubmit(e){
    e.preventDefault(); const v = validate(); if(v) return setError(v)
    setError(''); setSuccess(''); setLoading(true)
    try{
      const res = await api.resetConfirm({ token, password })
      setSuccess(res.message || 'Mot de passe modifié. Connectez-vous.')
      setTimeout(()=> navigate('/login'), 800)
    }catch(err){ setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen grid place-items-center app-bg p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="heading-xl mb-6">Nouveau mot de passe</h1>
        {error && <Alert>{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <Input label="Code / Token" placeholder="Collez le code reçu par e-mail" value={token} onChange={e=>setToken(e.target.value)} />
          <Input label="Mot de passe" type={show? 'text':'password'} placeholder="Nouveau mot de passe" value={password} onChange={e=>setPassword(e.target.value)} right={<button type="button" onClick={()=>setShow(s=>!s)} className="text-zinc-500">{show? '🙈':'👁️'}</button>} />
          <Input label="Confirmer" type={show? 'text':'password'} placeholder="Confirmez le mot de passe" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading? <><Spinner/> <span>Changement…</span></>: 'Changer le mot de passe'}</Button>
        </form>
        <div className="mt-4 text-center subtle"><Link className="link" to="/login">Retour à la connexion</Link></div>
      </Card>
    </div>
  )
}


