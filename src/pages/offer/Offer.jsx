import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Description from "../../components/description";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

// Responsive for carrousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Offer = ({ header, setHeader }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        setHeader(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading === true) {
    return (
      <>
        <h2> ERROR 404</h2>
      </>
    );
  } else {
    return (
      <>
        <article className="card-background">
          <div className="card-offer">
            <div className="card-carrousel">
              <Carousel
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item"
              >
                {data.product_pictures.map((elem) => {
                  return (
                    <div key={elem.secure_url} className="carrousel-image">
                      <img
                        src={elem.secure_url}
                        alt=""
                        className="offer-image"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <Description data={data} />
          </div>
        </article>
      </>
    );
  }
};

export default Offer;
