import appleBadge from "../../assets/img/apple-store.svg";
import googleBadge from "../../assets/img/google-play.svg";
import fbBadge from "../../assets/img/fb-social-media.svg";
import instaBadge from "../../assets/img/insta-social-media.svg";
import linkedBadge from "../../assets/img/linked-social-media.svg";

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h4>Vinted</h4>
            <ul>
              <li>À propos de Vinted</li>
              <li>Carrière</li>
              <li>Le développement durable</li>
              <li>Presse</li>
              <li>Publicités</li>
            </ul>
          </div>
          <div>
            <h4>Découvrir</h4>
            <ul>
              <li>Comment ça marche ?</li>
              <li>Vérification de l'article</li>
              <li>Applications mobiles</li>
              <li>Tableau de bord</li>
              <li>Vinted Pro</li>
              <li>Guide Vinted Pro</li>
            </ul>
          </div>
          <div>
            <h4>Aide</h4>
            <ul>
              <li>Centre d'aide</li>
              <li>Vendre</li>
              <li>Acheter</li>
              <li>Confiance et sécurité</li>
            </ul>
          </div>
        </div>
        <div className="line-gray-footer container"></div>
        <div
          className="footer-social-media container"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              display: "flex",
            }}
          >
            <li>
              <img src={fbBadge} alt="badge facebook" />
            </li>
            <li>
              <img src={linkedBadge} alt="badge LinkedIn" />
            </li>
            <li>
              <img src={instaBadge} alt="badge instagram" />
            </li>
          </ul>

          <ul
            style={{
              display: "flex",
            }}
          >
            <li>
              <img src={googleBadge} alt="badge google store" />
            </li>
            <li>
              <img src={appleBadge} alt="badge apple store" />
            </li>
          </ul>
        </div>
        <div className="line-gray-footer container"></div>
        <div className="container">
          <ul style={{ display: "flex", justifyContent: "space-between" }}>
            <li>Politique de Confidentialité</li>
            <li>Politique de cookies</li>
            <li>Paramètres des cookies</li>
            <li>Termes et Conditions</li>
            <li>Notre plateforme</li>
            <li>Termes et conditions de Vinted Pro</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
