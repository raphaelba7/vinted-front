import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Description from "../components/description";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Responsive for carrousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Offer = () => {
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
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
              >
                {data.product_pictures.map((elem) => {
                  return (
                    <>
                      <div key={elem.secure_url} className="carrousel-image">
                        <img src={elem.secure_url} alt="" />
                      </div>
                    </>
                  );
                })}
              </Carousel>
            </div>
            <div>
              <Description data={data} />
            </div>
          </div>
        </article>
      </>
    );
  }
};

export default Offer;
