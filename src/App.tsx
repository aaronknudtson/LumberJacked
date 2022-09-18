import "./styles/globals.scss";
import "@animxyz/core";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import styled from "@emotion/styled";
import { SessionProvider } from "./hooks/useSession";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
function App() {
  const Container = styled.div`
    margin: 0 3rem;
  `;
  return (
    <SessionProvider>
      <Container>
        <ToastContainer />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </Router>
      </Container>
    </SessionProvider>
  );
}

export default App;
