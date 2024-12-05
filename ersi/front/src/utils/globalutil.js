/**
 * Étapes pour exécuter le frontend :
1. Installation des dépendances
Avant d'exécuter le projet, il faut d'abord installer les dépendances nécessaires qui sont définies dans le fichier package.json. Voici comment procéder :

Cloner le projet ou accéder au répertoire du projet :

Si vous n'avez pas encore cloné le projet, exécutez la commande suivante dans votre terminal (dans le répertoire où vous voulez cloner le projet) :
bash
Copier le code
git clone <URL-du-dépot>
cd <nom-du-répertoire>
Installer les dépendances :

Une fois dans le répertoire du projet, vous pouvez installer toutes les dépendances nécessaires en utilisant npm ou yarn.
bash
Copier le code
**npm install

2. Exécuter le projet en mode développement
Après avoir installé les dépendances, vous pouvez lancer l'application en mode développement en utilisant la commande suivante :

bash
Copier le code
npm run dev
Cela démarrera un serveur local (souvent accessible à l'adresse http://localhost:5173/) où vous pourrez voir l'application en cours d'exécution.


3. Tester le projet
Pour tester le projet, voici quelques actions importantes :

Vérifier si l'application fonctionne correctement en mode développement :

Une fois le serveur démarré, accédez à http://localhost:5173/ dans votre navigateur pour tester si l'interface frontend se charge correctement.
Vérifiez que les différentes fonctionnalités du site (comme l'authentification ou la navigation) fonctionnent comme prévu.
Lancer les tests (si disponibles) :

Si des tests étaient configurés, vous pouvez les exécuter en utilisant la commande suivante :
bash
Copier le code
npm run test
Cependant, le fichier package.json dans ce cas n'indique pas de tests spécifiés (le script test renvoie un message d'erreur). Vous devrez donc ajouter ou configurer des tests si nécessaire.

Dépendances importantes
Voici une brève explication des dépendances importantes utilisées dans ce projet frontend :

@vitejs/plugin-react : Plugin pour Vite afin de prendre en charge React.
eslint et eslint-config-prettier : Utilisés pour la vérification du code source afin de s'assurer qu'il respecte les règles de style définies.
prettier : Utilisé pour le formatage automatique du code.
vite : Un bundler rapide pour les applications modernes.
antd : Bibliothèque de composants d'interface utilisateur pour React.
axios : Client HTTP pour envoyer des requêtes HTTP vers un backend.
formik et yup : Utilisés pour la gestion des formulaires et la validation des données dans React.
react-router-dom : Utilisé pour la gestion de la navigation dans l'application React.
react-query : Bibliothèque pour la gestion des requêtes API dans React.
****En résumé
*Installez les dépendances avec npm install .
*Exécutez l'application en mode développement avec npm run dev .
*Testez l'application en accédant à http://localhost:5173/.
*Utilisez npm run format pour formater le code, et npm run lint pour vérifier les erreurs de style.
*Pour un build de production, utilisez npm run build.
 */