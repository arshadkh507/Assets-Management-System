import React from "react";
import { FaPencilAlt, FaCogs, FaBook } from "react-icons/fa";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./Dashboard.css"; // Import custom CSS for additional styling

const Dashboard = () => {
  return (
    <Container className="dashboard-container mt-5">
      <Row>
        <Col>
          <h2 className="dashboard-heading text-center">Welcome</h2>
          <p className="dashboard-welcome-text text-center">
            Assets Management System
            <br />
            Civil Court Mohmand
          </p>
          <h4 className="dashboard-subheading text-center">Dashboard</h4>
        </Col>
      </Row>
      <Row className="dashboard-button-container mt-4">
        <Col xs={12} md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Button variant="primary" className="dashboard-button">
                <FaPencilAlt className="dashboard-button-icon" />
                Stationary
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Button variant="primary" className="dashboard-button">
                <FaCogs className="dashboard-button-icon" />
                Miscellaneous
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Button variant="primary" className="dashboard-button">
                <FaBook className="dashboard-button-icon" />
                Court Register
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
