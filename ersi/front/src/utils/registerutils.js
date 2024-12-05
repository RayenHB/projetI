/**
 * Le backend doit implémenter les API suivantes pour que ce composant fonctionne correctement :
 * 1. **POST /register** : Créer un nouveau compte utilisateur (client ou prestataire) avec les informations envoyées.
 * 2. **POST /upload-image** : Télécharger une image (photo de service) et retourner l'URL de l'image téléchargée.
 */

/**
 * 1. Créer un nouveau compte utilisateur
 *
 * Fonction : `handleRegister`
 * - Cette fonction permet de créer un nouveau compte utilisateur en envoyant une requête API `POST /register` avec les informations de l'utilisateur.
 * - Le backend devra accepter les informations suivantes : nom, prénom, email, téléphone, adresse, rôle (client ou prestataire), et mot de passe.
 * - Le backend doit également gérer la logique de création du compte en fonction du rôle :
 *   - Si le rôle est `client`, les informations supplémentaires (partenaire, sexe) seront incluses.
 *   - Si le rôle est `prestataire`, les informations spécifiques au prestataire (services et photos) seront envoyées.
 *
 * Implémentation Backend :
 * - Une route API `POST /register` pour créer un nouveau compte utilisateur.
 * - Le backend doit valider les données (ex. : vérifier que l'email est unique, valider le format des informations, etc.).
 * - Après la création, le backend doit retourner un objet JSON contenant les informations du compte créé ou un message d'erreur en cas de problème.
 */

/**
 * 2. Télécharger une image de service
 *
 * Fonction : `handleImageUpload`
 * - Cette fonction permet de télécharger une image (par exemple, la photo d'un service) et d'obtenir l'URL de l'image.
 * - Le backend doit accepter les fichiers d'image envoyés via une requête `POST` et les stocker de manière sécurisée.
 * - Le backend doit retourner l'URL où l'image est stockée (par exemple, un lien vers AWS S3 ou un autre service de stockage).
 *
 * Implémentation Backend :
 * - Une route API `POST /upload-image` pour gérer le téléchargement d'image.
 * - Le backend doit s'assurer que seuls les fichiers valides sont acceptés (par exemple, formats .jpg, .png).
 * - Le backend doit renvoyer une réponse avec l'URL de l'image téléchargée ou un message d'erreur en cas d'échec du téléchargement.
 */

/**
 * Validation des données d'inscription
 *
 * Le backend doit valider les données envoyées lors de l'inscription, comme :
 * - Vérifier que l'email est valide et unique.
 * - Vérifier que le mot de passe respecte les critères de sécurité (longueur minimale, caractères spéciaux, etc.).
 * - Vérifier que les informations spécifiques au rôle sont bien envoyées (par exemple, les informations du client ou du prestataire).
 *
 * Implémentation Backend :
 * - Validation des champs côté backend, avec des messages d'erreur appropriés en cas de données invalides.
 * - Le backend doit renvoyer des codes d'erreur HTTP appropriés (par exemple, 400 pour une mauvaise demande, 409 pour un email déjà existant).
 */

/**
 * Gestion des erreurs
 *
 * Si une erreur survient lors de la soumission du formulaire (par exemple, une erreur côté serveur ou une validation échouée),
 * le backend doit renvoyer un message d'erreur compréhensible par le frontend.
 *
 * Implémentation Backend :
 * - Le backend doit renvoyer des codes d'erreur HTTP appropriés (par exemple, 500 pour une erreur serveur, 400 pour une requête invalide).
 * - Les messages d'erreur doivent être clairs et détaillés, par exemple `"message": "Email déjà utilisé"`.
 * - Les erreurs doivent être envoyées dans un format JSON pour que le frontend puisse les traiter facilement.
 */
