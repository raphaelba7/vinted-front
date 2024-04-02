import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/input";
import "./index.css";

const Publish = ({ token, setHeader }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [trade, setTrade] = useState(false);
  // State qui contient mon image sélectionnée
  const [picture, setPicture] = useState();
  const navigate = useNavigate();
  // State qui contient l'url fourni par cloudinary
  //const [pictureFromCloudinary, setPictureFromCloudinary] = useState();
  setHeader(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Rajouter 2 paires clef/valeur à mon formdata
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("city", city);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("price", price);
      formData.append("trade", trade);

      // Je donne 3 arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate(`/offer/${response.data._id}`);
      //setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {/* {pictureFromCloudinary && <img src={pictureFromCloudinary} alt="" />} */}

      <div className="div-flex">
        <form onSubmit={handleSubmit} className="publish-form">
          <div className="title-form">
            <h1>Vends ton article</h1>
          </div>
          <div className="picture">
            <div className="dot-picture">
              {picture ? (
                <>
                  <img
                    src={URL.createObjectURL(picture)}
                    alt="produit"
                    className="display-photo-offer"
                  />
                  <Input
                    // multiple // Pour sélectionner plusieurs fichiers
                    type="file"
                    name="picture"
                    setState={setPicture}
                    state={picture}
                    className={"display-none"}
                    label={"+ Changer la photo"}
                    classNameLabel={"label-form-publish"}
                  />
                </>
              ) : (
                <Input
                  // multiple // Pour sélectionner plusieurs fichiers
                  type="file"
                  name="picture"
                  setState={setPicture}
                  state={picture}
                  className={"display-none"}
                  label={"+ Ajouter une photo"}
                  classNameLabel={"label-form-publish"}
                />
              )}
            </div>
          </div>
          <div className="form-info">
            <div>
              <label htmlFor="" className="label-form-publish">
                Titre
              </label>
              <Input
                type="text"
                name="title"
                setState={setTitle}
                state={title}
                placeholder="ex: chemise Sézane verte"
              />
            </div>
            <div>
              <label htmlFor="" className="label-form-publish">
                Décris ton article
              </label>
              <Input
                type="textarea"
                name="description"
                setState={setDescription}
                state={description}
                placeholder="ex: porté quelquesfois, taille correctement"
              />
            </div>
          </div>

          <div className="form-info">
            <div>
              <label htmlFor="" className="label-form-publish">
                Marque
              </label>
              <Input
                type="text"
                name="brand"
                setState={setBrand}
                state={brand}
                placeholder="ex: Zara"
              />
            </div>
            <div>
              <label htmlFor="" className="label-form-publish">
                Taille
              </label>
              <Input
                type="text"
                name="size"
                setState={setSize}
                state={size}
                placeholder="ex: L/ 40/ 12"
              />
            </div>
            <div>
              <label htmlFor="" className="label-form-publish">
                Couleur
              </label>
              <Input
                type="text"
                name="color"
                setState={setColor}
                state={color}
                placeholder="ex: Fushia"
              />
            </div>

            <div>
              <label htmlFor="" className="label-form-publish">
                Etat
              </label>
              <Input
                type="text"
                name="condition"
                setState={setCondition}
                state={condition}
                placeholder="ex: Neuf avec étiquette"
              />
            </div>
            <div>
              <label htmlFor="" className="label-form-publish">
                Lieu
              </label>
              <Input
                type="text"
                name="city"
                setState={setCity}
                state={city}
                placeholder="ex: Paris"
              />
            </div>
          </div>
          <div className="form-info">
            <div className="text-info">
              <label htmlFor="" className="label-form-publish">
                Prix
              </label>
              <Input
                type="number"
                name="price"
                value={price}
                min="1"
                max="500"
                setState={setPrice}
                state={price}
                placeholder="ex: 0,00 €"
              />
            </div>
            <div className="form-checkbox">
              <label htmlFor="" className="label-form-publish"></label>
              <input
                type="checkbox"
                name="trade"
                onClick={() => {
                  setTrade(true);
                }}
              />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
          <div className="div-publish-button">
            <input
              type="submit"
              value="Ajouter"
              name="Publier l'offre"
              className="publish-button"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Publish;
