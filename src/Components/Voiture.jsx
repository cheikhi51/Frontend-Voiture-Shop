import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import MyToast from './MyToast';

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      showToast: false,
      toastMessage: '',
      type: 'success' // Par défaut en succès
    };
    this.state = this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    axios.post("http://localhost:8081/voitures", voiture)
      .then(response => {
        if (response.data != null) {
          this.setState({ 
            ...this.initialState,
            showToast: true,
            toastMessage: "Voiture ajoutée avec succès !",
            type: 'success'
          });
          
          // Masquer le toast après 3 secondes
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout :", error);
        this.setState({
          showToast: true,
          toastMessage: "Échec de l'ajout de la voiture !",
          type: 'danger'
        });
        
        // Masquer le toast après 3 secondes
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      });
  }

  resetVoiture = () => {
    this.setState({
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: ''
    });
  };

  render() {
    const { showToast, toastMessage, type } = this.state;

    return (
      <div className='mt-5'>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>Ajouter Voiture</Card.Header>
          <Form onSubmit={this.submitVoiture} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formGridMarque">
                    <Form.Label>Marque</Form.Label>
                    <Form.Control 
                      required 
                      name="marque" 
                      type="text" 
                      className={"bg-dark text-white"} 
                      placeholder="Entrez Marque Voiture"
                      value={this.state.marque}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="formGridModele">
                    <Form.Label>Modele</Form.Label>
                    <Form.Control 
                      required 
                      name="modele" 
                      type="text" 
                      className={"bg-dark text-white"} 
                      placeholder="Entrez Modele Voiture"
                      value={this.state.modele}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formGridCouleur">
                    <Form.Label>Couleur</Form.Label>
                    <Form.Control 
                      required 
                      name="couleur" 
                      type="text" 
                      className={"bg-dark text-white"} 
                      placeholder="Entrez Couleur Voiture"
                      value={this.state.couleur}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formGridImmatricule">
                    <Form.Label>Immatricule</Form.Label>
                    <Form.Control 
                      required 
                      name="immatricule" 
                      type="text" 
                      className={"bg-dark text-white"} 
                      placeholder="Entrez L'immatricule Voiture"
                      value={this.state.immatricule}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formGridAnnee">
                    <Form.Label>Annee</Form.Label>
                    <Form.Control 
                      required 
                      name="annee" 
                      type="number" 
                      className={"bg-dark text-white"} 
                      placeholder="Entrez Annee Voiture"
                      value={this.state.annee}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="formGridPrix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control 
                      required 
                      name="prix" 
                      type="number" 
                      step="0.01"
                      className={"bg-dark text-white"} 
                      placeholder="Entrez Prix Voiture"
                      value={this.state.prix}
                      onChange={this.voitureChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
            
            <Card.Footer style={{"textAlign":"right"}}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave}/>{' '}
                Submit
              </Button>
              <Button 
                size="sm" 
                variant="info" 
                type="button" 
                onClick={this.resetVoiture}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon icon={faUndo}/>{' '}
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>

        {/* Composant MyToast avec gestion du type */}
        <div style={{"display": showToast ? "block" : "none"}}>
          <MyToast 
            show={showToast} 
            message={toastMessage}
            type={type}
          />
        </div>
      </div>
    );
  }
}