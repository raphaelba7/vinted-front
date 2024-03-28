import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

const ModalLogin = ({
  visibleLogin,
  setVisibleLogin,
  setVisible,
  visible,
  setIsConnected,
  token,
  setToken,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        ` https://lereacteur-vinted-api.herokuapp.com/user/login`,
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("userToken", data.token, { expires: 15 });
      setToken(data.token);
      setVisibleLogin(!visibleLogin);
      setIsConnected(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSwitchModal = () => {
    setVisible(!visible);
    setVisibleLogin(!visibleLogin);
  };

  return (
    <div className="modal-root">
      <div className="modal">
        <form>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
        </form>
        <p onClick={handleSwitchModal}>Pas encore de compte ? inscris-toi</p>
      </div>
    </div>
  );
};

export default ModalLogin;
