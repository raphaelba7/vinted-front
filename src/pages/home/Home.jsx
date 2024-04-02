import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import hero from "../../assets/img/hero_vinted.jpg";
import hero2 from "../../assets/img/hero2_vinted.svg";
import Button from "../../components/button";
import Item from "../../components/item";
import "./index.css";

const Home = ({ sort, search, min, max, currentPage, setCurrentPage }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let limit = 10;
  const maxPage = Math.ceil(data.count / limit);
  //console.log(maxPage);

  let order = "";
  if (sort === true) {
    order = "price-desc";
  } else {
    order = "price-asc";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offers?page=${currentPage}&limit=${limit}&sort=${order}&title=${search}&priceMin=${min}&priceMax=${max}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, limit, order, search, min, max]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    //console.log(currentPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    //console.log(currentPage);
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
            <img
              src={hero}
              alt="2 people looking closes and stuff"
              className="img-home-hero"
            />
            <div className="container">
              <div className="hero-pop">
                <h2>Prêts à faire du tri dans vos placards ?</h2>
                <Button name="Commencer à vendre" />
              </div>
            </div>
            <img
              src={hero2}
              alt="white background effect"
              className="img-home-hero2"
            />
          </div>
        </section>
        <section className="home-offer-section">
          <div className="home-offer-display">
            {data.offers.map((elem, index) => {
              return (
                <Link to={`/offer/${elem._id}`} key={elem._id}>
                  <Item data={elem} index={index} />
                </Link>
              );
            })}
          </div>
          <div className="page-offer">
            <Button
              name="Précédent"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            />
            <p>{currentPage}</p>
            <Button
              name="Suivant"
              onClick={handleNextPage}
              disabled={currentPage === maxPage}
            />
          </div>
        </section>
      </>
    );
  }
};

export default Home;
