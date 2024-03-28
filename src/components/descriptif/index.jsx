import Button from "../button";

const Descriptif = ({ data }) => {
  console.log(data);
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
        <img src={data.owner.account.avatar.secure_url} alt="" />
        <p>{data.owner.account.username}</p>
        <Button value="Acheter" />
      </div>
    </>
  );
};

export default Descriptif;
