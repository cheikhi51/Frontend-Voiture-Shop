import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    return (
      <div className="p-5 mt-5 mb-4 bg-dark text-white text-center rounded-3">
        <Container fluid>
          <Row>
            <Col>
              <h1>Bienvenue au Magasin des Voitures</h1>
              <blockquote className="blockquote mb-0">
                <p>Le meilleur de nos voitures est exposé près de chez vous</p>
                <footer className="blockquote-footer text-white-50">
                  Master MIOLA
                </footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Bienvenue;