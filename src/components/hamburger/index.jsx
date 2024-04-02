import "./index.css";
import { Link } from "react-router-dom";
import Button from "../button";
const Hamburger = ({
  isOpen,
  onClickLogin,
  onClickSignUp,
  onClickLogOut,
  token,
}) => {
  if (isOpen) {
    return (
      <>
        <div className="hamburger">
          <div
            className="burger burger1"
            style={{ transform: "rotate(45deg)" }}
          ></div>
          <div
            className="burger burger2"
            style={{ transform: "translateX(100%)", opacity: "0" }}
          ></div>
          <div
            className="burger burger3"
            style={{ transform: "rotate(-45deg)" }}
          ></div>
        </div>
        <div className="button-hamburger">
          <div>
            {token ? (
              <Button
                name="Se deconnecter"
                onClick={onClickLogOut}
                disabled={token ? false : true}
                className="logout"
              />
            ) : (
              <>
                <Button name="S'inscrire" onClick={onClickSignUp} />
                <Button name="Se connecter" onClick={onClickLogin} />
              </>
            )}
          </div>
          <div>
            {token ? (
              <Link to="/publish">
                <Button name="Vends tes articles" className="button-sell" />
              </Link>
            ) : (
              <Link to="/publish">
                <Button
                  name="Vends tes articles"
                  className="button-sell"
                  onClick={onClickLogin}
                />
              </Link>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="hamburger">
          <div
            className="burger burger1"
            style={{ transform: "rotate(0)" }}
          ></div>
          <div
            className="burger burger2"
            style={{ transform: "translateX(0)", opacity: "1" }}
          ></div>
          <div
            className="burger burger3"
            style={{ transform: "rotate(0)" }}
          ></div>
        </div>
      </>
    );
  }
};

export default Hamburger;
