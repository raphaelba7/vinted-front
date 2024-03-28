import { Link } from "react-router-dom";
import Button from "../button";
import logo from "../../assets/img/logo_vinted.png";

const Header = () => {
  return (
    <>
      <header>
        <div>
          <img src={logo} alt="" />
          <div>
            <input type="search" name="" id="" />
            <input type="button" name="" id="" />
            <input type="range" name="" id="" />
          </div>
          <div>
            <Button value="S'inscrire" />
            <Button value="Se connecter" />
            <Button value="Vends tes articles" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
