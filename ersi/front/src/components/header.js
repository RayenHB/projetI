// src/components/Header.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import logo from "../assets/logo.png"; 
import "./styles/header.css"; 

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; 

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="authButtons">
        {isAuthenticated ? (
          <Button onClick={handleLogout} className="logoutButton">
            Déconnexion
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate("/login")} className="authButton">
              Se connecter
            </Button>
            <Button onClick={() => navigate("/register")} className="authButton">
              Nous rejoindre
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
