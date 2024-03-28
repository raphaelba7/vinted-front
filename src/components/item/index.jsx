const Item = ({ data }) => {
  //console.log(data);
  return (
    <article className="offer-item">
      <h3>{data.owner.account.username}</h3>
      <img src={data.product_image.secure_url} alt={data.product_description} />
      <span>{data.product_price} €</span>
      <br />

      {data.product_details.map((elem) => {
        return (
          <>
            <span>{elem.TAILLE}</span>
            <br />
          </>
        );
      })}

      {data.product_details.map((elem) => {
        return (
          <>
            <span>{elem.MARQUE}</span>
            <br />
          </>
        );
      })}

      <img src={data.owner.account.avatar.secure_url} alt="" />
    </article>
  );
};

export default Item;
