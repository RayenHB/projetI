import React, { useState } from 'react';
import { Card, Button, Typography, Form, Input, Select, Upload, Space, message, Calendar,Modal } from 'antd';
import 'antd/dist/antd.min.css'; // Importation du fichier CSS d'Ant Design
import './styles/profilpres.css'; // Importation du fichier CSS personnalisé

const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const Profile = () => {
  const [service, setService] = useState('traiteur'); // Service initial par défaut
  const [currentView, setCurrentView] = useState('welcome'); // Vue initiale
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [profileData, setProfileData] = useState({
    nom: 'nom',
    prenom: 'prenom',
    email: 'nom.@example.com',
    tel: '00000',
    adresse: 'num rue Exemple',
    service: 'traiteur',
    description_traiteur: 'Service de traiteur de qualité.',
    photos_traiteur: [
      { uid: '-1', name: 'photo1.jpg', status: 'done', url: 'http://example.com/photo1.jpg' },
      { uid: '-2', name: 'photo2.jpg', status: 'done', url: 'http://example.com/photo2.jpg' }
    ],
    description_salle_fetes: 'Salle des fêtes élégante et spacieuse.',
    photos_salle_fetes: [],
  });

  const handleUpdateProfile = (values) => {
    console.log('Updated Profile:', values);
    message.success('Profil mis à jour avec succès');
  };

  const handleRemovePhoto = (file) => {
    console.log('Supprimer la photo', file);
    return true;
  };
  const handleDeactivateAccount = () => {
    setIsDeactivating(false);
    message.success('Compte désactivé avec succès');
    // Ajoutez la logique de désactivation du compte ici (par exemple, en appelant une API)
  };

  // Fonctions pour changer de vue
  const showWelcome = () => setCurrentView('welcome');
  const showProfileInfo = () => setCurrentView('profileInfo');
  const showAppointments = () => setCurrentView('appointments');
  const showReservations = () => setCurrentView('reservations');

  return (
    <div className="profile-container">
      {/* Barre verticale à gauche */}
      <div className="left-bar">
        {/* Nom cliquable pour revenir à la page d'accueil */}
        <h4 onClick={showWelcome} style={{ cursor: 'pointer' }}>
          Nom: {profileData.nom} {profileData.prenom}
        </h4>
        <h4>Service: {profileData.service === 'traiteur' ? 'Traiteur' : 'Salle des fêtes'}</h4>
        <h4><Button type="link" block onClick={showProfileInfo}>Consulter mes informations</Button></h4>
        <div className="section">
          <h5>Demandes des Clients</h5>
          <Button type="link" block onClick={showAppointments}>Rendez-vous</Button>
          <Button type="link" block onClick={showReservations}>Réservation</Button>
          <Button type="danger" onClick={() => setIsDeactivating(true)} style={{ marginTop: '10px' }}>Désactiver le compte</Button>
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
        <Card style={{ width: '100%' }} className="shadow-card">
          {currentView === 'welcome' && (
            <div>
              <Title level={3} className="text-center">Bienvenue sur votre profil</Title>
              <p>Nombre de réservations faites : {/* Nombre de réservations ici */} 3</p>
              <Calendar fullscreen={false} />
            </div>
          )}

          {currentView === 'profileInfo' && (
            <div>
              <Title level={3} className="text-center">Mes Informations</Title>
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
                 {/* Détails du service sélectionné */}
            {service === 'traiteur' && (
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
                    defaultFileList={profileData.photos_traiteur} // Affichage des photos déjà téléchargées
                    onRemove={handleRemovePhoto}
                  >
                    <p className="ant-upload-drag-icon">
                      <i className="fas fa-upload"></i>
                    </p>
                    <p>Cliquer ou glisser-déposer pour télécharger des photos</p>
                  </Dragger>
                </Form.Item>
              </div>
            )}

            {service === 'salle_fetes' && (
              <div className="service-details">
                <h4>Informations sur la Salle des fêtes</h4>
                <Form.Item label="Description" name="description_salle_fetes">
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
                    defaultFileList={profileData.photos_salle_fetes} // Affichage des photos déjà téléchargées
                    onRemove={handleRemovePhoto}
                  >
                    <p className="ant-upload-drag-icon">
                      <i className="fas fa-upload"></i>
                    </p>
                    <p>Cliquer ou glisser-déposer pour télécharger des photos</p>
                  </Dragger>
                </Form.Item>
              </div>
            )}
                <Form.Item>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" htmlType="submit" block>Mettre à jour le profil</Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          )}

          {currentView === 'appointments' && (
            <div>
              <Title level={3} className="text-center">Liste des Rendez-vous</Title>
              <p>Vous pouvez accepter ou rejeter les demandes de rendez-vous.</p>
              
            </div>
          )}

          {currentView === 'reservations' && (
            <div>
              <Title level={3} className="text-center">Liste des Réservations</Title>
              <p>Vous pouvez gérer les réservations des clients.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
