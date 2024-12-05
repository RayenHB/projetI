import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Form,
  Input,
  Select,
  Upload,
  Space,
  message,
  Calendar,
  Modal,
} from "antd";
import "antd/dist/reset.css";
import "./styles/profilpres.css";

const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const Profile = () => {
  const [service, setService] = useState("traiteur"); // Le prestataire choisit entre "traiteur" ou "salle des fêtes"
  const [currentView, setCurrentView] = useState("welcome"); // Vue initiale du profil
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [profileData, setProfileData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    description_traiteur: "",
    photos_traiteur: [],
    description_salle_fetes: "",
    photos_salle_fetes: [],
  });
  const [numberOfReservations, setNumberOfReservations] = useState(0);

  // Fonction pour récupérer les données du profil et le nombre de réservations
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch("/api/profile");
        const profileData = await profileResponse.json();

        const reservationsResponse = await fetch("/api/reservations/count"); // API pour le nombre de réservations
        const reservationsData = await reservationsResponse.json();

        if (profileResponse.ok && reservationsResponse.ok) {
          setProfileData(profileData);
          setNumberOfReservations(reservationsData.count); // On récupère le nombre de réservations
        } else {
          message.error("Erreur lors de la récupération des informations");
        }
      } catch (error) {
        message.error("Erreur serveur: " + error.message);
      }
    };

    fetchProfileData(); // Appel de la fonction lors du montage du composant
  }, []);

  // Fonction pour mettre à jour les informations du profil
  const handleUpdateProfile = (values) => {
    message.success("Profil mis à jour avec succès");
    // Envoyer les données mises à jour à l'API
    updateProfileAPI(values);
  };

  const updateProfileAPI = async (updatedData) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData), // Envoi des données mises à jour au backend
      });
      if (response.ok) {
        message.success("Profil mis à jour avec succès");
      } else {
        message.error("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      message.error("Erreur serveur: " + error.message);
    }
  };

  // Fonction pour désactiver le compte via API
  const handleDeactivateAccount = async () => {
    try {
      const response = await fetch("/api/account/deactivate", {
        method: "POST", // On envoie une requête POST pour désactiver le compte
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsDeactivating(false);
        message.success("Compte désactivé avec succès");
      } else {
        message.error("Erreur lors de la désactivation du compte");
      }
    } catch (error) {
      message.error("Erreur serveur: " + error.message);
    }
  };

  // Fonction pour changer de vue
  const showWelcome = () => setCurrentView("welcome");
  const showProfileInfo = () => setCurrentView("profileInfo");
  const showAppointments = () => setCurrentView("appointments");
  const showReservations = () => setCurrentView("reservations");

  return (
    <div className="profile-container">
      {/* Barre verticale à gauche */}
      <div className="left-bar">
        <h4 onClick={showWelcome} style={{ cursor: "pointer" }}>
          Nom: {profileData.nom} {profileData.prenom}
        </h4>
        <h4>
          Service: {service === "traiteur" ? "Traiteur" : "Salle des fêtes"}
        </h4>
        <h4>
          <Button type="link" block onClick={showProfileInfo}>
            Consulter mes informations
          </Button>
        </h4>
        <div className="section">
          <h5>Demandes des Clients</h5>
          <Button type="link" block onClick={showAppointments}>
            Rendez-vous
          </Button>
          <Button type="link" block onClick={showReservations}>
            Réservation
          </Button>
          <Button
            type="danger"
            onClick={() => setIsDeactivating(true)}
            style={{ marginTop: "10px" }}
          >
            Désactiver le compte
          </Button>
        </div>
      </div>

      {/* Modal de confirmation pour la désactivation */}
      <Modal
        title="Désactiver le compte"
        visible={isDeactivating}
        onOk={handleDeactivateAccount}
        onCancel={() => setIsDeactivating(false)}
        okText="Désactiver"
        cancelText="Annuler"
      >
        <p>Êtes-vous sûr de vouloir désactiver votre compte ?</p>
      </Modal>

      {/* Contenu principal à droite */}
      <div className="card-content">
        <Card style={{ width: "100%" }} className="shadow-card">
          {currentView === "welcome" && (
            <div>
              <Title level={3} className="text-center">
                Bienvenue sur votre profil
              </Title>
              <p>Nombre de réservations faites : {numberOfReservations}</p>
              <Calendar fullscreen={false} />
            </div>
          )}

          {currentView === "profileInfo" && (
            <div>
              <Title level={3} className="text-center">
                Mes Informations
              </Title>
              <Form initialValues={profileData} onFinish={handleUpdateProfile}>
                <Form.Item label="Nom" name="nom">
                  <Input />
                </Form.Item>
                <Form.Item label="Prénom" name="prenom">
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
                <Form.Item label="Téléphone" name="tel">
                  <Input />
                </Form.Item>
                <Form.Item label="Adresse" name="adresse">
                  <Input />
                </Form.Item>

                <Form.Item label="Sélection du Service">
                  <Select defaultValue="traiteur" onChange={setService}>
                    <Option value="traiteur">Traiteur</Option>
                    <Option value="salle_fetes">Salle des fêtes</Option>
                  </Select>
                </Form.Item>

                {/* Dynamique de formulaire basé sur le service sélectionné */}
                {service === "traiteur" && (
                  <div className="service-details">
                    <h4>Informations sur le service Traiteur</h4>
                    <Form.Item label="Description" name="description_traiteur">
                      <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                      name="photos_traiteur"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e && e.fileList}
                      extra="Téléchargez des photos de votre service Traiteur"
                    >
                      <Dragger
                        name="files"
                        action="/upload"
                        listType="picture"
                        multiple
                        defaultFileList={profileData.photos_traiteur}
                      >
                        <p className="ant-upload-drag-icon">
                          <i className="fas fa-upload"></i>
                        </p>
                        <p>
                          Cliquer ou glisser-déposer pour télécharger des photos
                        </p>
                      </Dragger>
                    </Form.Item>
                  </div>
                )}

                {service === "salle_fetes" && (
                  <div className="service-details">
                    <h4>Informations sur la Salle des fêtes</h4>
                    <Form.Item
                      label="Description"
                      name="description_salle_fetes"
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                      name="photos_salle_fetes"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e && e.fileList}
                      extra="Téléchargez des photos de votre Salle des fêtes"
                    >
                      <Dragger
                        name="files"
                        action="/upload"
                        listType="picture"
                        multiple
                        defaultFileList={profileData.photos_salle_fetes}
                      >
                        <p className="ant-upload-drag-icon">
                          <i className="fas fa-upload"></i>
                        </p>
                        <p>
                          Cliquer ou glisser-déposer pour télécharger des photos
                        </p>
                      </Dragger>
                    </Form.Item>
                  </div>
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Mettre à jour
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {currentView === "appointments" && (
            <div>
              <Title level={3} className="text-center">
                Rendez-vous
              </Title>
              <p>
                Consulter les rendez-vous avec vos clients pour le service
                choisi.
              </p>
            </div>
          )}

          {currentView === "reservations" && (
            <div>
              <Title level={3} className="text-center">
                Réservations Clients
              </Title>
              <p>
                Consulter les réservations des clients pour le service choisi.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
