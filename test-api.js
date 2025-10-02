// Script de test pour vérifier l'API
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:4000/api';

async function testAPI() {
  console.log('🧪 Test de l\'API Mirror3D\n');

  try {
    // Test 1: Santé de l'API
    console.log('1️⃣ Test de santé...');
    const healthRes = await fetch('http://localhost:4000/api/health');
    const healthData = await healthRes.json();
    console.log('✅ Santé:', healthData.message);

    // Test 2: Inscription
    console.log('\n2️⃣ Test d\'inscription...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'candidat'
    };

    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    });

    if (registerRes.ok) {
      const registerResult = await registerRes.json();
      console.log('✅ Inscription réussie:', registerResult.message);
      console.log('👤 Utilisateur:', registerResult.user);
      
      // Test 3: Connexion
      console.log('\n3️⃣ Test de connexion...');
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (loginRes.ok) {
        const loginResult = await loginRes.json();
        console.log('✅ Connexion réussie:', loginResult.message);
        console.log('🔑 Token reçu');

        // Test 4: Profil utilisateur
        console.log('\n4️⃣ Test du profil...');
        const profileRes = await fetch(`${BASE_URL}/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${loginResult.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (profileRes.ok) {
          const profileResult = await profileRes.json();
          console.log('✅ Profil récupéré:', profileResult.user);
        } else {
          console.log('❌ Erreur profil:', await profileRes.text());
        }
      } else {
        console.log('❌ Erreur connexion:', await loginRes.text());
      }
    } else {
      const error = await registerRes.text();
      if (error.includes('Email déjà utilisé')) {
        console.log('⚠️ Email déjà utilisé, test de connexion directe...');
        
        const loginData = {
          email: 'test@example.com',
          password: 'password123'
        };

        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });

        if (loginRes.ok) {
          const loginResult = await loginRes.json();
          console.log('✅ Connexion réussie:', loginResult.message);
        }
      } else {
        console.log('❌ Erreur inscription:', error);
      }
    }

  } catch (error) {
    console.error('❌ Erreur de test:', error.message);
    console.log('\n💡 Assurez-vous que le serveur backend est démarré sur le port 4000');
  }
}

testAPI();
