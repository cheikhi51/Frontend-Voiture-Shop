import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from "./Components/NavigationBar";
import Bienvenue from "./Components/Bienvenue";
import Footer from "./Components/Footer";
import Voiture from "./Components/Voiture";
import VoitureListe from "./Components/VoitureListe";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" exact element={<Bienvenue />} />
              <Route path="/add" exact element={<Voiture />} />
              <Route path="/list" exact element={<VoitureListe />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  )
}

export default App