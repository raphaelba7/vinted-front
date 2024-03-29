import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

const ModalSignUp = ({
  visible,
  setVisible,
  visibleLogin,
  setVisibleLogin,
  // isConnected,
  // setIsConnected,
}) => {
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      const { data } = await axios.post(
        ` https://lereacteur-vinted-api.herokuapp.com/user/signup`,
        {
          email: email,
          username: username,
          password: password,
          newsLetter: newsLetter,
        }
      );
      // console.log(data)
      Cookies.set("userToken", data.token, { expires: 15 });
      setToken(data.token);
      setVisible(!visible);
      // setIsConnected(isConnected);
      navigate("/");
    } catch (error) {
      // afficher le status de l'erreur
      //console.log(error.response.status);
      // afficher plus de détails
      console.log(error.response);
      if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewsLetterChange = () => {
    setNewsLetter(!newsLetter);
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
            type="text"
            value={username}
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleUsernameChange}
          />
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
          <input
            type="checkbox"
            value={newsLetter}
            onChange={handleNewsLetterChange}
          />
          <p>S'inscrire à notre newsletter</p>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" onClick={handleSubmit}>
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        <p onClick={handleSwitchModal}>Tu as déjà un compte ? connecte-toi</p>
      </div>
    </div>
  );
};

export default ModalSignUp;
