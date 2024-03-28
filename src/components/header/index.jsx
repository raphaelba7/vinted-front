import Button from "../button";
import logo from "../../assets/img/logo_vinted.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({
  setVisible,
  visible,
  setVisibleLogin,
  visibleLogin,
  // isConnected,
  // setIsConnected,
  token,
  setToken,
}) => {
  const handleSignUp = () => {
    setVisible(!visible);
    setVisibleLogin(false);
  };
  const handleLogin = () => {
    setVisibleLogin(!visibleLogin);
    setVisible(false);
  };
  const handleLogOut = () => {
    Cookies.remove("userToken");
    setToken();
  };
  const handleCloseModals = () => {
    setVisible(false);
    setVisibleLogin(false);
    // setIsConnected(isConnected);
  };
  return (
    <>
      <header>
        <div className="header-container">
          <Link to="/" onClick={handleCloseModals}>
            <img src={logo} alt="" />
          </Link>
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
    </>
  );
};

export default Header;
