import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import hero from "../assets/img/hero_vinted.jpg";
import hero2 from "../assets/img/hero2_vinted.svg";
import Button from "../components/button";
import Item from "../components/item";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        ` https://lereacteur-vinted-api.herokuapp.com/offers?page=${currentPage}&limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    console.log(currentPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  };

  if (isLoading === true) {
    return (
      <>
        <h2>En chargement....</h2>
      </>
    );
  } else {
    return (
      <>
        <section className="hero-section">
          <div className="hero-div">
            <img src={hero} alt="image hero" className="img-home-hero" />
            <div className="hero-pop">
              <h2>Prêts à faire du tri dans vos placards</h2>
              <Button name="Commencer à vendre" />
            </div>
            <img src={hero2} alt="" className="img-home-hero2" />
          </div>
        </section>
        <section className="home-offer-section">
          <div>
            <Button value="Précédent" onClick={handlePreviousPage} />
            <p>{currentPage}</p>
            <Button value="Suivant" onClick={handleNextPage} />
          </div>
          {data.offers.map((elem, index) => {
            return (
              <>
                <Link to={`/offer/${elem._id}`}>
                  <Item data={elem} index={index} />
                </Link>
              </>
            );
          })}
        </section>
      </>
    );
  }
};

export default Home;
