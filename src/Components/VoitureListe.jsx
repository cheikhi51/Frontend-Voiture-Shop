import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Component } from 'react';
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap';
import MyToast from './MyToast';

export default class VoitureListe extends Component {
    constructor(props){
        super(props);
        this.state = {
            voitures: [],
            show: false,
            toastMessage: '',
            type: 'success' // Par défaut en succès
        };
    }

    componentDidMount(){
        console.log("Tentative de récupération des voitures...");
        axios.get("http://localhost:8081/voitures")
        .then(response => {
            console.log("Données reçues:", response.data);
            this.setState({voitures: response.data});
        })
        .catch(error => {
            console.error("Erreur détaillée:", error);
            console.error("URL:", error.config?.url);
            console.error("Method:", error.config?.method);
            this.setState({voitures: []});
        });
    }

    deleteVoiture = (voitureId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
            axios.delete(`http://localhost:8081/voitures/${voitureId}`)
            .then(response => {
                // Mettre à jour l'état local pour refléter la suppression
                this.setState({
                    voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId),
                    show: true,
                    toastMessage: "Voiture supprimée avec succès.",
                    type: 'success'
                });
                
                // Masquer le toast après 3 secondes
                setTimeout(() => this.setState({"show": false}), 3000);
            })
            .catch(error => {
                console.error("Erreur lors de la suppression:", error);
                this.setState({
                    show: true,
                    toastMessage: "Erreur lors de la suppression de la voiture !",
                    type: 'danger'
                });
                
                // Masquer le toast après 3 secondes
                setTimeout(() => this.setState({"show": false}), 3000);
            });
        } else {
            this.setState({"show": false});
        }
    };

    render() {
        const { voitures, show, toastMessage, type } = this.state;

        return (
            <div className='mt-5'>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Liste Voitures</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>Marque</th>
                                    <th>Modele</th>
                                    <th>Couleur</th>
                                    <th>Immatricule</th>
                                    <th>Annee</th>
                                    <th>Prix</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {voitures.length === 0 ? (
                                    <tr align="center">
                                        <td colSpan="7">Aucune Voiture n'est disponible</td>
                                    </tr>
                                ) : (
                                    voitures.map((voiture, index) => (
                                        <tr key={index}>
                                            <td>{voiture.marque}</td>
                                            <td>{voiture.modele}</td>
                                            <td>{voiture.couleur}</td>
                                            <td>{voiture.immatricule}</td>
                                            <td>{voiture.annee}</td>
                                            <td>{voiture.prix} €</td>
                                            <td>
                                            <ButtonGroup>
                                                <Button size='sm' variant='outline-primary'>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button 
                                                    size='sm' 
                                                    variant='outline-danger'
                                                    onClick={() => this.deleteVoiture(voiture.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Composant MyToast */}
                <div style={{"display": show ? "block" : "none"}}>
                    <MyToast 
                        show={show} 
                        message={toastMessage}
                        type={type}
                    />
                </div>
            </div>
        );
    }
}