import Input from "../input";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ modal, setModal, visible, setVisible, token, setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNewsLetter = () => {
    setNewsLetter(!newsLetter);
  };

  const handleSwitch = (modal) => {
    if (modal === "signUp") {
      setModal("login");
    } else if (modal === "login") {
      setModal("signUp");
    }
  };

  if (modal === "signUp") {
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
    return (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            setState={setUsername}
            state={username}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            setState={setEmail}
            state={email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            setState={setPassword}
            state={password}
          />
          <input
            type="checkbox"
            value={newsLetter}
            onChange={handleNewsLetter}
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
        <p
          onClick={() => {
            handleSwitch(modal);
          }}
        >
          Tu as déjà un compte ? connecte-toi
        </p>
      </div>
    );
  } else if (modal === "login") {
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
        setVisible(!visible);
        // setIsConnected(isConnected);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="modal">
        <form>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            setState={setEmail}
            state={email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            setState={setPassword}
            state={password}
          />
          <button type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
        </form>
        <p
          onClick={() => {
            handleSwitch(modal);
          }}
        >
          Pas encore de compte ? inscris-toi
        </p>
      </div>
    );
  }
};

export default Form;
