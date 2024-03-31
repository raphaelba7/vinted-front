import Button from "../button";
import "./index.css";

const Description = ({ data }) => {
  //console.log(data);
  return (
    <>
      <div className="card-description">
        <span className="product-price">{data.product_price} €</span>
        {data.product_details.map((detail, index) => {
          return (
            <ul key={Object.keys(detail)} className="product-description-list">
              <li>
                <span>{Object.keys(detail)}</span>
                <span>{Object.values(detail)}</span>
              </li>
            </ul>
          );
        })}
        <div className="line-gray"></div>
        <p className="product-name">{data.product_name}</p>
        <p className="product-desc">{data.product_description}</p>
        <div className="user-avatar-name">
          {data.owner.account.avatar && (
            <img
              className="offer-avatar-user"
              src={data.owner.account.avatar.secure_url}
              alt={data.owner.account.username}
            />
          )}
          <span>{data.owner.account.username}</span>
        </div>
        <Button name="Acheter" className="button-buy" />
      </div>
    </>
  );
};

export default Description;
