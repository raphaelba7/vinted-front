import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../../components/checkOutForm";
import "./index.css";

// Cette ligne permet de vous connecter à votre compte Stripe en fournissant votre clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  let price;
  let title;

  if (token && location.state) {
    title = location.state;
    price = location.state;
  }

  let priceT = price / 5;
  let priceP = price / 10;

  let total =
    Number((price * 100).toFixed(0)) +
    Number((priceP * 100).toFixed(0)) +
    Number((priceT * 100).toFixed(0));

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: Number((Math.abs(total) * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };

  return token && location.state ? (
    <div className="payement-div">
      <div className="payement-container">
        <div className="payement-form">
          <div className="title-payement-order">
            <h3>Résumé de la commande</h3>
          </div>
          <div className="description-order">
            <div className="content-order">
              <div>
                commande <span>{price} €</span>
              </div>
              <div>
                Frais de protection acheteurs <span>{priceP.toFixed(2)} €</span>
              </div>
              <div>
                Frais de port <span>{priceT.toFixed(2)} €</span>
              </div>
            </div>
          </div>
          <div className="order-gray-split"></div>
          <div className="content-order">
            <div className="total-order-price">
              Total <span>{total / 100} €</span>
            </div>
          </div>
          <div className="order-payment">
            <div className="order-text">
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span className="content-bold">{title}</span>. Vous allez payer{" "}
              <span className="content-bold">{total / 100}€</span> (frais de
              protection et frais de port inclus)
            </div>

            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm price={price} title={title} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Payment;
