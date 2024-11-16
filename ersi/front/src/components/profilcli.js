import React, { useState } from 'react';
import { Card, Button, Typography, List, Calendar, Badge, Form, Input, Modal, message } from 'antd';
import 'antd/dist/antd.min.css';
import './styles/profilcli.css';

const { Title } = Typography;

const ProfileClient = () => {
  const [view, setView] = useState('welcome');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const [clientData, setClientData] = useState({
    nom: 'NomClient',
    prenom: 'PrenomClient',
    email: 'client@example.com',
    tel: '123456789',
    nbReservations: 5,
    nbRendezVous: 3,
  });

  const reservations = [
    { id: 1, date: '2024-12-01', service: 'Traiteur' },
    { id: 2, date: '2024-12-10', service: 'Salle des fêtes' },
  ];

  const appointments = [
    { id: 1, date: '2024-11-20', heure: '14:00', prestataire: 'Prestataire 1' },
    { id: 2, date: '2024-11-25', heure: '16:00', prestataire: 'Prestataire 2' },
  ];

  const handleEditProfile = (values) => {
    setClientData({ ...clientData, ...values });
    setIsEditing(false);
    message.success('Profil mis à jour avec succès');
  };

  const handleDeactivateAccount = () => {
    setIsDeactivating(false);
    message.success('Compte désactivé avec succès');
    // Ajoutez la logique de désactivation du compte ici (par exemple, en appelant une API)
  };

  const renderContent = () => {
    switch (view) {
      case 'profile':
        return (
          <div>
            <Title level={3}>Informations Client</Title>
            <p><strong>Nom :</strong> {clientData.nom}</p>
            <p><strong>Prénom :</strong> {clientData.prenom}</p>
            <p><strong>Email :</strong> {clientData.email}</p>
            <p><strong>Téléphone :</strong> {clientData.tel}</p>
            <Button type="primary" onClick={() => setIsEditing(true)}>Modifier les informations</Button>
            <Button type="danger" onClick={() => setIsDeactivating(true)} style={{ marginTop: '10px' }}>Désactiver le compte</Button>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <Title level={3}>Mes Rendez-vous</Title>
            <List
              itemLayout="horizontal"
              dataSource={appointments}
              renderItem={appointment => (
                <List.Item>
                  <List.Item.Meta
                    title={`Rendez-vous avec ${appointment.prestataire}`}
                    description={`Date: ${appointment.date} - Heure: ${appointment.heure}`}
                  />
                  <Button type="primary">Confirmer</Button>
                </List.Item>
              )}
            />
          </div>
        );
      case 'reservations':
        return (
          <div>
            <Title level={3}>Mes Réservations</Title>
            <List
              itemLayout="horizontal"
              dataSource={reservations}
              renderItem={reservation => (
                <List.Item>
                  <List.Item.Meta
                    title={`Service: ${reservation.service}`}
                    description={`Date: ${reservation.date}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case 'calendar':
        return (
          <div>
            <Title level={3}>Calendrier des Rendez-vous</Title>
            <Calendar
            fullscreen={false}
              dateCellRender={(date) => {
                const formattedDate = date.format('YYYY-MM-DD');
                const appointmentsOnDate = appointments.filter(app => app.date === formattedDate);
                return appointmentsOnDate.length ? (
                  <ul className="calendar-event">
                    {appointmentsOnDate.map(item => (
                      <li key={item.id}>
                        <Badge status="processing" text={item.heure} />
                      </li>
                    ))}
                  </ul>
                ) : null;
              }}
            />
          </div>
        );
      default:
        return (
          <div>
            <Title level={3}>Bienvenue, {clientData.prenom} !</Title>
            <p>Nombre de réservations : {clientData.nbReservations}</p>
            <p>Nombre de rendez-vous : {clientData.nbRendezVous}</p>
          </div>
        );
    }
  };

  return (
    <div className="profile-client-container">
      <div className="left-bar">
        <h4 onClick={() => setView('welcome')} className="profile-link">Accueil</h4>
        <Button type="link" onClick={() => setView('profile')}>Consulter mes informations</Button>
        <Button type="link" onClick={() => setView('appointments')}>Mes Rendez-vous</Button>
        <Button type="link" onClick={() => setView('reservations')}>Mes Réservations</Button>
        <Button type="link" onClick={() => setView('calendar')}>Calendrier</Button>
      </div>
      <div className="card-content">
        <Card
          style={{ width: '100%' }}
          title={<Title level={3}>Profil Client</Title>}
          className="shadow-card"
        >
          {renderContent()}
        </Card>
      </div>

      {/* Modal pour modifier les informations */}
      <Modal
        title="Modifier le profil"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          initialValues={clientData}
          onFinish={handleEditProfile}
        >
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
          <Form.Item>
            <Button type="primary" htmlType="submit">Enregistrer</Button>
          </Form.Item>
        </Form>
      </Modal>

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
    </div>
  );
};

export default ProfileClient;
