const Item = ({ data }) => {
  return (
    <article className="offer-item">
      <div className="owner-item">
        <img
          src={data.owner.account.avatar.secure_url}
          alt={data.owner.account.avatar.secure_url}
          className="owner-avatar"
        />
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
            return (
              <>
                <span key={elem.TAILLE}>{elem.TAILLE}</span>
              </>
            );
          })}
          {data.product_details.map((elem) => {
            return (
              <>
                <span key={elem.MARQUE}>{elem.MARQUE}</span>
              </>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default Item;
