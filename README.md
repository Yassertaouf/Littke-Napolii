# Little Napoli — site web

Projet React + Vite + TypeScript + Tailwind, avec le logo du restaurant intégré.

## Lancer le projet sur ton PC

Prérequis : [Node.js](https://nodejs.org) version 18 ou plus, installé sur ta machine.

1. Dézippe ce dossier où tu veux sur ton PC.
2. Ouvre un terminal dans ce dossier (`little-napoli`).
3. Installe les dépendances :
   ```
   npm install
   ```
4. Lance le serveur de développement :
   ```
   npm run dev
   ```
5. Ouvre l'adresse affichée dans le terminal (en général `http://localhost:5173`) dans ton navigateur.

## Construire une version de production

```
npm run build
```
Les fichiers finaux seront générés dans le dossier `dist/`, prêts à être déployés sur n'importe quel hébergeur (Netlify, Vercel, OVH, etc.).

## Images

Toutes les images (logo, pizzas, photo du pizzaiolo) sont dans `public/images/`. Le logo utilisé est `public/images/logo.png` — tu peux le remplacer par un autre fichier du même nom si besoin.

Certaines images de fond (photo du four, texture) restent chargées depuis Internet (Pexels) : une connexion internet est nécessaire pour les voir correctement.
