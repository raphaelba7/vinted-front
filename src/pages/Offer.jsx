import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Descriptif from "../components/descriptif";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading === true) {
    return (
      <>
        <h2> ERROR 404</h2>
      </>
    );
  } else {
    return (
      <>
        <article>
          {data.product_pictures.map((elem) => {
            return (
              <>
                <div className="carrousel-image">
                  <img src={elem.secure_url} alt="" />
                </div>
              </>
            );
          })}
          <Descriptif data={data} />
        </article>
      </>
    );
  }
};

export default Offer;
