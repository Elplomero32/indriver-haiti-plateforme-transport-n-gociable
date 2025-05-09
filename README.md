# InDriver Haiti - Plateforme de Transport Négociable

Une plateforme web permettant aux utilisateurs de négocier les tarifs de transport directement avec les chauffeurs en Haïti, offrant une expérience sûre, rapide et transparente.

## 🚀 Fonctionnalités

### Pour les Passagers
- Inscription et connexion sécurisées
- Demande de trajet avec géolocalisation
- Négociation des tarifs en temps réel
- Système de notation des chauffeurs
- Historique des trajets
- Bouton d'urgence pendant les trajets

### Pour les Chauffeurs
- Inscription avec validation des documents
- Gestion de la disponibilité
- Visualisation des demandes de trajet à proximité
- Négociation des tarifs
- Système de notation des passagers

### Pour les Administrateurs
- Tableau de bord de contrôle
- Gestion des utilisateurs
- Validation des documents des chauffeurs
- Statistiques et rapports
- Surveillance en temps réel

## 🛠️ Technologies Utilisées

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Socket.io Client
  - Google Maps API

- **Backend:**
  - Node.js avec Express
  - MongoDB
  - Socket.io
  - JWT pour l'authentification

## 📦 Installation

1. Clonez le repository :
\`\`\`bash
git clone https://github.com/votre-username/indriver-haiti.git
cd indriver-haiti
\`\`\`

2. Installez les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Créez un fichier .env à partir du modèle :
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configurez vos variables d'environnement dans le fichier .env

5. Lancez l'application en mode développement :
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Configuration

### Variables d'Environnement Requises

- \`VITE_GOOGLE_MAPS_API_KEY\`: Clé API Google Maps
- \`VITE_API_URL\`: URL de l'API backend
- \`VITE_SOCKET_URL\`: URL du serveur WebSocket

## 🚀 Déploiement

1. Construisez l'application :
\`\`\`bash
npm run build
\`\`\`

2. Les fichiers de production seront générés dans le dossier \`dist\`

## 📱 Compatibilité

- Application web responsive (mobile et desktop)
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Possibilité d'extension vers des applications mobiles natives

## 🔒 Sécurité

- Authentification JWT
- Validation des documents des chauffeurs
- Chiffrement des données sensibles
- Bouton d'urgence intégré
- Surveillance en temps réel

## 💰 Monétisation

- Commission sur chaque trajet
- Publicité locale
- Plans premium pour les chauffeurs

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou assistance :
- Email: support@indriverhaiti.com
- Téléphone: +509 XXXX-XXXX

## ✨ Remerciements

Un grand merci à tous les contributeurs qui rendent ce projet possible !

---

Développé avec ❤️ pour Haïti
