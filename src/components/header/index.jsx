import { Link } from "react-router-dom";
import Button from "../button";
import logo from "../../assets/img/logo_vinted.png";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <img src={logo} alt="" />
          <div className="header-button-left">
            <div className="header-search">
              <input
                type="search"
                placeholder="Recherche des articles"
                name=""
                id=""
              />
            </div>
            <div className="header-range">
              <input type="button" name="" id="" />
              <input type="range" name="" id="" />
            </div>
          </div>
          <div className="header-button-login-sign">
            <Button name="S'inscrire" />
            <Button name="Se connecter" />
          </div>
          <div className="header-button-sell">
            <Button name="Vends tes articles" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
