# Chatbot RAG avec Spring Boot et Vaadin

## Description du Projet
Ce projet académique consiste en la réalisation d'un chatbot basé sur l'architecture RAG (Retrieval-Augmented Generation) utilisant Ollama 3.2 comme modèle de langage. L'application est développée avec Spring Boot pour le backend et Vaadin avec Tailwind CSS pour l'interface utilisateur.

## Architecture Technique

### Technologies Utilisées
- **Backend:**
  - Spring Boot 3.4.0
  - Spring AI (version 1.0.0-M4)
  - Java 17
  - PGVector Store pour le stockage des embeddings
  - Docker Compose pour la conteneurisation

- **Frontend:**
  - Vaadin 24.6.0
  - Tailwind CSS
  - TypeScript

### Composants Principaux
1. **Module RAG (Retrieval-Augmented Generation)**
   - Utilisation d'Ollama 3.2 pour le traitement du langage naturel
   - Stockage des chunks de données dans PGVector Store
   - Système de récupération contextuelle des informations

2. **Interface Utilisateur**
   - Design moderne avec Tailwind CSS
   - Interface responsive et intuitive
   - Composants Vaadin pour une expérience utilisateur fluide



## Fonctionnalités

### 1. Traitement des Documents
- Import et analyse de fichiers PDF
- Découpage automatique des documents en chunks
- Stockage optimisé dans PGVector Store

### 2. Interaction Utilisateur
- Interface de chat intuitive
- Réponses contextuelles basées sur les documents analysés
- Historique des conversations

## Home Page

![home](https://github.com/user-attachments/assets/12109d49-4c4c-4994-9ca8-696491ddfb9d)

## Chat Page

![chat-loading](https://github.com/user-attachments/assets/3f3207c5-8503-4042-81b9-7d5239cb530f)
![chat](https://github.com/user-attachments/assets/09498bba-ba5c-44b3-bde4-356fec7879b1)
### 3. Administration
- Configuration des paramètres du modèle
- Gestion des documents sources
- Monitoring des performances

## Architecture de Données

### Structure de la Base de Données
- Utilisation de PostgreSQL avec extension pgvector
- Stockage efficace des embeddings
- Organisation optimisée des chunks de documents

## Déploiement

### Prérequis
- Java 17
- Docker et Docker Compose
- PostgreSQL avec extension pgvector
- Ollama 3.2

### Installation
1. Cloner le repository
2. Configurer les variables d'environnement
3. Lancer Docker Compose
4. Démarrer l'application Spring Boot

## Performance et Optimisations
- Mise en cache des requêtes fréquentes
- Optimisation des embeddings
- Gestion efficace de la mémoire

## Liens Supplémentaires

### Project Micro-Service 
- Lien du frontend Angular : [Repo Frontend](https://github.com/othsoh/ecom-microServiceApp-Front-angular/)
- Lien du backend Spring Boot : [Repo Backend](https://github.com/othsoh/microService-app)


## Conclusion
Ce projet démontre l'intégration réussie d'un système RAG moderne utilisant Ollama avec une architecture Spring Boot robuste et une interface utilisateur élégante basée sur Vaadin. L'utilisation de PGVector Store permet une gestion efficace des données vectorielles, tandis que Docker Compose facilite le déploiement et la scalabilité.



---

© 2024 Projet Académique - Chatbot RAG
