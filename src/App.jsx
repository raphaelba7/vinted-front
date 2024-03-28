import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";

// Import components
import Header from "./components/header";
import ModalSignUp from "./components/modalSignUp";
import ModalLogin from "./components/modalLogin";

function App() {
  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  return (
    <div style={{ postion: "relative" }}>
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {visible && (
          <ModalSignUp
            visible={visible}
            setVisible={setVisible}
            setVisibleLogin={setVisibleLogin}
          />
        )}
        {visibleLogin && (
          <ModalLogin
            visibleLogin={visibleLogin}
            setVisibleLogin={setVisibleLogin}
            setVisible={setVisible}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
