# Mirror3D - Application Full Stack

## Architecture
- **Frontend**: React + Vite (port 5173) - `Front-end Mirror/`
- **Backend**: Node.js + Express + Sequelize (port 4000) - `Back-end Mirror/`
- **Base de données**: PostgreSQL

## Installation et Configuration

### 1. Prérequis
- Node.js (v16+)
- PostgreSQL
- Git

### 2. Configuration Backend
```bash
cd "Back-end Mirror"
npm install
```

Créez un fichier `.env` basé sur `env.example`:
```bash
cp env.example .env
```

Configurez votre base de données PostgreSQL dans le fichier `.env`:
```env
DB_NAME=mirror3d
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
JWT_SECRET=votre-clé-secrète-jwt
```

### 3. Configuration Frontend
```bash
cd "Front-end Mirror"
npm install
```

Le frontend utilise déjà la bonne configuration pour se connecter au backend.

### 4. Base de données
Créez une base de données PostgreSQL nommée `mirror3d` ou selon votre configuration.
Les tables seront créées automatiquement au démarrage du serveur grâce à Sequelize.

## Démarrage

### Option 1: Script automatique (Windows)
```bash
# Depuis la racine du projet
./start-dev.bat
```

### Option 2: Démarrage manuel
Terminal 1 (Backend):
```bash
cd "Back-end Mirror"
npm start
```

Terminal 2 (Frontend):
```bash
cd "Front-end Mirror"
npm run dev
```

## URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api
- **Test de santé**: http://localhost:4000/api/health

## API Endpoints
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/me` - Profil utilisateur (authentifié)

### Format des données

**Inscription** (`POST /api/auth/register`):
```json
{
  "name_user": "John Doe",
  "email_user": "john@example.com",
  "password_user": "motdepasse123",
  "role_user": "candidat"
}
```

**Connexion** (`POST /api/auth/login`):
```json
{
  "email_user": "john@example.com",
  "password_user": "motdepasse123"
}
```

## Fonctionnalités
- ✅ Inscription utilisateur avec hachage bcrypt
- ✅ Connexion avec JWT
- ✅ Authentification sécurisée
- ✅ CORS configuré
- ✅ Gestion d'erreurs
- ✅ Base de données PostgreSQL avec Sequelize
- ✅ Interface React moderne

## Structure des dossiers
```
Mirror3D/
├── Back-end Mirror/         # Backend Node.js
│   ├── controllers/         # Contrôleurs
│   ├── services/           # Logique métier
│   ├── models/             # Modèles Sequelize
│   ├── routes/             # Routes API
│   ├── middleware/         # Middlewares
│   └── index.js            # Serveur principal
├── Front-end Mirror/        # Frontend React
│   └── src/
│       ├── auth/           # Contexte d'authentification
│       ├── components/     # Composants UI
│       ├── pages/          # Pages de l'application
│       └── services/       # Services API
└── start-dev.bat           # Script de démarrage
```

## Développement
- Le backend utilise `nodemon` pour le rechargement automatique
- Le frontend utilise `Vite` pour le développement rapide
- Les mots de passe sont automatiquement hachés avec bcrypt
- JWT avec expiration de 7 jours
