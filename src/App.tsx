import "./styles/globals.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import styled from "@emotion/styled";

function App() {
  const Container = styled.div`
    margin: 0 3rem;
  `;
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
