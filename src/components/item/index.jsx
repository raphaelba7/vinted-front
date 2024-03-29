const Item = ({ data }) => {
  console.log(data);
  return (
    <article className="offer-item">
      <div className="owner-item">
        {data.owner.account.avatar?.secure_url && (
          <img
            src={data.owner.account.avatar.secure_url}
            alt={data.owner.account.avatar.secure_url}
            className="owner-avatar"
          />
        )}

        <span>{data.owner.account.username}</span>
      </div>
      <div>
        <img
          src={data.product_image.secure_url}
          alt={data.product_description}
          className="item-img"
        />
        <div className="offer-item-price-size-brand">
          <span>{data.product_price} €</span>
          {data.product_details.map((elem) => {
            return <span key={Object.keys(elem)}>{elem.TAILLE}</span>;
          })}
          {data.product_details.map((elem) => {
            return <span key={Object.keys(elem)}>{elem.MARQUE}</span>;
          })}
        </div>
      </div>
    </article>
  );
};

export default Item;
