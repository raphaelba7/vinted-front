import Button from "../button";
import logo from "../../assets/img/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({
  setVisible,
  visible,
  modal,
  setModal,
  sort,
  setSort,
  search,
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
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <input
              type="search"
              placeholder="Recherche des articles"
              name=""
              id=""
              onChange={handleSearchChange}
            />
          </div>
          <div className="header-range">
            <label className="switch">
              <input type="checkbox" onClick={handleSort} />
              <span className="slider round" value="⇣"></span>
            </label>
            <input type="range" name="" id="" />
            <input type="text" value={min} onChange={handleMinChange} />
            <input type="text" value={max} onChange={handleMaxChange} />
          </div>
        </div>
        <div className="header-button-login-sign">
          <Button
            name="S'inscrire"
            onClick={handleSignUp}
            disabled={token ? true : false}
          />
          <Button
            name="Se connecter"
            onClick={handleLogin}
            disabled={token ? true : false}
          />
          <Button
            name="Se deconnecter"
            onClick={handleLogOut}
            disabled={token ? false : true}
          />
        </div>
        <div className="header-button-sell">
          <Button name="Vends tes articles" />
        </div>
      </div>
    </header>
  );
};

export default Header;
