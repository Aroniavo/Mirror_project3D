## Mirror3D Auth (React + Tailwind)

Run locally:

```bash
npm run dev
```

Environment:

- Create a `.env` file with:

```
VITE_API_URL=http://localhost:4000/api
```

Notes:

- JWT est stocké dans `localStorage` quand "Se souvenir de moi" est coché; sinon dans `sessionStorage`.
- L'en-tête Authorization `Bearer <token>` est injecté automatiquement via `api.setToken`.
- Route protégée: `/dashboard` requiert une session active.
