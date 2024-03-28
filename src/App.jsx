import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

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
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  // const [isConnected, setIsConnected] = useState(token ? true : false);
  return (
    <div style={{ postion: "relative" }}>
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
          // isConnected={isConnected}
          // setIsConnected={setIsConnected}
          token={token}
          setToken={setToken}
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
            visibleLogin={visibleLogin}
            // setIsConnected={setIsConnected}
            token={token}
            setToken={setToken}
          />
        )}
        {visibleLogin && (
          <ModalLogin
            visibleLogin={visibleLogin}
            setVisibleLogin={setVisibleLogin}
            setVisible={setVisible}
            visible={visible}
            // setIsConnected={setIsConnected}
            token={token}
            setToken={setToken}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
