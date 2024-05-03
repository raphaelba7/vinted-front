import Input from "../input";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Form = ({ modal, setModal, visible, setVisible, token, setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");

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
        // Je crée une nouvelle instance du constructeur FormData
        const formData = new FormData();
        // Rajouter 2 paires clef/valeur à mon formdata
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("newsLetter", newsLetter);
        formData.append("avatar", avatar);

        const { data } = await axios.post(
          ` https://lereacteur-vinted-api.herokuapp.com/user/signup`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            // body: {
            //   username: { username },
            //   email: { email },
            //   password: { password },
            // },
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
        <h2 className="title-form">S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            setState={setUsername}
            state={username}
            className="type-text"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            setState={setEmail}
            state={email}
            className="type-text"
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            setState={setPassword}
            state={password}
            className="type-text"
          />
          <Input
            type="file"
            name="avatar"
            placeholder="avatar"
            setState={setAvatar}
            state={password}
            className="type-text"
          />
          <div className="newsletter">
            <input
              type="checkbox"
              value={newsLetter}
              onChange={handleNewsLetter}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p className="newsletter">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>

          <button className="form-button" type="submit" onClick={handleSubmit}>
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        <p
          className="link-login-signup"
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
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="modal">
        <h2 className="title-form">Se connecter</h2>
        <form>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            setState={setEmail}
            state={email}
            className="type-text"
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            setState={setPassword}
            state={password}
            className="type-text"
          />
          <button className="form-button" type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
        </form>
        <p
          className="link-login-signup"
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
