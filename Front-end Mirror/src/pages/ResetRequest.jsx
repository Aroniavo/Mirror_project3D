import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { Card, Input, Button, Spinner, Alert } from '../components/UI'

export default function ResetRequest() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function validate(){
    if(!email) return 'Email requis.'
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "L'email est invalide."
    return ''
  }

  async function onSubmit(e){
    e.preventDefault(); const v=validate(); if(v) return setError(v)
    setError(''); setSuccess(''); setLoading(true)
    try{
      const res = await api.resetRequest({ email })
      setSuccess(res.message || 'Un e-mail avec un code a été envoyé.')
    }catch(err){ setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen grid place-items-center app-bg p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="heading-xl mb-6">Réinitialiser le mot de passe</h1>
        {error && <Alert>{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <Input label="E-mail" type="email" placeholder="Entrez votre e-mail" value={email} onChange={e=>setEmail(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading? <><Spinner/> <span>Envoi…</span></>: 'Envoyer le lien'}</Button>
        </form>
        <div className="mt-4 text-center subtle"><Link className="link" to="/reset/confirm">J'ai un code</Link></div>
      </Card>
    </div>
  )
}


