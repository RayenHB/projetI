/**
 * Le backend doit implémenter les API suivantes pour que ce composant fonctionne correctement :
 * 1. **GET /client** : Récupérer les informations du client (nom, prénom, email, téléphone, etc.).
 * 2. **GET /reservations** : Récupérer toutes les réservations du client.
 * 3. **GET /appointments** : Récupérer tous les rendez-vous du client.
 * 4. **PUT /client** : Mettre à jour les informations du client (nom, prénom, email, téléphone).
 * 5. **DELETE /client** : Désactiver le compte du client (compte à supprimer ou désactiver).
 */

/**
 * 1. Récupérer les informations du client
 *
 * Fonction : `fetchClientData`
 * - Cette fonction permet de récupérer les données du client via un appel API `GET /client`.
 * - Le backend devra renvoyer les informations suivantes : nom, prénom, email, téléphone,
 *   nombre de réservations, nombre de rendez-vous.
 *
 * Implémentation Backend :
 * - Une route API GET `/client` pour récupérer les informations du client.
 * - Cette route doit retourner un objet avec les données client.
 */

/**
 * 2. Récupérer les réservations
 *
 * Fonction : `fetchReservations`
 * - Cette fonction permet de récupérer toutes les réservations associées au client via un appel API `GET /reservations`.
 * - Chaque réservation contient des informations sur le service réservé et la date.
 *
 * Implémentation Backend :
 * - Une route API GET `/reservations` qui retourne une liste des réservations du client.
 * - Chaque réservation doit avoir des propriétés telles que le service réservé et la date.
 */

/**
 * 3. Récupérer les rendez-vous
 *
 * Fonction : `fetchAppointments`
 * - Cette fonction permet de récupérer les rendez-vous associés au client via un appel API `GET /appointments`.
 * - Chaque rendez-vous doit contenir des informations sur le prestataire, la date et l'heure du rendez-vous.
 *
 * Implémentation Backend :
 * - Une route API GET `/appointments` qui retourne les rendez-vous associés au client.
 * - Chaque rendez-vous doit inclure des informations telles que le prestataire, la date, et l'heure.
 */

/**
 * 4. Mettre à jour le profil du client
 *
 * Fonction : `handleEditProfile`
 * - Cette fonction permet de mettre à jour les informations du client en envoyant une requête `PUT` avec les nouvelles données.
 * - Le backend devra accepter les informations mises à jour et les enregistrer.
 *
 * Implémentation Backend :
 * - Une route API `PUT /client` pour mettre à jour les informations du client.
 * - Cette route recevra un objet JSON avec les informations à modifier (nom, prénom, email, téléphone).
 */

/**
 * 5. Désactiver le compte du client
 *
 * Fonction : `handleDeactivateAccount`
 * - Cette fonction permet de désactiver le compte du client en envoyant une requête `DELETE` pour supprimer ou désactiver le compte.
 * - Le backend devra mettre en place une logique pour désactiver le compte.
 *
 * Implémentation Backend :
 * - Une route API `DELETE /client` pour désactiver le compte du client.
 * - Cette route doit supprimer ou désactiver le compte sans supprimer définitivement les données du client.
 */

/**
 * Comportement du calendrier
 *
 * Le calendrier dans le composant React affiche les rendez-vous en fonction des dates.
 * Le backend doit s'assurer que l'API `/appointments` renvoie des données correctes et à jour pour que les rendez-vous
 * soient affichés correctement dans le calendrier.
 *
 * Chaque rendez-vous dans le calendrier doit être lié à une date et afficher l'heure correspondante.
 *
 * Implémentation Backend :
 * - La route API `/appointments` doit renvoyer une liste d'objets contenant la date et l'heure de chaque rendez-vous.
 */

/**
 * Gestion des erreurs
 *
 * Les erreurs d'appel API doivent être gérées correctement. Si une erreur survient (par exemple, une erreur de réseau ou un
 * problème côté serveur), le frontend doit afficher un message d'erreur approprié à l'utilisateur, via `message.error`.
 *
 * Implémentation Backend :
 * - Le backend doit renvoyer des codes d'erreur HTTP appropriés (par exemple, 500 pour une erreur serveur, 400 pour une requête invalide).
 * - Les réponses d'erreur doivent être envoyées dans un format compréhensible par le frontend.
 */
