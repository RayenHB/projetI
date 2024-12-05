/**
 * Composant Profile :
    Le composant Profile gère l'affichage et la modification du profil utilisateur, y compris la gestion des services (traiteur ou salle des fêtes), la consultation des informations, des rendez-vous, et des réservations, ainsi que la désactivation du compte.

 * Fonctions :
    a. handleUpdateProfile :
        Fonction : Soumet les informations mises à jour du profil.
        Retour attendu : Envoi des données mises à jour vers le backend via updateProfileAPI.
        Type de retour : Aucune valeur retournée ; utilise message.success() ou message.error() pour informer l'utilisateur du succès ou de l'échec de l'opération.
    b. updateProfileAPI :
        Fonction : Envoie une requête PUT à /api/profile pour mettre à jour les données du profil avec les nouvelles informations.
        Paramètres : updatedData (Objet contenant les nouvelles données à envoyer au backend).
        Retour attendu : Réponse de la requête HTTP (statut 200 pour succès, ou erreur avec message).
    c. handleDeactivateAccount :
        Fonction : Désactive le compte de l'utilisateur via une requête POST à /api/account/deactivate.
        Retour attendu : Réponse de la requête HTTP indiquant si la désactivation a réussi ou échoué.
        Type de retour : Aucune valeur retournée ; utilise message.success() ou message.error() pour informer l'utilisateur.
    d. Navigation entre les vues :
        showWelcome, showProfileInfo, showAppointments, showReservations : Modifient l'état de currentView pour afficher la vue correspondante. Ces fonctions contrôlent l'affichage du contenu de la carte (profil, rendez-vous, réservations).
        Retour attendu : Mise à jour de currentView pour changer l'affichage de la page.
    4. Interface Utilisateur :
        Barre latérale gauche : Permet de naviguer entre les différentes sections du profil et de désactiver le compte.
        Modal de confirmation : Affiche un modal pour confirmer la désactivation du compte.
        Vue welcome : Affiche un message de bienvenue, le nombre de réservations, et un calendrier.
        Vue profileInfo : Permet à l'utilisateur de mettre à jour ses informations personnelles et de télécharger des photos pour ses services.
        Vue appointments et reservations : Affichent les rendez-vous ou réservations liés au service choisi par l'utilisateur.
    5. Comportement Dynamique en fonction du Service Sélectionné :
        Lorsque l'utilisateur choisit un service (traiteur ou salle des fêtes), des sections de formulaire et des options de téléchargement de photos adaptées apparaissent :
        Traiteur : Description et photos du service traiteur.
        Salle des fêtes : Description et photos de la salle des fêtes.
 */
