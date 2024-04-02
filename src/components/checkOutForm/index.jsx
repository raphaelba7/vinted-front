import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import "./index.css";

const CheckoutForm = ({ price, title }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [isLoading, setIsLoading] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [paymentIsDone, setPaymentIsDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(error.message);
      return;
    }

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
      {
        title: title,
        amount: price,
      }
    );

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const { error, paymentIntent } = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements: elements,
      clientSecret: clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirections
      redirect: "if_required",
    });

    console.log(paymentIntent);
    // Si une erreur a lieu pendant la confirmation
    if (error) {
      // On la montre au client
      setErrorMessage(error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (paymentIntent.status === "succeeded") {
      setPaymentIsDone(true);
    }
    // On a fini de charger
    setIsLoading(false);
  };

  return paymentIsDone ? (
    <p>Paiement effectué</p>
  ) : (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form-paymentelement">
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements || isLoading}>
          Pay
        </button>
        {/* Éventuel message d'erreur */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
