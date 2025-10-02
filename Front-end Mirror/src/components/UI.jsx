export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function Input({ label, error, right, className = '', ...props }) {
  return (
    <div>
      {label ? <label className="label">{label}</label> : null}
      <div className="relative">
        <input className={`input ${className}`} {...props} />
        {right ? <div className="absolute inset-y-0 right-3 flex items-center text-zinc-500">{right}</div> : null}
      </div>
      {error ? <div className="mt-1 text-xs text-red-400">{error}</div> : null}
    </div>
  )
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const base = variant === 'primary' ? 'btn btn-primary w-full' : 'btn btn-ghost w-full'
  return <button className={`${base} ${className}`} {...props} />
}

export function Spinner({ size = 16 }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4"/>
    </svg>
  )
}

export function Alert({ type = 'error', children }) {
  const cls = type === 'success' ? 'alert alert-success' : 'alert alert-error'
  return <div className={cls}>{children}</div>
}


