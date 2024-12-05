import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  Form,
  Select,
  Space,
  Typography,
  Radio,
  Upload,
} from "antd";
import "antd/dist/reset.css";
import "./styles/register.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const Register = () => {
  const [role, setRole] = useState("");
  const [service, setService] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      console.log("Form data:", values);
      const response = await fetch("http://127.0.0.1:8000/inscription/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            nom: values.nom,
            prenom: values.prenom,
            email: values.email,
            tel: values.tel,
            adresse: values.adresse,
            role: values.role,
            password: values.password,
          },
          client:
            values.role === "client"
              ? {
                  partenaire: values.partenaire,
                  sexe: values.sexe,
                }
              : null,
          prestataire:
            values.role === "prestataire"
              ? {
                  service: values.service,
                  description_traiteur: values.description_traiteur,
                  description_salle_fetes: values.description_salle_fetes,
                }
              : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);
      if (values.role === "client") {
        navigate("/profilcli");
      } else if (values.role === "prestataire") {
        navigate("/profilpres");
      }
    } catch (error) {
      console.error(" registration failure:", error.message);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setService("");
    console.log("Selected role:", e.target.value);
  };

  const handleServiceChange = (value) => {
    setService(value);
    console.log("Selected service:", value);
  };

  return (
    <div className="register-container">
      <Card
        style={{
          width: 400,
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        title={
          <Title level={3} className="text-center register-title">
            3aresli Inscription
          </Title>
        }
        className="shadow-card"
      >
        <Form name="user" form={form} onFinish={handleRegister}>
          <Form.Item
            name="nom"
            rules={[{ required: true, message: "Please input your nom!" }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>

          <Form.Item
            name="prenom"
            rules={[{ required: true, message: "Please input your prénom!" }]}
          >
            <Input placeholder="Prénom" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="tel"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Téléphone" />
          </Form.Item>

          <Form.Item
            name="adresse"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Adresse" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Radio.Group onChange={handleRoleChange} value={role}>
              <Radio value="client">Client</Radio>
              <Radio value="prestataire">Prestataire</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {role === "client" && (
            <>
              <Form.Item
                name="partenaire"
                rules={[
                  {
                    required: true,
                    message: "Please input your partner name!",
                  },
                ]}
              >
                <Input placeholder="Nom du partenaire" />
              </Form.Item>

              <Form.Item
                name="sexe"
                rules={[{ required: true, message: "Please select your sex!" }]}
              >
                <Select placeholder="Sexe">
                  <Option value="homme">Homme</Option>
                  <Option value="femme">Femme</Option>
                </Select>
              </Form.Item>
            </>
          )}

          {role === "prestataire" && (
            <>
              <Form.Item
                name="service"
                rules={[
                  { required: true, message: "Please select your service!" },
                ]}
              >
                <Select
                  placeholder="Select your service"
                  onChange={handleServiceChange}
                >
                  <Option value="traiteur">Traiteur</Option>
                  <Option value="salle_fetes">Salle des fêtes</Option>
                </Select>
              </Form.Item>

              {service === "traiteur" && (
                <div className="service-details">
                  <h4>Informations supplémentaires pour Traiteur</h4>
                  <Form.Item
                    name="description_traiteur"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please provide a description for your service!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Description du service traiteur"
                      rows={4}
                    />
                  </Form.Item>

                  <Form.Item
                    name="photos_traiteur"
                    valuePropName="fileList"
                    extra="Upload photos de votre service traiteur"
                    getValueFromEvent={(e) => {
                      if (e && e.fileList) {
                        console.log("Uploaded file list:", e.fileList);
                      }
                      return e && e.fileList;
                    }}
                  >
                    <Dragger
                      name="files"
                      action="/photos/"
                      listType="picture"
                      multiple
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
                  <h4>Informations supplémentaires pour Salle des fêtes</h4>
                  <Form.Item
                    name="description_salle_fetes"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please provide a description for your service!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Description du service salle des fêtes"
                      rows={4}
                    />
                  </Form.Item>

                  <Form.Item
                    name="photos_salle_fetes"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (e && e.fileList) {
                        console.log("Uploaded file list:", e.fileList);
                      }
                      return e && e.fileList;
                    }}
                    extra="Upload photos de votre salle des fêtes"
                  >
                    <Dragger
                      name="files"
                      action="/photos/"
                      listType="picture"
                      multiple
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
            </>
          )}

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="register-button"
              >
                s'Inscrire
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
