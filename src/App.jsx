import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import Pages
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import NotFound from "./pages/notFound/NotFound";

// Import components
import Header from "./components/header";
import Footer from "./components/footer";
import Modal from "./components/modal";

library.add(faMagnifyingGlass);

function App() {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [modal, setModal] = useState("");
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  /* function to stop scrolling when modal are visible */
  if (visible === true) {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
  } else {
    window.onscroll = function () {};
  }

  return (
    <Router>
      <Header
        visible={visible}
        setVisible={setVisible}
        modal={modal}
        setModal={setModal}
        token={token}
        setToken={setToken}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
      />
      <Routes>
        <Route
          path="/"
          element={<Home sort={sort} search={search} min={min} max={max} />}
        />
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
  );
}

export default App;
