import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  const handleLogoutClick = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const isLoginRegisterPage = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#000000' }}>
        <div className="container-fluid">
        <a className="navbar-brand" onClick={() => navigate("/home")}>
          <img src="/src/assets/images/logo.png" alt="GO CABBY" style={{ height: '40px' }} />
        </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" onClick={() => navigate("/home")}>
                  Home
                </a>
              </li>
              {userRole === "SECURITYHEAD" && (
                <li className="nav-item">
                  <a className="nav-link" onClick={() => navigate("/applications")}>
                    Pending Applications
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/aboutUs")}>
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/faq")}>
                  FAQ
                </a>
              </li>
            </ul>
            {!isLoginRegisterPage && !userRole && (
              <>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-light" onClick={handleLoginClick}>Login</button>
                  <button className="btn btn-light" onClick={handleRegisterClick}>Register</button>
                </div>
              </>
            )}
            {!isLoginRegisterPage && userRole && (
                <button className="btn btn-light" onClick={handleLogoutClick}>Logout</button>
            )}
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have been successfully logged out.</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
