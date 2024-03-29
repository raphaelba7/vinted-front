import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";

// Import components
import Header from "./components/header";
import Footer from "./components/footer";
import Modal from "./components/modal";

library.add(faMagnifyingGlass);

function App() {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("userToken") || "");

  const [modal, setModal] = useState("");

  return (
    <div style={{ position: "relative" }}>
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          modal={modal}
          setModal={setModal}
          token={token}
          setToken={setToken}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {visible && (
          <Modal
            visible={visible}
            setVisible={setVisible}
            modal={modal}
            setModal={setModal}
            token={token}
            setToken={setToken}
          />
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
