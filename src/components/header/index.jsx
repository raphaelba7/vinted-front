import Button from "../button";
import logo from "../../assets/img/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./index.css";

const Header = ({
  visible,
  setVisible,
  setModal,
  sort,
  setSort,
  setSearch,
  token,
  setToken,
  min,
  max,
  setMin,
  setMax,
}) => {
  const handleSignUp = () => {
    setVisible(true);
    setModal("signUp");
  };
  const handleLogin = () => {
    setVisible(true);
    setModal("login");
  };
  const handleLogOut = () => {
    Cookies.remove("userToken");
    setToken();
  };

  const handleLogo = () => {
    setVisible(false);
    setSearch("");
    setMin("");
    setMax("");
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleMinChange = (event) => {
    const value = Number(event.target.value);
    setMin(value);
  };

  const handleMaxChange = (event) => {
    const value = Number(event.target.value);
    setMax(value);
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/" onClick={handleLogo}>
          <img src={logo} alt="" />
        </Link>
        <div className="header-button-left">
          <div className="header-search">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="icon-glass"
            />
            <input
              type="search"
              placeholder="Recherche des articles"
              name=""
              id=""
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          {!visible && (
            <div className="header-range">
              <span>Trier par prix:</span>
              <label className="switch">
                <input type="checkbox" onClick={handleSort} />
                <span className="slider round" value="⇣"></span>
              </label>
              <span> Prix mini :</span>
              <input
                type="text"
                value={min}
                onChange={handleMinChange}
                className="min-filter"
              />
              <span> Prix max :</span>
              <input
                type="text"
                value={max}
                onChange={handleMaxChange}
                className="max-filter"
              />
            </div>
          )}
        </div>
        <div className="header-button-login-sign">
          {token ? (
            <Button
              name="Se deconnecter"
              onClick={handleLogOut}
              disabled={token ? false : true}
              className="logout"
            />
          ) : (
            <>
              <Button name="S'inscrire" onClick={handleSignUp} />
              <Button name="Se connecter" onClick={handleLogin} />
            </>
          )}
        </div>
        <div className="header-button-sell">
          {token ? (
            <Button name="Vends tes articles" />
          ) : (
            <Button name="Vends tes articles" onClick={handleLogin} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
