import Button from "../button";

const Description = ({ data }) => {
  //console.log(data);
  return (
    <>
      <div>
        <p>{data.product_price} €</p>
        {data.product_details.map((detail) => {
          return (
            <>
              <p>
                {Object.keys(detail)} : {Object.values(detail)}
              </p>
            </>
          );
        })}
        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        {data.owner.account.avatar && (
          <img
            src={data.owner.account.avatar.secure_url}
            alt={data.owner.account.username}
          />
        )}
        <p>{data.owner.account.username}</p>
        <Button name="Acheter" />
      </div>
    </>
  );
};

export default Description;
